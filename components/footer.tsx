import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, GmailIcon, LinkedInIcon, XIcon } from "./icons";
import { Logo } from "./logo";

export function Footer() {
  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/iadithyana/", icon: LinkedInIcon },
    { name: "GitHub", url: "https://github.com/AdithyanA2005/", icon: GitHubIcon },
    { name: "Gmail", url: "mailto:adithyana2005@gmail.com", icon: GmailIcon },
    { name: "X", url: "https://x.com/iadithyana/", icon: XIcon },
  ];

  const contributors = [
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

  return (
    <footer className="border-t border-primary">
      <section className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-9 sm:gap-3 px-4 py-8 sm:flex-row md:px-8">
          <Logo />

          <div className="flex flex-col gap-7 items-start">
            <div className="flex items-center justify-center gap-4">
              <h4 className="text-center text-base font-semibold">Special Thanks</h4>

              <div className="flex items-center gap-2">
                {contributors.map((contributor, index) => (
                  <Link
                    key={`contributor-${index}`}
                    href={contributor.github}
                    target="_blank"
                    className="group relative"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-violet-500/20 transition-all group-hover:ring-violet-500">
                      <Image src={contributor.avatar} alt={contributor.name} fill className="object-cover" />
                    </div>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-violet-950 px-2 py-1 text-sm text-violet-100 opacity-0 transition-all group-hover:opacity-100">
                      {contributor.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

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
          </div>
        </div>
      </section>

      <section className="bg-violet-200/5">
        <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-6 md:px-8">
          <span className="font-semibold">Developed By</span>
          <Link href="https://adithyana.vercel.app/" target="_blank">
            <code className="block font-bold text-violet-400 transition-all duration-300 hover:scale-105 hover:text-violet-500">
              {"<AdithyanA />"}
            </code>
          </Link>
        </div>
      </section>
    </footer>
  );
}
