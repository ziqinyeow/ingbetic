import Link from "next/link";
import React from "react";

const tableofcontent = [
  {
    name: "Frontend",
    link: "frontend",
    sub: [
      {
        name: "Framework - Next.js, Typescript",
        link: "frontend-tech",
      },
      {
        name: "UI Library - shadcn",
        link: "frontend-ui",
      },
      {
        name: "Reactflow",
        link: "frontend-reactflow",
      },
    ],
  },
  {
    name: "Model Training",
    link: "train",
    sub: [
      {
        name: "GPU Spec",
        link: "train-gpu",
      },
      {
        name: "Data - Yummly-66k",
        link: "train-data",
      },
      {
        name: "Model - DistillBert, Falcon",
        link: "train-huggingface",
      },
    ],
  },
  {
    name: "Model Deployment",
    link: "deploy",
  },
];

export default function TableOfContent() {
  return (
    <div className="flex flex-col max-w-5xl px-2 mx-auto">
      <h3 id="tableofcontent" className="mb-8 scroll-m-10">
        Table of Content
      </h3>
      <div className="flex flex-col pl-4 space-y-16">
        {tableofcontent?.map((table, i) => (
          <div key={i} className="">
            <Link
              href={`/learn#${table?.link}`}
              className="flex items-center gap-5 text-gray-600 hover:underline hover:text-black"
            >
              <span>{i + 1}.0</span>
              <span>{table?.name}</span>
            </Link>
            <div className="">
              {table?.sub?.map((s, j) => (
                <Link
                  key={i + j}
                  href={`/learn#${s?.link}`}
                  className="flex items-center gap-5 pl-12 mt-3 text-gray-600 hover:underline hover:text-black"
                >
                  <span>
                    {i + 1}.{j + 1}
                  </span>
                  <span>{s?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
