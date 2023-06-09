# 🥪 Ingredient Text to Sugar Level Estimation

## Dataset

This dataset is being normalized and can be downloaded here at [huggingface hub](https://huggingface.co/datasets/ziq/ingredient_to_sugar_level).

See how I processed the dataset: [process.ipynb](./data/process.ipynb).

See [data/README.md](./data/) for more details.

Note: The result should `* 13.3627190349059 + 10.85810766787474` to obtain the actual sugar level

## Model

The model is a fine-tuned version of [distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english) and achieve 0.069200 loss.

See [ziq/ingbetic](https://huggingface.co/ziq/ingbetic) at HuggingFace Hub and how to train the model using HuggingFace Trainer API [here](https://huggingface.co/ziq/ingbetic/blob/main/train.ipynb).

## App

<div align="center">
    <img src="./asset/demo.gif">
</div>

<br/>

See [app/README.md](./app/) for more details.
