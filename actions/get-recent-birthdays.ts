"use server";

import { Post } from "@prisma/client";
import { addDays } from "date-fns";
import { prisma } from "@/lib/prisma";
import { AddField, ModifyField } from "@/lib/types";
import { isSameDayAndMonth } from "@/lib/utils";

type Birthday = AddField<Post, "isToday", boolean>;

type BirthdayLists = {
  todayBirthdays: Birthday[];
  upcomingBirthdays: Birthday[];
};

export async function getRecentBirthdays(): Promise<BirthdayLists> {
  // Extract the current month and day
  const today = new Date();
  const todayMonth = today.getMonth() + 1; // Months are 0-indexed
  const todayDay = today.getDate();

  // Extract the month and day for the end of the week
  const nextWeek = addDays(today, 7);
  const nextWeekMonth = nextWeek.getMonth() + 1;
  const nextWeekDay = nextWeek.getDate();

  // MongoDB aggregation to filter birthdays by month and day
  const posts = (await prisma.post.aggregateRaw({
    pipeline: [
      {
        $addFields: {
          birthdayMonth: { $month: "$date" },
          birthdayDay: { $dayOfMonth: "$date" },
        },
      },
      {
        $match: {
          $or: [
            {
              // If the range doesn't cross a month boundary
              $and: [
                { birthdayMonth: { $eq: todayMonth } },
                { birthdayDay: { $gte: todayDay } },
                { birthdayDay: { $lte: 31 } },
              ],
            },
            {
              // Handle cases where the range spans to the next month
              $and: [{ birthdayMonth: { $eq: nextWeekMonth } }, { birthdayDay: { $lte: nextWeekDay } }],
            },
          ],
        },
      },
    ],
  })) as unknown as ModifyField<Post, "date", { $date: string }>[] | null | undefined;

  // If there are no posts, return an empty state
  if (!posts || posts == null || posts == undefined) return { todayBirthdays: [], upcomingBirthdays: [] };

  // Map over the posts and group them as today's birthdays and upcoming birthdays
  const result = posts.reduce(
    (acc: BirthdayLists, post) => {
      const birthDate = new Date(post.date.$date);
      const isToday = isSameDayAndMonth(birthDate, today);
      const birthday: Birthday = { ...post, date: birthDate, isToday };

      // Directly push to the appropriate array based on the 'isToday' check
      if (isToday) acc.todayBirthdays.push(birthday);
      else acc.upcomingBirthdays.push(birthday);

      return acc;
    },
    { todayBirthdays: [], upcomingBirthdays: [] },
  );

  // Sort the birthdays
  result.todayBirthdays.sort((a, b) => a.date.getTime() - b.date.getTime());
  result.upcomingBirthdays.sort((a, b) => a.date.getTime() - b.date.getTime());

  return result;
}
