import TableOfContent from "@/components/core/tableofcontent";
import Demo from "@/components/spec/demo";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Language() {
  return (
    <main>
      <Head>
        <title>ingbetic - learn</title>
      </Head>
      <div className="layout">
        <div className="flex mb-5 md:mb-0 text-center flex-col px-5 items-center justify-center w-full min-h-[16rem]">
          <h2>Learn how to</h2>
          <p className="!text-[2.25rem] flex items-center gap-5 font-bold">
            {/* <span>🤗</span> */}
            <span className="gradient from-purple-500 via-orange-600 to-pink-500">
              build this application
            </span>
          </p>
          <h4 className="mt-8 lg:w-[50vw] 2xl:w-full">
            Detail step-by-step guildline for anyone wanted to build LLM
            applications without paying anything. Harness the power of open
            source applications.
          </h4>
        </div>
      </div>
      {/* <TableOfContent /> */}
      <div className="flex flex-col max-w-5xl px-2 mx-auto">
        <h2 className="mb-5">Frontend</h2>
        <div className="space-y-8 text-justify text-gray-400">
          <p>
            This entire application is developed by{" "}
            <span className="font-bold gradient from-blue-500 to-purple-500">
              <Link target="_blank" href="https://nextjs.org/">
                Next.js
              </Link>
              , <span className="font-normal text-gray-400">and</span>{" "}
              <Link target="_blank" href="https://www.typescriptlang.org/">
                Typescript
              </Link>
            </span>
            . Next.js 13.4 was recently became stable with app router. The home
            route{" "}
            <Link
              target="_blank"
              href="/"
              className="font-bold gradient from-blue-500 to-purple-500"
            >
              /
            </Link>{" "}
            components with the following input is render on client site, other
            than that is all{" "}
            <Link
              target="_blank"
              className="font-bold gradient from-blue-500 to-purple-500"
              href="https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering"
            >
              Server-Site Rendering (SSR)
            </Link>{" "}
            components.
          </p>
          <p>fasdofosa</p>
        </div>
      </div>
    </main>
  );
}
