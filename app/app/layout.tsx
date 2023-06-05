import { inter, mono } from "@/lib/font";
import "./globals.css";
import Nav from "@/components/core/nav";
import Footer from "@/components/core/footer";
import Background from "@/components/core/background/background";
import clsx from "clsx";
import { DataProvider } from "@/context/data";

export const metadata = {
  title: "ziqsite",
  description: "A static site generator powered by LLM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx([mono.className, ""])}>
        <div className="flex">
          <div className="z-10 w-full">
            <Nav />
            {children}
            <Footer />
          </div>
          <Background />
        </div>
      </body>
    </html>
  );
}
