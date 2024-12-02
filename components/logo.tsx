import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <h1 className="text-xl font-semibold text-violet-100 hover:text-violet-500 transition-all">UKF Birthdays</h1>
    </Link>
  );
}
