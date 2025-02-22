# 🚀 Bank Churn Prediction

## 📌 Overview
This is a **Bank Churn Prediction** system that uses a **React** frontend (Netflix-inspired UI) and a **FastAPI** backend for model inference. The goal is to predict whether a bank customer is likely to exit (churn) based on key features such as credit score, balance, and demographics.

## 🛠 Tech Stack
- **Frontend:** React (JavaScript)
- **Machine Learning Backend:** FastAPI (Python)
- **Containerization (Optional):** Docker & Docker Compose
- **Additional Tools:** scikit-learn, joblib (for model serialization)

## 📁 Project Structure
```bash
bank-churn-app/
├── backend/              # FastAPI application
│   ├── main.py           # FastAPI entry point
│   ├── model.pkl         # Pre-trained model (example)
│   ├── requirements.txt  # Python dependencies
├── frontend/
│   ├── my-react-app/
│   │   ├── public/
│   │   │   ├── sources/  # HTML files displayed by the React app
│   │   │   │   ├── test1.html
│   │   │   │   ├── test2.html
│   │   │   │   └── ...
│   │   ├── src/
│   │   │   ├── App.js    # Main React file (Presentation, Predictions, About)
│   │   │   ├── App.css   # Netflix-inspired styling
│   │   │   └── ...
│   │   ├── package.json
│   │   └── ...
└── docker-compose.yml     # Optional Docker config (if used)
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **Python** 3.7+ and pip (or conda)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/bank-churn-app.git
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# FastAPI will run on http://localhost:8000
```

3. **Frontend Setup**
```bash
cd ../frontend/my-react-app
npm install
npm start
# React app will run on http://localhost:3000
```

---

## 📖 Usage

### 1. Home (Presentation)
- Visit [http://localhost:3000](http://localhost:3000) to view the **Home** page.  
- Use the **Previous** and **Next** buttons to cycle through the local HTML files in `public/sources`.

### 2. Predictions
- Click the **Predictions** menu item in the sidebar.
- Fill out the form fields (Credit Score, Age, etc.).
- Click **Predict** to send data to FastAPI.
- The response indicates if the customer is likely to exit.

### 3. About
- Click the **About** menu item to learn more about the churn concept, why it matters, and how the app predicts churn.

---

## 🔍 Technical Details

### A) React Frontend
- **Netflix-inspired styling** (`App.css`)
- **Auto-resizing iframe** using `useRef` and `onLoad` (Home page)
- **Two-column form layout** for Predictions
- **Hero image & info cards** on About page

### B) FastAPI Backend
- `main.py` contains the `/predict` endpoint.
- Accepts JSON data with fields (e.g., `creditScore`, `balance`, etc.) mapped to a **pydantic** `BaseModel` (`CustomerData`).
- Loads a **pre-trained model** (`model.pkl`) using **joblib**.
- Returns a JSON response, for example:
```json
{ "will_exit": true }
```

---

## 🔧 Running Locally (Development & Testing)

> **Note:** If you’re not using Docker, skip directly to **Backend Setup** and **Frontend Setup**.

### 1️⃣ (Optional) Using Docker & Docker Compose
```bash
docker-compose up --build -d
```
Check running containers:
```bash
docker ps
```

### 2️⃣ Start FastAPI Backend (Standalone)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The FastAPI server will run on [http://localhost:8000](http://localhost:8000).

### 3️⃣ Start React Frontend (Standalone)
```bash
cd frontend/my-react-app
npm install
npm start
```
The React app will run on [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing the Predictions

1. Navigate to the **Predictions** page in the React app.  
2. Fill in the form with customer data (e.g., credit score, balance, etc.).  
3. Click **Predict**.  
   - The app sends a `POST` request to `http://localhost:8000/predict`.  
   - The FastAPI server returns JSON like:
     ```json
     {
       "will_exit": true
     }
     ```
4. The UI displays whether the customer is likely to exit or not.

---

## 🔄 How It Works

1. **FastAPI** loads a pre-trained scikit-learn model (`model.pkl`).  
2. The **React** app collects user input (credit score, age, etc.) and sends it to the FastAPI `/predict` endpoint.  
3. FastAPI transforms the input into the required format, calls `model.predict(...)`, and returns a JSON response indicating whether the user is likely to churn.

---

## 🚀 Future Enhancements
- **Database Integration**: Use Postgres, MySQL, or another DB for storing customer data.
- **User Authentication**: Add login/registration and an admin dashboard.
- **Expanded Features**: Incorporate transaction history, product usage, or additional data for improved predictions.

---

## Screenshots

### 1. About Page
![About Page](./screenshots/about.JPG "About Page")

### 2. Analytics Page
![Home Page](./screenshots/home.JPG "Home Page")

### 3. Predictions Page
![Predictions Page](./screenshots/predictions.JPG "Predictions Page")

---

**Enjoy Predicting with Churnflix!**
```
