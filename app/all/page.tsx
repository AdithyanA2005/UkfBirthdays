import { CalendarDays } from "lucide-react";
import { BirthdayCard } from "@/components/birthday-card";
import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getAllBirthdays() {
  const posts = await prisma.post.findMany({
    orderBy: {
      date: "asc",
    },
    include: {
      author: true,
    },
  });

  return posts;
}

export default async function AllBirthdays() {
  const birthdays = await getAllBirthdays();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2 text-primary">
          <CalendarDays className="h-6 w-6" />
          <h1 className="text-2xl font-bold">All Birthdays</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {birthdays.map((birthday) => (
            <BirthdayCard
              id={birthday.id}
              name={birthday.name}
              date={birthday.date}
              semester={birthday.semester}
              department={birthday.department}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
