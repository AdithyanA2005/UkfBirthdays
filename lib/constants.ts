import { LinkedInIcon, GitHubIcon, GmailIcon, XIcon } from "@/components/icons";
import { Semester } from "@prisma/client";

export const footerSocials = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/iadithyana/", icon: LinkedInIcon },
  { name: "GitHub", url: "https://github.com/AdithyanA2005/", icon: GitHubIcon },
  { name: "Gmail", url: "mailto:adithyana2005@gmail.com", icon: GmailIcon },
  { name: "X", url: "https://x.com/iadithyana/", icon: XIcon },
];

export const footerContributors = [
  {
    name: "Adithyan A",
    github: "https://github.com/AdithyanA2005",
    avatar: "/adithyan.png",
  },
  {
    name: "Amjad Thaha",
    github: "https://github.com/Amjad-Thaha",
    avatar: "/amjad.jpeg",
  },
];

export const semesterMappings: Record<Semester, string> = {
    "ONE": "1",
    "TWO": "2",
    "THREE": "3",
    "FOUR": "4",
    "FIVE": "5",
    "SIX": "6",
    "SEVEN": "7",
    "EIGHT": "8",
} as const;