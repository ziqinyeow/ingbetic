import * as ort from "onnxruntime-web";
import { AutoTokenizer } from "../tokenizer";
ort.env.wasm.numThreads = 3;
ort.env.wasm.simd = true;

export default async function load_session(model = "model/model-int8.onnx") {
  const session = await ort.InferenceSession.create(model, {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
  });
  return session;
}

export async function tokenize() {
  const text =
    "1 pound ground beef, 1 tablespoon dehydrated onion, 1 teaspoon salt, 1/2 teaspoon pepper, 1 teaspoon garlic powder, 1/4 teaspoon oregano, 1 cup uncooked penne pasta, 1 cup water, 1 (15-ounce) can fire-roasted diced tomatoes, 1/4 cup Parmesan cheese, 1/2 cup shredded mozzarella cheese, 4-6 fresh basil leaves, torn";
  const tokenizer = AutoTokenizer.from_pretrained("/model/tokenizer.json");
  console.log(tokenizer);
  //   const output = tokenizer.encode(text);
  //   console.log(tokenizer);
  //   input_ids = new ort.Tensor("int64", BigInt64Array.from(input_ids), [1, 10]);
}
