# Parkinson Disease Prediction using Machine Learning

This project implements a machine learning model for the prediction of Parkinson's disease. It uses ensemble learning methods and various feature selection techniques to predict Parkinson's disease based on a set of relevant features. The application includes a web interface built with React and Tailwind for users to input data, receive predictions, and view the prediction history.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Methodology](#methodology)
3. [Model Training and Evaluation](#model-training-and-evaluation)
4. [Web Interface](#web-interface)
5. [Technologies Used](#technologies-used)
6. [Installation and Usage](#installation-and-usage)
7. [Contributing](#contributing)
8. [License](#license)

## Project Overview

This project focuses on predicting Parkinson’s disease using machine learning. The model is trained using a dataset that includes features such as UPDRS, Tremor, Functional Assessment, MoCA, and Rigidity. The primary goal is to develop an accurate model to help in early detection of Parkinson’s disease. A web-based interface is integrated for real-time predictions.

## Methodology

### 1. Data Collection & Exploratory Data Analysis (EDA)
- Dataset with Parkinson’s-related features is gathered.
- EDA is performed to understand data distribution and anomalies.

### 2. Data Pre-Processing
- Handling missing values through imputation.
- Removing irrelevant features for efficiency.
- Detecting and handling outliers using IQR.
- Normalizing numerical data using StandardScaler.
- Encoding categorical variables.

### 3. Feature Selection
- Univariate Feature Selection
- Mutual Information
- Lasso (L1 Regularization)
- Correlation-based Feature Selection

### 4. Train-Test Data Split
- Data split into training and testing sets (80-20, 70-30, 60-40).

### 5. Model Training using Ensemble Learning Methods
- Random Forest, Gradient Boosting, AdaBoost, Stacking, Bagging, Voting.

### 6. Model Evaluation
- Accuracy, Precision, Recall, F1-score.
- Confusion Matrix, AUC-ROC Curve.

### 7. Best Model Selection & Deployment
- AdaBoost model achieved **86.67% accuracy** and **91.59% AUC-ROC Score**.
- Deployed through a web interface.

## Model Training and Evaluation

The top five features found to have the highest correlation with Parkinson’s disease:
- UPDRS (Unified Parkinson’s Disease Rating Scale)
- Tremor
- Functional Assessment
- MoCA (Montreal Cognitive Assessment)
- Rigidity

## Web Interface

### Features
1. **Sign Up / Sign In Pages**: User authentication.
2. **Home Page**:
   - Input values for the top five features.
   - Displays prediction results with probability scores.
   - View past predictions.
3. **History Page**:
   - Shows previous predictions with timestamps.

## Technologies Used

- **Machine Learning**: Python, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn.
- **Backend**: Flask (ML model integration), Node.js, Express.js, JWT, CORS.
- **Frontend**: React.js, Tailwind CSS.
- **Database**: MongoDB.

## Installation and Usage

### Prerequisites
- Python 3.x
- Node.js & npm
- MongoDB (local/cloud)
- pip

### Clone the Repository
```bash
git clone https://github.com/yourusername/parkinson-disease-prediction.git
cd parkinson-disease-prediction
```

### Backend Setup (Flask API)
```bash
cd backend/model-src
pip install 
python app.py
```

### Backend Setup (Node.js & Express)
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup 
```bash
cd frontend
npm install
npm run dev
```

Now, access the application at `http://localhost:3000`.

