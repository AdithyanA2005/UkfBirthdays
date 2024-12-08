import Link from "next/link";
import { Logo } from "./logo";

export function Navbar() {
  return (
    <nav className="container mx-auto p-4">
      <div className="flex h-16 items-center justify-center rounded-lg bg-primary-700">
        <div className="flex items-center space-x-4">
          <Logo className="text-3xl text-primary-100 hover:text-primary-50" />
        </div>

        {/* <div className="ml-auto"> */}
        {/* <Link href="/all" className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            View All Birthdays
          </Link> */}
        {/* </div> */}
      </div>
    </nav>
  );
}
