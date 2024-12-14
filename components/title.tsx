import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Title({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <div
      className={cn(
        "mb-4 flex items-center gap-2", // Styles the title container for layout.
        "w-fit rounded-lg px-3.5 py-1 backdrop-blur-2xl", // Provides a blurred backdrop
      )}
    >
      <Icon className="h-6 w-6 text-primary-700" />
      <h2 className="text-2xl font-bold text-primary-700">{title}</h2>
    </div>
  );
}
