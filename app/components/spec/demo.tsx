"use client";

import clsx from "clsx";
import { TerminalSquare, X } from "lucide-react";
import "reactflow/dist/style.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactFlow from "reactflow";
import useData from "@/context/data";
import { isValidURL } from "@/lib/utils";
import { initialEdges, initialNodes, nodeTypes } from "@/lib/node";
import { Tokenizer, inference, load_session } from "@/lib/model/inference";
import Loader from "../ui/loader";

const width = "w-[350px] sm:w-[400px] lg:w-[600px]";

export default function Demo() {
  const reactflowref = useRef(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [valid, setValid] = useState(0);
  const [session, setSession] = useState<any>();
  const [ingredients, setIngredients] = useState({
    ok: false,
    list: [],
    text: "",
  });
  const { prompt, setPrompt } = useData();

  const tokenizer = useMemo(() => {
    return Tokenizer();
  }, []);

  useEffect(() => {
    (async () => {
      const _session = await load_session();
      setSession(_session);
    })();
  }, []);

  const generate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt?.length === 0) {
      return;
    }

    if (!isValidURL(prompt)) {
      setValid(-1);
      return;
    }

    // generate
    setPrompt("");

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
        } else {
          return {
            ...n,
            data: {
              ...n?.data,
              children: (
                <>
                  <Loader />
                </>
              ),
            },
          };
        }
      })
    );

    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        url: prompt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const ingredients = await response.json();

    // no ingredients found
    if (!response.ok || !ingredients.text) {
      setNodes((_nodes) =>
        _nodes?.map((n) => {
          if (n?.id === "1") {
            return {
              ...n,
              data: {
                ...n?.data,
                children: "No ingredients found",
              },
            };
          } else if (["2", "3", "4"].includes(n?.id)) {
            return {
              ...n,
              data: {
                ...n?.data,
                children: <X className="w-4 h-4 text-gray-300" />,
              },
            };
          }
          return { ...n };
        })
      );
      return;
    }

    setIngredients(ingredients);

    setNodes((_nodes) =>
      _nodes?.map((n) => {
        if (n?.id === "1") {
          return {
            ...n,
            data: {
              ...n?.data,
              children: ingredients?.text ?? "",
            },
          };
        }
        return { ...n };
      })
    );

    const sugar = await inference(ingredients?.text, tokenizer, session);

    setNodes((_nodes) =>
      _nodes?.map((n) => {
        if (n?.id === "2") {
          return {
            ...n,
            data: {
              ...n?.data,
              children: "...",
            },
          };
        } else if (n?.id === "3") {
          return {
            ...n,
            data: {
              ...n?.data,
              children: sugar,
            },
          };
        } else if (n?.id === "4") {
          return {
            ...n,
            data: {
              ...n?.data,
              children: sugar > 10 ? "Bad" : "Good",
            },
          };
        }
        return { ...n };
      })
    );
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
              disabled={!session || !tokenizer}
              value={prompt}
              onChange={(e) => {
                const { value } = e.target;
                setValid(0);
                setPrompt(value);
              }}
              placeholder="https://www.myrecipes.com/recipe/apple-galette"
              className={clsx([
                "block w-full p-3 pl-10 pr-12 transition-all text-sm border-gray-200 bg-white border-2 rounded-md shadow-lg peer focus:border-black focus:outline-none focus:ring-0",
                valid === 0 && "!border-black",
                valid === -1 && "!border-red-200",
                valid === 1 && "!border-green-200",
                (!session || !tokenizer) && "opacity-30",
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
