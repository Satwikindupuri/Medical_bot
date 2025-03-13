from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Enables cross-origin requests

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="ai_medical_db"
)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get("symptoms", [])

    if isinstance(symptoms, str):  
        symptoms = [symptoms]  # Convert to a list if only one symptom is sent

    print("Received Symptoms:", symptoms)  # Debugging print

    # Get possible diseases from the database
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT DISTINCT d.disease_name 
        FROM symptoms s
        JOIN diagnoses d ON s.disease_id = d.id
        WHERE s.symptom_name IN (%s)
    """ % ",".join(["%s"] * len(symptoms)), symptoms)

    result = cursor.fetchall()
    cursor.close()

    # Check if any disease was found
    if result:
        diagnosis = ", ".join([row["disease_name"] for row in result])
    else:
        diagnosis = "No matching disease found"

    print("Diagnosis:", diagnosis)  # Debugging print

    return jsonify({"diagnosis": diagnosis})

if __name__ == '__main__':
    app.run(debug=True)
