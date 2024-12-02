import { format } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BirthdayCardProps {
  id: string;
  name: string;
  age?: number;
  date: Date;
  semester: string;
  department: string;
}

export function BirthdayCard({ id, name, age, date, semester, department }: BirthdayCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-primary/30 bg-card p-6 shadow-sm transition-shadow hover:border-primary hover:shadow-md",
        "special-card_bg group",
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <CalendarDaysIcon className="special-card_muted_text h-5 w-5" />
        <h3 className="special-card_text text-lg font-semibold">{name}</h3>
      </div>
      <div className="special-card_muted_text text-sm">
        <p>Birthday: {format(date, "MMMM do")}</p>
        {age ? <p>Age: {age}</p> : null}
        <p>Semester: {semester}</p>
        <p>Department: {department}</p>
      </div>
    </div>
  );
}
