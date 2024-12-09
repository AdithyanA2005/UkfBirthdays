import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Logo } from "@/components/logo";
import { footerContributors, footerSocials } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-primary-700 bg-primary-200">
      {/* TOP */}
      <section className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-9 px-4 py-8 sm:flex-row sm:gap-3 md:px-8">
          {/* TOP-LEFT */}
          <Logo className="text-3xl text-primary-700" />

          {/* TOP-RIGHT */}
          <div className="flex flex-col items-start gap-7">
            {/* TOP-RIGHT: Special Thanks */}
            <div className="flex items-center justify-center gap-4">
              <h4 className="text-center text-base font-semibold text-primary-950">Special Thanks</h4>

              <div className="flex items-center gap-2">
                {footerContributors.map((contributor, index) => (
                  <Tooltip key={`contributor-${index}`}>
                    <TooltipTrigger asChild>
                      <Link
                        href={contributor.github}
                        target="_blank"
                        className="group relative size-10 overflow-hidden rounded-full"
                      >
                        <Image src={contributor.avatar} alt={contributor.name} fill className="object-cover" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{contributor.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* TOP-RIGHTL: Connect */}
            <div className="flex items-center gap-4">
              <h4 className="text-center text-base font-semibold text-primary-950">Connect with dev</h4>

              <div className="item-center flex gap-2">
                {footerSocials.map((social, index) => (
                  <Tooltip key={`soci˜l_icon-${index}-${social.name}`}>
                    <TooltipTrigger asChild>
                      <Link
                        href={social.url}
                        title={social.name}
                        target="_blank"
                        className="size-8 text-primary-700 transition duration-100 hover:text-primary-800 active:text-primary-900"
                      >
                        <social.icon />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM */}
      <section className="bg-primary-300">
        <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-4 md:px-8">
          <span className="font-semibold text-primary-950">Developed By</span>
          <Link href="https://adithyana.vercel.app/" target="_blank">
            <code className="block font-bold text-primary-700 transition-all duration-300 hover:scale-105 hover:text-primary-800">
              {"<AdithyanA />"}
            </code>
          </Link>
        </div>
      </section>
    </footer>
  );
}
