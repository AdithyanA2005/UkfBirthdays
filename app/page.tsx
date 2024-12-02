import { Post } from "@prisma/client";
import { addDays } from "date-fns";
import { CalendarDays, PartyPopper } from "lucide-react";
import { BirthdayCard } from "@/components/birthday-card";
import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";
import { AddField, ModifyField } from "@/lib/types";
import { currentAge, isSameDayAndMonth } from "@/lib/utils";

export const revalidate = 60;

type Birthday = AddField<Post, "isToday", boolean>;

type BirthdayLists = {
  todayBirthdays: Birthday[];
  upcomingBirthdays: Birthday[];
};

async function getBirthdays(): Promise<Birthday[]> {
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

  // If there are no posts, return an empty array
  if (!posts || posts == null || posts == undefined) return [];

  // Map over the posts and add the isToday field, sort by date
  return posts
    .map((post) => {
      const birthDate = new Date(post.date.$date);
      return { ...post, date: birthDate, isToday: isSameDayAndMonth(birthDate, today) };
    })
    .sort((a: Post, b: Post) => a.date.getTime() - b.date.getTime());
}

export default async function Home() {
  const birthdays = await getBirthdays();

  // Group birthdays by isToday
  const { todayBirthdays, upcomingBirthdays }: BirthdayLists = birthdays.reduce(
    (acc: BirthdayLists, birthday: Birthday) => {
      if (birthday.isToday) acc.todayBirthdays.push(birthday);
      else acc.upcomingBirthdays.push(birthday);
      return acc;
    },
    { todayBirthdays: [], upcomingBirthdays: [] },
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Today's Birthdays */}
        {todayBirthdays.length > 0 && (
          <div className="mb-8">
            <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
              <div className="mb-4 flex items-center gap-2">
                <PartyPopper className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-primary">Today's Birthdays!</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {todayBirthdays.map((birthday) => (
                  <BirthdayCard
                    name={birthday.name}
                    age={{ title: "Age", value: currentAge(birthday.date) }}
                    date={birthday.date}
                    isBirthday={true}
                    semester={birthday.semester}
                    department={birthday.department}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Birthdays */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary">
              {upcomingBirthdays.length > 0 ? "Upcoming Birthdays" : "No upcoming birthdays this week"}
            </h2>
          </div>

          {upcomingBirthdays.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingBirthdays.map((birthday) => (
                <BirthdayCard
                  name={birthday.name}
                  age={{ title: "Will Become", value: currentAge(birthday.date) + 1 }}
                  date={birthday.date}
                  semester={birthday.semester}
                  department={birthday.department}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
