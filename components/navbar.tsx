import { DrawerMenu } from "@/components/drawer-menu";
import { Logo } from "@/components/logo";

export function Navbar() {
  return (
    <nav className="border-b border-primary-700 bg-primary-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo className="text-nowrap text-xl text-primary-700 hover:text-primary-800 md:text-2xl lg:text-3xl" />
        <DrawerMenu />
      </div>
    </nav>
  );
}
