# 🥪 Ingredient Text to Sugar Level Estimation

## Dataset

This dataset is being normalized and can be downloaded here at [huggingface hub](https://huggingface.co/datasets/ziq/ingredient_to_sugar_level).

See how I processed the dataset: [process.ipynb](./data/process.ipynb).

See [data/README.md](./data/) for more details.

Note: The result should `* 13.3627190349059 + 10.85810766787474` to obtain the actual sugar level.

## Model

The model is a fine-tuned version of [distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english) and achieve 0.069200 loss.

See [ziq/ingbetic](https://huggingface.co/ziq/ingbetic) at HuggingFace Hub and how to train the model using HuggingFace Trainer API [here](https://huggingface.co/ziq/ingbetic/blob/main/train.ipynb).

## App

<br/>

<div align="center">
    <img src="./asset/demo.gif">
</div>

<br/>

The entire frontend app is developed using [Next.js](https://nextjs.org/) 12 and [Typescript](https://www.typescriptlang.org/), not using Next.js 13.4 due to the `@xenova/transformers` dependency called `sharp` couldn't resolved in Next.js 13.4 (ended up migrating from `app router` -> `pages router`).

The model trained using HuggingFace Trainer API is being exported to `onnx` using `torch.onnx.export` which expects `input_ids` and `attention_mask` as inputs and outputs a regression value called `logits`. The `onnx` model then get further quantize into `int8` precision using `quantize_dynamic("", "", weight_type=QuantType.QUInt8)`.

In order to reduce the model deployment cost, edge deployment is used to load the `onnx` model directly to client side. However, the model doesn't include tokenizing text out of the box. To address the tokenizer issues, see how to tokenize text in Javascript/Typescript in [model/inference.ts](./app/lib/model/inference.ts). Consequently, the ingredients can be tokenized and then serve as the forward pass inputs to the `onnx` model.

Regarding the ingredient extractions from url, somehow this is quite manual. I used cheerio to scrape the elements nearby the `h1 ... h6` tags and return it as list. See how I [scrape the ingredients](/app/pages/api/index.ts) as an api.

## Acknowledgement

To all the framework and library maintainers.
