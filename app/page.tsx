import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";
import { format, addDays } from "date-fns";
import { CalendarDays, Gift, PartyPopper } from "lucide-react";

export const revalidate = 60

function isSameDayAndMonth(date1: Date, date2: Date) {
  return date1.getDate() === date2.getDate() && 
         date1.getMonth() === date2.getMonth();
}

function getUpcomingBirthdayDate(birthDate: Date, referenceDate: Date) {
  const thisYear = referenceDate.getFullYear();
  const birthdayThisYear = new Date(thisYear, birthDate.getMonth(), birthDate.getDate());
  
  if (birthdayThisYear < referenceDate) {
    // If this year's birthday has passed, get next year's date
    return new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate());
  }
  return birthdayThisYear;
}

async function getBirthdays() {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  const startDate = new Date(1950, 0, 1);

  const posts = await prisma.post.findMany({
    where: {
      date: {
        gte: startDate,
        lte: today,
      }
    },
    orderBy: {
      date: 'asc'
    }
  });

  return posts.map(post => {
    const birthDate = new Date(post.date);
    const upcomingBirthday = getUpcomingBirthdayDate(birthDate, today);
    const upcomingBirthdayNextWeek = getUpcomingBirthdayDate(birthDate, nextWeek);
    
    return {
      ...post,
      isToday: isSameDayAndMonth(birthDate, today),
      isUpcoming: upcomingBirthday <= nextWeek && upcomingBirthday >= today,
      upcomingDate: upcomingBirthday
    };
  })
  .filter(post => post.isToday || post.isUpcoming)
  .sort((a, b) => a.upcomingDate.getTime() - b.upcomingDate.getTime());
}

export default async function Home() {
  const birthdays = await getBirthdays();
  const todayBirthdays = birthdays.filter((b) => b.isToday);
  const upcomingBirthdays = birthdays.filter((b) => !b.isToday && b.isUpcoming);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Today's Birthdays */}
        {todayBirthdays.length > 0 && (
          <div className="mb-8">
            <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <PartyPopper className="text-primary h-6 w-6" />
                <h2 className="text-2xl font-bold text-primary">
                  Today's Birthdays!
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {todayBirthdays.map((birthday) => (
                  <div
                    key={birthday.id}
                    className="bg-card p-6 rounded-lg shadow-sm border border-primary/20 hover:border-primary hover:shadow-md transition-shadow special-card_bg group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-5 w-5 text-primary group-hover:text-white" />
                      <h3 className="font-semibold text-lg special-card_text">{birthday.name}</h3>
                    </div>
                    <div className="text-sm special-card_muted_text">
                      <p>Age: {new Date().getFullYear() - new Date(birthday.date).getFullYear()}</p>
                      <p>Semester: {birthday.semester}</p>
                      <p>Department: {birthday.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Birthdays */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary">
              {upcomingBirthdays.length > 0
                ? "Upcoming Birthdays"
                : "No upcoming birthdays this week"}
            </h2>
          </div>
          {upcomingBirthdays.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingBirthdays.map((birthday) => (
                <div
                  key={birthday.id}
                  className="bg-card p-6 rounded-lg shadow-sm border border-primary/30 hover:border-primary hover:shadow-md transition-shadow special-card_bg group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays className="h-5 w-5 special-card_muted_text" />
                    <h3 className="font-semibold text-lg special-card_text">{birthday.name}</h3>
                  </div>
                  <div className="text-sm special-card_muted_text">
                    <p>Birthday: {format(birthday.upcomingDate, "MMMM do")}</p>
                    <p>Age: {birthday.upcomingDate.getFullYear() - new Date(birthday.date).getFullYear()}</p>
                    <p>Semester: {birthday.semester}</p>
                    <p>Department: {birthday.department}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}