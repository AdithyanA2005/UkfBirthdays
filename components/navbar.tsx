import { DrawerMenu } from "@/components/drawer-menu";
import { Logo } from "@/components/logo";

export function Navbar() {
  return (
    <nav className="container mx-auto p-4">
      <div className="flex h-16 items-center justify-between rounded-lg bg-primary-600 px-4">
        <Logo className="text-nowrap text-xl text-primary-100 hover:text-primary-50 md:text-2xl lg:text-3xl" />
        <DrawerMenu />
      </div>
    </nav>
  );
}
