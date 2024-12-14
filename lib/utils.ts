import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currentAge(birthday: Date) {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  // Subtract one, if the birthday hasn't passed yet this year
  return hasBirthdayPassed ? age : --age;
}

export function isSameDayAndMonth(date1: Date, date2: Date) {
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth();
}

export function random(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start)) + start;
}
