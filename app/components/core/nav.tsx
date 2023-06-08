"use client";

import { FC } from "react";
import Logo from "./logo";
import Button from "./button";
import { BrainCircuit } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface NavProps {}

const Nav: FC<NavProps> = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="justify-between mb-10 layout">
      <Logo />
      <div className="flex items-center gap-2">
        <Button
          className={clsx([
            pathname === "/learn" && "!text-black !bg-gray-100",
          ])}
          onClick={() => {
            router.push("/learn");
          }}
        >
          <BrainCircuit className="w-4 h-4 text-inherit" />
          <span className="hidden md:block">Learn</span>
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
