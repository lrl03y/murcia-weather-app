from flask import Flask, jsonify, render_template
import requests
import os

app = Flask(__name__, static_folder="static", template_folder="templates")

AEMET_API_KEY = os.getenv("AEMET_API_KEY")

@app.route("/api/weather")
def weather():
    headers = {"accept": "application/json", "api_key": AEMET_API_KEY}
    url = "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/30030"
    r = requests.get(url, headers=headers).json()
    if "datos" in r:
        data_url = r["datos"]
        data = requests.get(data_url).json()
        return jsonify(data)
    return jsonify({"error": "No data returned from AEMET"}), 500

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
   import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

