import { LucideIcon } from "lucide-react";

export function Title({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="h-6 w-6 text-primary" />
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
    </div>
  );
}
