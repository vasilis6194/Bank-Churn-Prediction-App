from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

# Allow requests from your React app running on localhost:3000
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # Allow only these origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model from the .pkl file
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

# Define the data model for incoming prediction requests
class CustomerData(BaseModel):
    CreditScore: int
    Geography: str
    Gender: str
    Age: int
    Tenure: int
    Balance: float
    NumOfProducts: int
    HasCrCard: int
    IsActiveMember: int
    EstimatedSalary: float

@app.get("/")
def read_root():
    return {"message": "Welcome to the Churn Prediction API!"}

@app.post("/predict")
def predict(customer: CustomerData):
    # Convert the incoming data to a DataFrame
    input_data = pd.DataFrame([customer.dict()])
    
    # Use the loaded model to make a prediction
    prediction = model.predict(input_data)
    
    # Convert numeric prediction to a boolean value
    will_exit = bool(prediction[0])
    
    # Return a JSON with the key 'will_exit'
    return {"will_exit": will_exit}

# Run the app using: uvicorn filename:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
