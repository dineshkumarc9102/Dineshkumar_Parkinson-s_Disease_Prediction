# Parkinson Disease Prediction using Machine Learning

This project implements a machine learning model for the prediction of Parkinson's disease. It uses ensemble learning methods and various feature selection techniques to predict Parkinson's disease based on a set of relevant features. The application also includes a web interface for users to input data, receive predictions, and view the prediction history.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Methodology](#methodology)
3. [Model Training and Evaluation](#model-training-and-evaluation)
4. [Web Interface](#web-interface)
5. [Technologies Used](#technologies-used)
6. [Installation and Usage](#installation-and-usage)
7. [Contributing](#contributing)
8. [License](#license)

---

## Project Overview

This project focuses on predicting Parkinson’s disease using machine learning. The model is trained using a dataset that includes features such as UPDRS, Tremor, Functional Assessment, MoCA, and Rigidity. The primary goal of the project is to develop an accurate model to help in early detection of Parkinson’s disease. The project also includes a web-based interface for real-time predictions.

---

## Methodology

The methodology followed for Parkinson's Disease prediction is structured in several steps:

### 1. Data Collection & Exploratory Data Analysis (EDA)
- *Dataset*: A dataset with features related to Parkinson’s disease is gathered.
- *EDA*: Exploratory Data Analysis is performed to understand data distribution, identify missing values, and detect anomalies.

### 2. Data Pre-Processing
- *Missing Values*: Handle missing values through imputation or removal.
- *Irrelevant Columns*: Remove irrelevant features to improve model efficiency.
- *Outliers*: Use Interquartile Range (IQR) method to detect and handle outliers.
- *Feature Scaling*: Normalize numerical data using StandardScaler.
- *Categorical Encoding*: Encode categorical variables into a machine-readable format.

### 3. Feature Selection
- Use the following feature selection techniques:
  - Univariate Feature Selection
  - Mutual Information
  - Lasso (L1 Regularization)
  - Correlation-based Feature Selection

### 4. Train-Test Data Split
- Split the data into training and testing sets with proportions such as 80-20, 70-30, and 60-40.

### 5. Model Training using Ensemble Learning Methods
- Train models using various ensemble techniques, including:
  - Random Forest
  - Gradient Boosting
  - AdaBoost
  - Stacking
  - Bagging
  - Voting

### 6. Model Evaluation
- Evaluate the models using metrics like:
  - Accuracy
  - Precision
  - Recall
  - F1-score
- Analyze the performance using:
  - Confusion Matrix
  - AUC-ROC Curve

### 7. Best Model Selection & Deployment
- *Best Model*: The AdaBoost model emerged as the best-performing model, achieving:
  - Accuracy: 86.67%
  - AUC-ROC Score: 91.59%
- *Deployment*: The selected model is deployed through a web interface for real-time prediction.

---

## Model Training and Evaluation

After preprocessing the data and applying feature selection techniques, we trained multiple ensemble models. The evaluation metrics showed that *AdaBoost* performed the best with an accuracy of *86.67%* and an *AUC-ROC score of 91.59%*, making it the most reliable model for Parkinson's disease prediction.

The following top five features were found to have the highest correlation with Parkinson’s disease:
- *UPDRS (Unified Parkinson’s Disease Rating Scale)*
- *Tremor*
- *Functional Assessment*
- *MoCA (Montreal Cognitive Assessment)*
- *Rigidity*

---

## Web Interface

The web interface allows users to interact with the Parkinson's disease prediction model. Key features include:

1. *Sign Up / Sign In Pages*: Users can create an account and log in to access the prediction service.
2. *Home Page*: 
   - Users can input values for the top five features (UPDRS, Tremor, Functional Assessment, MoCA, Rigidity).
   - The page will show the prediction result along with the probability of having Parkinson’s disease.
   - Users can view their past prediction results and the associated data.
3. *History Page*:
   - Displays a list of users’ previous predictions, including input values, prediction results, and timestamp.

---

## Technologies Used

- *Machine Learning*: 
  - Python, Scikit-learn
  - Ensemble Learning (Random Forest, AdaBoost, Gradient Boosting)
  - Feature Selection (Lasso, Mutual Information, etc.)
- *Web Development*: 
  - Flask (Backend)
  - HTML, CSS, JavaScript (Frontend)
  - SQLite (Database)
- *Data Science Libraries*:
  - Pandas, NumPy, Matplotlib, Seaborn

---

## Installation and Usage

### Prerequisites
- Python 3.x
- pip

### Clone the Repository
```bash
git clone https://github.com/yourusername/parkinson-disease-prediction.git
cd parkinson-disease-prediction
