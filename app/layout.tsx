import type { Metadata } from "next";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BalloonAnimation } from "@/components/balloon-animation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "UKF Birthdays",
  description: "Track and display birthdays for UKF students, featuring a modern UI with dark mode support.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-primary-200 antialiased`}>
        <TooltipProvider>
          <div className="fixed inset-0 z-0 h-full">
            <BalloonAnimation />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="container mx-auto flex-1 px-4 pb-16 pt-12">{children}</main>
            <Footer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
