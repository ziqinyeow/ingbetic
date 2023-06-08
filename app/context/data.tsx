"use client";

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

  // useEffect(() => {
  //   (async () => {})();
  // }, []);

  const value = { prompt, setPrompt };

  return <context.Provider value={value}>{children}</context.Provider>;
}

export default function useData() {
  return useContext(context);
}
