import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

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
            <div
              key={birthday.id}
              className={cn(
                "rounded-lg border border-primary/30 bg-card p-6 shadow-sm transition-shadow hover:border-primary hover:shadow-md",
                "special-card_bg group",
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <CalendarDays className="special-card_muted_text h-5 w-5" />
                <h3 className="special-card_text text-lg font-semibold">{birthday.name}</h3>
              </div>
              <div className="special-card_muted_text text-sm">
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
