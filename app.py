from flask import Flask, jsonify
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

CODEFORCES_API = "https://codeforces.com/api/contest.list"
CODECHEF_API = "https://www.codechef.com/api/list/contests/all"
ATCODER_API = "https://kenkoooo.com/atcoder/resources/contests.json"
HACKATHON_API = "https://hackathons.hackclub.com/api/events/upcoming"

def fetch_data(url):
    """Fetch data from external APIs safely."""
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {url}: {e}")
        return None

def format_codeforces(data):
    """Format Codeforces API response to match other platforms."""
    return [
        {
            "id": contest["id"],
            "name": contest["name"],
            "start_time": contest["startTimeSeconds"],
            "duration": contest["durationSeconds"],
            "url": f"https://codeforces.com/contest/{contest['id']}",
        }
        for contest in data.get("result", []) if contest.get("phase") == "BEFORE"
    ]

def format_codechef(data):
    """Format CodeChef API response to match other platforms."""
    return [
        {
            "id": contest["contest_code"],
            "name": contest["contest_name"],
            "start_time": contest["contest_start_date"],
            "duration": contest["contest_duration"],
            "url": f"https://www.codechef.com/{contest['contest_code']}",
        }
        for contest in data.get("future_contests", [])
    ]

def format_atcoder(data):
    """Format AtCoder API response to match other platforms."""
    current_time = int(time.time())  # Get current UNIX timestamp
    return [
        {
            "id": contest["id"],
            "name": contest["title"],
            "start_time": contest["start_epoch_second"],
            "duration": contest["duration_second"],
            "url": f"https://atcoder.jp/contests/{contest['id']}",
        }
        for contest in data if contest["start_epoch_second"] > current_time
    ]

def format_hackathons(data):
    """
    Format the hackathon data.
    Since the Hackathon API returns data in the required structure,
    we can simply return the list if it exists.
    """
    if isinstance(data, list):
        return data
    return []

@app.route("/contests", methods=["GET"])
def get_contests():
    """Fetch contests from Codeforces, CodeChef, and AtCoder."""
    codeforces_data = fetch_data(CODEFORCES_API)
    codechef_data = fetch_data(CODECHEF_API)
    atcoder_data = fetch_data(ATCODER_API)

    contests = {
        "codeforces": format_codeforces(codeforces_data) if codeforces_data else [],
        "codechef": format_codechef(codechef_data) if codechef_data else [],
        "atcoder": format_atcoder(atcoder_data) if atcoder_data else [],
    }

    return jsonify(contests)

@app.route("/hackathons", methods=["GET"])
def get_hackathons():
    """Fetch hackathons from the Hackathon API."""
    hackathons_data = fetch_data(HACKATHON_API)
    hackathons = format_hackathons(hackathons_data) if hackathons_data else []
    return jsonify({"hackathons": hackathons})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
