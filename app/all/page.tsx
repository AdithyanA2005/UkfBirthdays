import { CalendarDays } from "lucide-react";
import { BirthdayCard } from "@/components/birthday-card";
import { Title } from "@/components/title";
import { getAllBirthdays } from "@/actions/get-all-birthdays";
import { currentAge } from "@/lib/utils";

export const revalidate = 60;

export default async function AllBirthdays() {
  const birthdays = await getAllBirthdays();

  return (
    <main className="container mx-auto px-4 py-8">
      <Title title="All Birthdays" icon={CalendarDays} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {birthdays.map((birthday) => (
          <BirthdayCard
            name={birthday.name}
            age={{ title: "Age", value: currentAge(birthday.date) }}
            date={birthday.date}
            semester={birthday.semester}
            department={birthday.department}
          />
        ))}
      </div>
    </main>
  );
}
