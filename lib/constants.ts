import { XIcon } from "lucide-react";
import { LinkedInIcon, GitHubIcon, GmailIcon } from "@/components/icons";
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
