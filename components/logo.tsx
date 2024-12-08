import localFont from "next/font/local";
import Link from "next/link";
import { cn } from "@/lib/utils";

const coinySans = localFont({
  src: "../app/fonts/CoinyRegular.ttf",
  variable: "--font-coiny-sans",
});

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <h1 className={cn(coinySans.className, "text-primary-600 transition-all hover:text-primary-700", className)}>
        UKF Birthdays
      </h1>
    </Link>
  );
}
