import { CalendarDays } from "lucide-react";
import { BirthdayCard } from "@/components/birthday-card";
import { Title } from "@/components/title";
import { getAllBirthdays } from "@/actions/get-all-birthdays";
import { currentAge } from "@/lib/utils";

export const revalidate = 60;

export default async function AllBirthdays() {
  const birthdays = await getAllBirthdays();

  return (
    <>
      <Title title="All Birthdays" icon={CalendarDays} />

      <ul className="cards-grid">
        {birthdays.map((birthday, index) => (
          <li key={`birthday-${index}`}>
            <BirthdayCard
              name={birthday.name}
              age={{ title: "Age", value: currentAge(birthday.date) }}
              date={{ title: "Birthday", value: birthday.date }}
              semester={birthday.semester}
              department={birthday.department}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
