from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__, static_folder="static", template_folder="templates")

AEMET_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJscmwwM3lAZ21haWwuY29tIiwianRpIjoiMWQ0MjY2MzEtMzNlNC00ZGM5LWJhNjUtODY2ODBkNGVhZjVmIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3NDk3MTQwNjksInVzZXJJZCI6IjFkNDI2NjMxLTMzZTQtNGRjOS1iYTY1LTg2NjgwZDRlYWY1ZiIsInJvbGUiOiIifQ.ill_c44EcVJZsf3Rb31mErCU34fdw9YcRUB1Hj-1kUk"

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
    app.run(debug=True)
