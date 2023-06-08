import { inter, mono } from "@/lib/font";
import Nav from "@/components/core/nav";
import Footer from "@/components/core/footer";
import Background from "@/components/core/background/background";
import clsx from "clsx";

// export const metadata = {
//   title: "ziqsite",
//   description: "A static site generator powered by LLM",
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx([mono.className, "flex"])}>
      <div className="z-10 w-full">
        <Nav />
        {children}
        <Footer />
      </div>
      <Background />
    </div>
  );
}
