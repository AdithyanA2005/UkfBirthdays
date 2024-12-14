import { CalendarDays, PartyPopper } from "lucide-react";
import { BirthdayCard } from "@/components/birthday-card";
import { Title } from "@/components/title";
import { getRecentBirthdays } from "@/actions/get-recent-birthdays";
import { currentAge } from "@/lib/utils";

export const revalidate = 60;

export default async function Home() {
  const { todayBirthdays, upcomingBirthdays } = await getRecentBirthdays();
  const hasBirthdaysToday = todayBirthdays.length > 0;
  const hasUpcomingBirthdays = upcomingBirthdays.length > 0;

  return (
    <>
      {/* Today's Birthdays */}
      {hasBirthdaysToday ? (
        <section className="mb-8 rounded-lg border border-primary-500 bg-primary-300 p-6">
          <Title title="Today's Birthdays" icon={PartyPopper} />

          <ul className="cards-grid">
            {todayBirthdays.map((birthday, index) => (
              <li key={`today-birthday-${index}`}>
                <BirthdayCard
                  name={birthday.name}
                  age={{ title: "Age", value: currentAge(birthday.date) }}
                  date={{ title: "Birthday", value: birthday.date }}
                  isBirthday={true}
                  semester={birthday.semester}
                  department={birthday.department}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Upcoming Birthdays */}
      <section>
        <Title
          title={hasUpcomingBirthdays ? "Upcoming Birthdays" : "No upcoming birthdays this week"}
          icon={CalendarDays}
        />

        {upcomingBirthdays.length > 0 ? (
          <ul className="cards-grid">
            {upcomingBirthdays.map((birthday, index) => (
              <li key={`upcoming-birthday-${index}`}>
                <BirthdayCard
                  name={birthday.name}
                  age={{ title: "Turns", value: currentAge(birthday.date) + 1 }}
                  date={{ title: "On", value: birthday.date }}
                  semester={birthday.semester}
                  department={birthday.department}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </>
  );
}
