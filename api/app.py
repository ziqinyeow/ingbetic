# import onnxruntime as ort
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask import Flask, jsonify, request

# session = ort.InferenceSession("model-int8.onnx")

tokenizer = AutoTokenizer.from_pretrained("ziq/ingbetic")
m = AutoModelForSequenceClassification.from_pretrained("ziq/ingbetic")

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello World!"


@app.route("/inference", methods=["POST"])
def inference():
    # text = "1 pound ground beef, 1 tablespoon dehydrated onion, 1 teaspoon salt, 1/2 teaspoon pepper, 1 teaspoon garlic powder, 1/4 teaspoon oregano, 1 cup uncooked penne pasta, 1 cup water, 1 (15-ounce) can fire-roasted diced tomatoes, 1/4 cup Parmesan cheese, 1/2 cup shredded mozzarella cheese, 4-6 fresh basil leaves, torn"
    try:
        text = request.get_json().get("text", None)
        if not text:
            return jsonify(message="Please pass in text body", logits="", ok=False)

        dummy = tokenizer(
            text, padding="max_length", truncation=True, return_tensors="pt"
        )
        input_ids = dummy["input_ids"]
        attention_mask = dummy["attention_mask"]
        logits = (
            m(input_ids=input_ids, attention_mask=attention_mask)["logits"][0][0].item()
            * 13.3627190349059
            + 10.85810766787474
        )

        # outputs = session.run(
        #     None, {"input_ids": input_ids, "attention_mask": attention_mask}
        # )

        # result = outputs[0] * 13.3627190349059 + 10.85810766787474
        # result = result[0][0]

        return jsonify(logits=str(logits), ok=True)
    except Exception as e:
        print(e)
        return jsonify(logits=str(e), ok=False)
