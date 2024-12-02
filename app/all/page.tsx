import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

export const revalidate = 60

async function getAllBirthdays() {
  const posts = await prisma.post.findMany({
    orderBy: {
      date: 'asc',
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
        <div className="flex items-center gap-2 mb-6 text-primary">
          <CalendarDays className="h-6 w-6" />
          <h1 className="text-2xl font-bold">All Birthdays</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {birthdays.map((birthday) => (
            <div
              key={birthday.id}
              className={cn(
                "bg-card p-6 rounded-lg shadow-sm border border-primary/30 hover:border-primary hover:shadow-md transition-shadow",
                "special-card_bg group"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <CalendarDays className="h-5 w-5 special-card_muted_text" />
                <h3 className="font-semibold text-lg special-card_text">{birthday.name}</h3>
              </div>
              <div className="text-sm special-card_muted_text">
                <p>Birthday: {format(birthday.date, "MMMM do")}</p>
                <p>Semester: {birthday.semester}</p>
                <p>Department: {birthday.department}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
