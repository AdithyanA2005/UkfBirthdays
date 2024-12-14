"use client";

import { CheckIcon, PanelBottomOpenIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { themes, themeShades } from "@/lib/constants";
import { Theme } from "@/lib/types";

export function DrawerMenu() {
  const switchTheme = (theme: Theme) => {
    themeShades.forEach((shade) => {
      document.documentElement.style.setProperty(`--primary-${shade}`, `var(--${theme}-${shade})`);
    });
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <PanelBottomOpenIcon className="size-6 text-primary-700" />
          </TooltipTrigger>
          <TooltipContent>Open Drawer</TooltipContent>
        </Tooltip>
      </DrawerTrigger>

      <DrawerContent className="bg-primary-100 pb-6">
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl font-semibold text-primary-950">Settings</DrawerTitle>
          </DrawerHeader>

          <section className="px-4">
            <DrawerTitle className="mb-2 text-xl font-semibold text-primary-950">Customize</DrawerTitle>

            <div className="flex flex-wrap gap-2.5">
              {themes.map((theme, index) => (
                <button
                  key={`theme-${index}-${theme.key}`}
                  onClick={() => switchTheme(theme.key)}
                  className="flex items-center rounded-lg"
                  style={{ backgroundColor: `var(--${theme.key}-200)` }}
                >
                  <span className={"py-1 pl-3 pr-2 text-sm font-semibold"} style={{ color: `var(--${theme.key}-900)` }}>
                    {theme.name}
                  </span>
                  <span
                    className="grid h-full w-6 place-items-center rounded-r-[inherit]"
                    style={{ backgroundColor: `var(--${theme.key}-500)` }}
                  >
                    {/* <CheckIcon className="size-3.5" strokeWidth={3.5} style={{ color: `var(--${theme.key}-200)` }} /> */}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
