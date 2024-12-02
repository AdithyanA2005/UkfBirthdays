import { CalendarDays } from "lucide-react";
import { BirthdayCard } from "@/components/birthday-card";
import { prisma } from "@/lib/prisma";
import { currentAge } from "@/lib/utils";

export const revalidate = 60;

export default async function AllBirthdays() {
  const birthdays = await prisma.post.findMany({
    orderBy: { date: "asc" },
    include: { author: true },
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-primary">
        <CalendarDays className="h-6 w-6" />
        <h1 className="text-2xl font-bold">All Birthdays</h1>
      </div>

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
