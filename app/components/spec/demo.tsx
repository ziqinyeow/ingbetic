"use client";

import clsx from "clsx";
import { TerminalSquare } from "lucide-react";
import "reactflow/dist/style.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocalStorage } from "react-use";
import { nanoid } from "nanoid";
import ReactFlow, { Position } from "reactflow";
import useData from "@/context/data";
import CenterNode from "./node/center";
import { isValidURL } from "@/lib/utils";

interface Result {
  id: string;
  prompt: string;
  answer: string;
  model: string;
}

const width = "w-[350px] sm:w-[400px] lg:w-[600px]";

const initialNodes = [
  {
    id: "0",
    type: "center",
    data: {
      label: "URL",
      handler: [{ type: "source", position: Position.Bottom }],
    },
    position: { x: -20, y: -50 },
  },
  {
    id: "1",
    type: "center",
    data: {
      label: "Ingredient",
      handler: [
        { type: "source", position: Position.Right },
        { type: "target", position: Position.Top },
      ],
    },
    position: { x: 0, y: 20 },
  },
  {
    id: "2",
    type: "center",
    data: {
      label: "Model",
      handler: [
        { type: "source", position: Position.Right },
        { type: "target", position: Position.Left },
      ],
    },
    position: { x: 180, y: 0 },
  },
  {
    id: "3",
    type: "center",
    data: {
      label: "Sugar Level",
      handler: [
        { type: "source", position: Position.Bottom },
        { type: "target", position: Position.Left },
      ],
    },
    position: { x: 360, y: -50 },
  },
  {
    id: "4",
    type: "center",
    data: {
      label: "Good?",
      handler: [{ type: "target", position: Position.Top }],
    },
    position: { x: 360, y: 20 },
  },
];

const initialEdges = [
  {
    id: "0-1",
    source: "0",
    target: "1",
    animated: true,
  },
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "2-3",
    source: "2",
    target: "3",
    animated: true,
  },
  {
    id: "3-4",
    source: "3",
    target: "4",
    animated: true,
  },
];

const nodeTypes = { center: CenterNode };

export default function Demo() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [valid, setValid] = useState(0);

  const [model, setModel] = useState("gpt");

  const { prompt, setPrompt } = useData();

  const generate = async (e: React.FormEvent<HTMLFormElement>) => {
    "use client";
    e.preventDefault();
    if (prompt?.length === 0) {
      return;
    }

    if (!isValidURL(prompt)) {
      setValid(-1);
      return;
    }

    setNodes((_nodes) =>
      _nodes?.map((n) => {
        if (n?.id === "0") {
          return {
            ...n,
            data: {
              ...n?.data,
              children: prompt.replace("https://", "").replace("http://", ""), //.split("/").slice(0, 4).join("/"),
            },
          };
        }
        return { ...n };
      })
    );

    setNodes((_nodes) =>
      _nodes?.map((n) => {
        if (n?.id === "4") {
          return {
            ...n,
            data: {
              ...n?.data,
              children: "Good",
            },
          };
        }
        return { ...n };
      })
    );
    // generate
    setPrompt("");
  };

  return (
    <>
      <div className="mt-5 layout">
        <div className="flex flex-col items-center justify-center w-full">
          <form
            onSubmit={generate}
            className={clsx(["flex items-center relative", width])}
          >
            <div className="absolute text-xs font-bold text-gray-500 -top-5 left-2">
              Enter Recipe URL:
            </div>
            <TerminalSquare className="absolute inset-y-0 left-0 w-5 my-3 ml-3 text-gray-400" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => {
                const { value } = e.target;
                setValid(0);
                setPrompt(value);
              }}
              placeholder="https://www.myrecipes.com/recipe/apple-galette"
              className={clsx([
                "block w-full p-3 pl-10 pr-12 text-sm border-gray-200 bg-white border-2 rounded-md shadow-lg peer focus:border-black focus:outline-none focus:ring-0",
                valid === 0 && "!border-black",
                valid === -1 && "!border-red-200",
                valid === 1 && "!border-green-200",
              ])}
            />
            <button
              type="submit"
              className={clsx([
                prompt?.length === 0
                  ? "cursor-not-allowed"
                  : "hover:border-gray-700 hover:text-gray-700 peer-focus:border-gray-700 peer-focus:text-gray-700",
                "absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400",
                valid === 0 && "!border-black",
                valid === -1 && "!border-red-200",
                valid === 1 && "!border-green-200",
              ])}
            >
              <p>↵</p>
            </button>
          </form>
        </div>
      </div>
      <div className="h-56 mt-10 layout">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          // connectionLineComponent={ConnectionLine}
          proOptions={{ hideAttribution: true }}
          fitView
          fitViewOptions={{
            padding: 0.3,
            // minZoom: ,
            // maxZoom: 20,
          }}
          className="!cursor-default"
          // edgesUpdatable={false}
          zoomOnDoubleClick={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll={false}
          panOnDrag={false}
          draggable={false}
          nodesDraggable={false}
          // preventScrolling={true}
        ></ReactFlow>
      </div>
    </>
  );
}