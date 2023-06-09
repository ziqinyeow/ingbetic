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
    // console.log(
    //   bert_tokenizer(
    //     "Unsalted butter, for baking sheet, 4 whole boneless rainbow trout, Sea salt and freshly ground black pepper, Sea salt and freshly ground black pepper, 1 bunch fresh dill, 8 thin slices lemon, 2 cups watercress leaves, 4 radishes, thinly sliced, 1/2 cup coarsely crumbled feta cheese, 1/4 cup walnuts, toasted and coarsely chopped, 2 tablespoons Sherry Vinaigrette, 1/4 cup creme fraiche"
    //   )
    // );
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
  // console.log(input, logits);

  const result =
    Array?.from(logits)?.[0] * 13.3627190349059 + 10.85810766787474;
  return result;
}

// const { input_ids, attention_mask } = bert_tokenizer("1 amazing item", {
//   padding: true,
//   truncation: true,
//   max_length: 512,
// });
