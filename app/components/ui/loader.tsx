import clsx from "clsx";
import React from "react";

export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={clsx([
        "w-3 h-3 border border-gray-400 border-dashed rounded-full border-t-transparent animate-spinner",
        className,
      ])}
    />
  );
}
