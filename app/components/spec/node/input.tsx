import clsx from "clsx";
import { TerminalSquare } from "lucide-react";
import React from "react";
import { Handle, NodeProps } from "reactflow";

type NodeData = {
  type: "input";
  label?: string;
  handler?: any[];
};

const width = "w-[350px] sm:w-[400px] lg:w-[600px]";

export default function InputNode({ data }: NodeProps<NodeData>) {
  return (
    <>
      <div className="relative">
        <form
          onSubmit={() => {}}
          className={clsx(["relative flex items-center", "w-96"])}
        >
          <TerminalSquare className="absolute inset-y-0 left-0 w-5 my-2 ml-3 text-gray-400" />
          <input
            type="text"
            //   value={prompt}
            //   onChange={(e) => {
            //     setPrompt(e.target.value);
            //   }}
            placeholder="https://www.myrecipes.com/recipe/apple-galette"
            className="block w-full p-2 pl-10 pr-12 text-sm bg-white border border-gray-200 rounded-md shadow-lg peer focus:border-black focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className={`${
              prompt?.length === 0
                ? "cursor-not-allowed"
                : "hover:border-gray-700 hover:text-gray-700 peer-focus:border-gray-700 peer-focus:text-gray-700"
            } absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400`}
          >
            <p>↵</p>
          </button>
        </form>

        {data?.handler?.map((handler, i) => (
          <Handle
            key={i}
            type={handler?.type}
            position={handler?.position}
            isConnectable={false}
          />
        ))}
      </div>
    </>
  );
}
