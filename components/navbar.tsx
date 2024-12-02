import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-semibold text-primary-foreground">
            UKF Birthdays
          </Link>
        </div>

        <div className="ml-auto">
          <Link href="/all" className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            View All Birthdays
          </Link>
        </div>
      </div>
    </nav>
  );
}
