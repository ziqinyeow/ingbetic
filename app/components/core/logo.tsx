import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={`/`} className="flex items-center gap-1 py-5">
      <Image
        src="/favicon/android-chrome-512x512.png"
        alt="logo"
        width={30}
        height={30}
        className="rounded-md"
      />
      <span>betic</span>
    </Link>
  );
}
