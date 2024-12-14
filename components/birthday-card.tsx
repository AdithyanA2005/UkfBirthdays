import { Semester, Department } from "@prisma/client";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { semesterMappings } from "@/lib/constants";
import { NamedValue } from "@/lib/types";

interface BirthdayCardProps {
  name: string;
  age: NamedValue<number>;
  date: NamedValue<Date>;
  semester?: Semester;
  department?: Department;
  isBirthday?: boolean;
}

export function BirthdayCard({ name, age, date, semester, department, isBirthday }: BirthdayCardProps) {
  return (
    <Card className="relative border-none bg-white text-center shadow-md transition-all hover:-translate-y-2 hover:scale-105 hover:shadow-xl hover:shadow-primary-300">
      <CardHeader className="mb-1 gap-2.5 rounded-[inherit] pb-4">
        {department || semester ? (
          <div className="absolute right-0 top-0 rounded-bl-[inherit] rounded-tr-[inherit] bg-primary-300 px-3 py-1 text-sm font-extrabold text-primary-800">
            {semester ? `S${semesterMappings[semester]} ` : null}
            {department ? department : null}
          </div>
        ) : null}

        <Avatar className="mx-auto size-20 rounded-full">
          <AvatarImage src="" alt={name} />
          <AvatarFallback className="bg-primary-200 text-[1.6rem] font-extrabold text-primary-500">
            {name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <CardTitle className="text-[1.35rem] font-bold text-primary-600">{name}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2 divide-x divide-primary-200 px-6 pb-6">
        <div className="flex flex-col items-center">
          <span className="text-[0.8rem] font-semibold text-primary-700">{age.title}</span>
          <span className="text-[1.2rem] font-bold text-primary-500">{age.value}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[0.8rem] font-semibold text-primary-700">{date.title}</span>
          <span className="text-[1.2rem] font-bold text-primary-500">{format(date.value, "MMM do")}</span>
        </div>
      </CardContent>
    </Card>
  );
}
