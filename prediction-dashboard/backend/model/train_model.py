import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer

# Sample training data — replace with your real dataset
data = pd.DataFrame([
    {"Job Title": "Software Engineer", "Experience": 3, "Company Type": "Product", "Industry": "IT", "Skills": "Python", "City": "Bangalore", "Work Mode": "Hybrid", "Education": "B.Tech", "Salary": 900000},
    {"Job Title": "Data Analyst", "Experience": 2, "Company Type": "Service", "Industry": "Finance", "Skills": "SQL", "City": "Mumbai", "Work Mode": "Remote", "Education": "MBA", "Salary": 700000},
])

X = data.drop("Salary", axis=1)
y = data["Salary"]

cat_cols = ["Job Title", "Company Type", "Industry", "Skills", "City", "Work Mode", "Education"]
num_cols = ["Experience"]

preprocessor = ColumnTransformer([
    ("cat", OrdinalEncoder(handle_unknown="use_encoded_value", unknown_value=-1), cat_cols),
], remainder="passthrough")

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", RandomForestRegressor())
])

pipeline.fit(X, y)

joblib.dump(pipeline, "salary_model.pkl")
print("Model saved to salary_model.pkl")