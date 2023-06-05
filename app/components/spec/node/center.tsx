import clsx from "clsx";
import React from "react";
import { useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";

type NodeData = {
  type: "custom";
  label?: string;
  handler?: any[];
  children?: React.ReactNode;
};

export default function CenterNode({ data }: NodeProps<NodeData>) {
  return (
    <>
      <div className="relative hover:cursor-pointer w-[9rem] h-[2rem]">
        <div className="text-[7px] text-gray-500 flex items-center gap-1 absolute -top-3 left-1 font-bold">
          {data?.label}
        </div>
        <div className="w-full h-full px-3 flex items-center justify-center text-[8px] font-sans bg-white border border-separate border-black rounded-sm">
          <div className="truncate">{data?.children ?? "..."}</div>
        </div>
        {/* <div className="flex items-center justify-center w-full h-full">
          <div className="text-[6px] w-full h-full px-2 truncate font-sans bg-white border border-separate border-black rounded-sm">
            {data?.children}
          </div>
        </div> */}
      </div>
      {data?.handler?.map((handler, i) => (
        <Handle
          key={i}
          type={handler?.type}
          position={handler?.position}
          isConnectable={false}
        />
      ))}
    </>
  );
}
