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
    <Card className="relative border-none bg-white text-center shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="gap-2.5 pb-4">
        {department || semester ? (
          <div className="absolute right-0 top-0 rounded-bl-md rounded-tr-md bg-primary-600 px-4 py-0.5 text-sm font-extrabold text-white">
            {semester ? `S${semesterMappings[semester]} ` : null}
            {department ? department : null}
          </div>
        ) : null}

        <Avatar className="mx-auto size-20 rounded-full">
          <AvatarImage src="" alt={name} />
          <AvatarFallback className="bg-primary-100 text-[1.6rem] font-extrabold text-primary-600">
            {name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <CardTitle className="text-[1.35rem] font-bold text-primary-800">{name}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2 divide-x divide-primary-200 px-6 pb-6">
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-primary-700">{age.title}</span>
          <span className="text-[1.4rem] font-bold text-primary-500">{age.value}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-primary-700">{date.title}</span>
          <span className="text-[1.4rem] font-bold text-primary-500">{format(date.value, "MMM do")}</span>
        </div>
      </CardContent>
    </Card>
  );
}
