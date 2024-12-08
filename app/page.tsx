import { CalendarDays, PartyPopper } from "lucide-react";
import { BirthdayCard } from "@/components/birthday-card";
import { prisma } from "@/lib/prisma";
import { getRecentBirthdays } from "@/actions/get-recent-birthdays";
import { currentAge } from "@/lib/utils";

export const revalidate = 60;

export default async function Home() {
  const { todayBirthdays, upcomingBirthdays } = await getRecentBirthdays();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Today's Birthdays */}
      {todayBirthdays.length > 0 && (
        <div className="mb-8">
          <div className="rounded-lg border border-primary-400 bg-primary-200 p-6">
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
  );
}
