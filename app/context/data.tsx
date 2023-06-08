"use client";

import { Tokenizer, load_session } from "@/lib/model/inference";
import { BertTokenizer } from "@xenova/transformers";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Context = {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
};

const defaultValue: Context = {
  prompt: "",
  setPrompt: () => {},
};

const context = createContext(defaultValue);

export function DataProvider({ children }: { children?: React.ReactNode }) {
  const [prompt, setPrompt] = useState("");
  // const [session, setSession] = useState<any>(null);

  // useEffect(() => {
  //   (async () => {
  //     const _session = await load_session();
  //     setSession(_session);
  //   })();
  // }, []);

  const value = { prompt, setPrompt };

  return <context.Provider value={value}>{children}</context.Provider>;
}

export default function useData() {
  return useContext(context);
}
