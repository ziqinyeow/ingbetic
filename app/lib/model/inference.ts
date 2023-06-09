import tokenizer from "../../public/tokenizer/tokenizer.json";
import tokenizer_config from "../../public/tokenizer/tokenizer_config.json";

import { BertTokenizer } from "@xenova/transformers";

import * as ort from "onnxruntime-web";
// import { AutoTokenizer } from "../tokenizer";
ort.env.wasm.numThreads = 3;
ort.env.wasm.simd = true;

export async function load_session(model = "model/model-int8.onnx") {
  const session = await ort.InferenceSession.create(model, {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
  });
  return session;
}

export function Tokenizer() {
  try {
    const bert_tokenizer = new BertTokenizer(tokenizer, tokenizer_config);
    return bert_tokenizer;
  } catch (error) {
    console.log(error);
    return () => {};
  }
}

export async function inference(text: string, tokenizer: any, session: any) {
  const { input_ids, attention_mask } = tokenizer(text, {
    padding: true,
    truncation: true,
    max_length: 512,
  });
  const input = {
    input_ids,
    attention_mask,
  };
  const output = await session?.run(input);

  // @ts-ignore
  const logits: Float32Array = output?.["logits"]?.data ?? Float32Array;

  const result =
    Array?.from(logits)?.[0] * 13.3627190349059 + 10.85810766787474;
  return result;
}
