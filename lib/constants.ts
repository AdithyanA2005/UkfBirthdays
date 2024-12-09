import { Semester } from "@prisma/client";
import { LinkedInIcon, GitHubIcon, GmailIcon, XIcon } from "@/components/icons";
import { Theme } from "./types";

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
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
} as const;

export const themes: { name: string; key: Theme }[] = [
  { name: "Slate", key: Theme.Slate },
  { name: "Gray", key: Theme.Gray },
  { name: "Zinc", key: Theme.Zinc },
  { name: "Neutral", key: Theme.Neutral },
  { name: "Stone", key: Theme.Stone },
  { name: "Red", key: Theme.Red },
  { name: "Orange", key: Theme.Orange },
  { name: "Amber", key: Theme.Amber },
  { name: "Yellow", key: Theme.Yellow },
  { name: "Lime", key: Theme.Lime },
  { name: "Green", key: Theme.Green },
  { name: "Emerald", key: Theme.Emerald },
  { name: "Teal", key: Theme.Teal },
  { name: "Cyan", key: Theme.Cyan },
  { name: "Sky", key: Theme.Sky },
  { name: "Blue", key: Theme.Blue },
  { name: "Indigo", key: Theme.Indigo },
  { name: "Violet", key: Theme.Violet },
  { name: "Purple", key: Theme.Purple },
  { name: "Fuchsia", key: Theme.Fuchsia },
  { name: "Pink", key: Theme.Pink },
  { name: "Rose", key: Theme.Rose },
];

export const themeShades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
