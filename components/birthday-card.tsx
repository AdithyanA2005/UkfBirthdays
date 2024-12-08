import { Semester, Department } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDaysIcon, GiftIcon } from "lucide-react";
import { semesterMappings } from "@/lib/constants";
import { NamedValue } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BirthdayCardProps {
  name: string;
  age: NamedValue<number>;
  date?: Date;
  semester: Semester;
  department: Department;
  isBirthday?: boolean;
}

export function BirthdayCard({ name, age, date, semester, department, isBirthday }: BirthdayCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-violet-500/20 bg-card p-6 shadow-sm transition-shadow hover:border-primary hover:shadow-md",
        "special-card_bg group",
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        {isBirthday ? (
          <GiftIcon className="h-5 w-5 text-primary group-hover:text-white" />
        ) : (
          <CalendarDaysIcon className="special-card_muted_text h-5 w-5" />
        )}

        <h3 className="special-card_text text-lg font-semibold">{name}</h3>
      </div>
      <div className="special-card_muted_text text-sm">
        {date && <p>Birthday: {format(date, "MMMM do")}</p>}
        <p>{`${age.title}: ${age.value}`}</p>
        <p>Semester: {semesterMappings[semester] || semester}</p>
        <p>Department: {department}</p>
      </div>
    </div>
  );
}
