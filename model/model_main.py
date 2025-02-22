import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib

def main():
    # 1. Read the data and save ID columns
    data = pd.read_csv("Churn_Modelling.csv")
    id_data = data[['CustomerId', 'Surname', 'RowNumber']]
    
    # 2. Drop the ID columns from the main DataFrame for processing
    data_no_ID = data.drop(columns=['CustomerId', 'Surname', 'RowNumber'])
    
    # 3. Set up features and target
    X = data_no_ID.drop(columns=['Exited'])
    y = data_no_ID['Exited']
    
    # 4. Remove outliers using IsolationForest on numeric features only
    iforest = IsolationForest(n_estimators=50, contamination=0.05, random_state=42)
    pred_forest = iforest.fit_predict(X.select_dtypes(exclude='object'))
    X['anomaly_label'] = pred_forest
    print("Anomaly label counts:\n", X['anomaly_label'].value_counts())
    
    # 5. Filter out outliers and drop the anomaly label column
    X_out = X[X['anomaly_label'] != -1].drop(columns='anomaly_label')
    y_out = y.loc[X_out.index]
    data_out = pd.concat([X_out, y_out], axis=1)
    
    # 6. Prepare for scaling and encoding by excluding the target column
    target = "Exited"
    features = data_out.drop(columns=[target])
    
    # Identify numeric and object columns
    numeric_cols = features.select_dtypes(include=['int64', 'float64']).columns
    object_cols = features.select_dtypes(include=['object']).columns
    
    # 7. Scale the numeric columns
    scaler = StandardScaler()
    features_scaled_numeric = pd.DataFrame(
        scaler.fit_transform(features[numeric_cols]),
        columns=numeric_cols,
        index=features.index
    )
    
    # Combine scaled numeric columns with the object columns
    data_out_final = pd.concat([features_scaled_numeric, features[object_cols]], axis=1)
    # Add the target column back
    data_out_final[target] = data_out[target]
    
    # 8. One-hot encode the categorical (object) features, leaving the target untouched
    features_for_encoding = data_out_final.drop(columns=[target])
    target_data = data_out_final[target]
    features_encoded = pd.get_dummies(features_for_encoding, 
                                      columns=features_for_encoding.select_dtypes(include=['object']).columns)
    
    # Combine encoded features with the target column
    data_out_final_encoded = pd.concat([features_encoded, target_data], axis=1)
    
    # 9. Reattach the saved ID columns to the final DataFrame
    final_data = pd.concat([id_data.loc[data_out_final_encoded.index], data_out_final_encoded], axis=1)
    final_data.to_csv("cleaned_encoded.csv", index=False)
    print("Cleaned and encoded data saved to 'cleaned_encoded.csv'")
    
    # 10. For prediction, select only the 10 features chosen by SelectKBest
    selected_columns = [
        'Age', 
        'Geography_Germany', 
        'IsActiveMember', 
        'Balance', 
        'NumOfProducts',
        'Geography_France', 
        'Gender_Female', 
        'Gender_Male', 
        'Geography_Spain', 
        'CreditScore'
    ]
    prediction_features = final_data[selected_columns]
    
    # 11. Load the pre-trained XGBoost pipeline (the model was previously saved)
    xgb_pipeline = joblib.load('xgboost_pipeline.pkl')
    
    # 12. Make predictions using the loaded pipeline
    predictions = xgb_pipeline.predict(prediction_features)
    probabilities = xgb_pipeline.predict_proba(prediction_features)[:, 1]
    
    # 13. Combine predictions with ID data and export results
    results = id_data.loc[prediction_features.index].copy()
    results['Predicted_Exited'] = predictions
    results['Churn_Probability'] = probabilities
    results.to_csv("predictions.csv", index=False)
    print("Predictions saved to 'predictions.csv'.")

if __name__ == '__main__':
    main()
