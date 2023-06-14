from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

templates = [
    {
        "inputs": 5,
        "category": "Sports",
        "word": "Chess"
    },
    {
        "inputs": 6,
        "category": "European Country Name",
        "word": "France"
    },
    {
        "inputs": 5,
        "category": "Fruit",
        "word": "Mango"
    },
    {
        "inputs": 5,
        "category": "Fruit",
        "word": "Apple"
    },
    {
        "inputs": 7,
        "category": "Sports",
        "word": "Cricket"
    }
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get-templates")
def get_story():
    return jsonify({
        "status": "success",
        "word": random.choice(templates)
    })

#@app.route("/post-answers", methods=["POST"])
#def post_answers():
#    story_id = request.json.get("story_id")
#    values = request.json.get("values")
#    answers = answer_dict.get(story_id)
#    index, score = 0, 0
#    while index < len(values):
#        if values[index].lower() == answers[index].lower():
#            score += 1
#        index += 1
#    return jsonify({
#        "status": "success",
#        "result": f"{score} / {len(values)}"
#    })

if __name__ == "__main__":
    app.run(debug=True)