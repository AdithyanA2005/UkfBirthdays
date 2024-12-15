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
  const startDate = new Date();
  const startMonth = startDate.getMonth() + 1; // Months are 0-indexed
  const startDay = startDate.getDate();

  // Extract the month and day after specified days after today
  const extraSpan = 7; // no of extra days after today to reach end date
  const endDate = addDays(startDate, extraSpan);
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();

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
              $and: [
                { birthdayMonth: { $eq: startMonth } },
                { birthdayDay: { $gte: startDay, $lte: startDay + extraSpan } },
              ],
            },
            {
              $and: [{ birthdayMonth: { $ne: startMonth, $eq: endMonth } }, { birthdayDay: { $gte: 1, $lte: endDay } }],
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
      const isToday = isSameDayAndMonth(birthDate, startDate);
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
