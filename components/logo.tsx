import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <h1 className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-all">UKF Birthdays</h1>
    </Link>
  );
}
