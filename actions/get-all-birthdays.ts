"use server";

import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";

export async function getAllBirthdays(): Promise<Post[]> {
  const birthdays = await prisma.post.findMany({
    orderBy: { date: "asc" },
    include: { author: true },
  });

  return birthdays;
}
