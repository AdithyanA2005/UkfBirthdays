import Link from "next/link";
import { GitHubIcon, GmailIcon, LinkedInIcon, XIcon } from "./icons";
import { Logo } from "./logo";

export function Footer() {
  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/iadithyana/", icon: LinkedInIcon },
    { name: "GitHub", url: "https://github.com/AdithyanA2005/", icon: GitHubIcon },
    { name: "Gmail", url: "mailto:deepaadithyan56@gmail.com", icon: GmailIcon },
    { name: "X", url: "https://x.com/iadithyana/", icon: XIcon },
  ];

  return (
    <footer className="border-t border-primary">
      <section className="container mx-auto flex items-center justify-between px-4 py-8 md:px-8">
        <Logo />
        
        <div className="flex items-center gap-5">
          <h4 className="text-center text-base font-semibold">Connect with dev</h4>
          {socials.map((social, index) => (
            <Link
              key={`social_icon-${index}-${social.name}`}
              href={social.url}
              title={social.name}
              target="_blank"
              className="size-6 transition duration-100 hover:text-violet-400 active:text-violet-500"
            >
              <social.icon />
            </Link>
          ))}
        </div>
      </section>

      <section className="flex h-14 items-center justify-center gap-2 bg-violet-200/5 px-4 text-center text-base md:px-8">
        <span className="font-semibold">Developed By</span>
        <Link href="https://adithyana.vercel.app/" target="_blank">
          <code className="block font-bold text-violet-400 transition-all duration-300 hover:scale-105 hover:text-violet-500">
            {"<AdithyanA />"}
          </code>
        </Link>
      </section>
    </footer>
  );
}