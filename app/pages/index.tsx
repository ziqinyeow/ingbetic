import Demo from "@/components/spec/demo";
import Head from "next/head";
import React, { useEffect } from "react";

export default function Language() {
  return (
    <main>
      <Head>
        <title>ingbetic - home</title>
      </Head>
      <div className="layout">
        <div className="flex mb-5 md:mb-0 text-center flex-col px-5 items-center justify-center w-full min-h-[16rem]">
          <h2>Check if the food 🍬</h2>
          <p className="!text-[2.25rem] flex items-center gap-5 font-bold">
            <span className="gradient from-purple-500 via-orange-600 to-pink-500">
              is good for diebetic patient
            </span>
          </p>
          <h4 className="mt-8 lg:w-[50vw] 2xl:w-full">
            Easily get insights from your ingredient by pasting the ingredient
            link. Harness the power of machine learning while staying out of AI
          </h4>
        </div>
      </div>
      <Demo />
    </main>
  );
}
