# Project 2 Analysis of Building Electricity Demand

### As you can see, the schema of this data contains the date and time variables and weather conditions as the input (X vector) along with total and HVAC electricity demand (in W) as the target variables (labels).

- #### **Assume that the electricity demand is the average hourly demand and it can be interpreted as the hourly consumption in $Wh$.**

## Answer the following questions (each answer needs full explanation and plotting would not suffice):

### 1- Compare the total and HVAC electricity consumption of the two buildings on a monthly and annual basis. (a bar chart is preferred)

### 2- Plot and describe the distribution of the weather data.

### 3- Report the correlations between weather conditions and HVAC demand for each building.

### 4- Create a scatter plot of the weather conditions vs HVAC demand and explain what you can learn from these associations for each building.

### 5- Split the data into training and test with a ratio of 0.2 as the test data.

### 6- Create a linear regression model and train it based on the training data using weather conditions as the feature set and HVAC demand as the label for each building.

- ### Before training, do not forget to standardize your input.
- ### Report the MSE value for the training and test data for both buildings.

### 7- Incorporate the role of season and time of day into your regression model by introducing two sets of categorical variables:

- ### First, explain how to add categorical variables into a regression model through OneHotEncoder in sklearn and what OneHotEncoder is (we did not cover this in our lecture and this is defined as an assignment for you.)
- ### Second, use OneHotEncoder object and transform 'month' column and concatenate it to your weather conditions input.
- ### Third, use pandas map method and convert the 'hour' column values as follows:
  - #### {0,1,2,3,4,5}-->value=0
  - #### {6,7,8,9}-->value=1
  - #### {10,11,12}-->value=2
  - #### {13,14,15,16}-->value=3
  - #### {17,18,19}-->value=4
  - #### {20,21,22,23}-->value=5
- ### Fourth, apply OneHotEncoder on this new column and concatenate it to your input.

### 8- Repeat question 6 with the new dataset for both buildings and report any improvement you see in training and test MSE values.

### 9- Explain what regularization is in supervised learning and repeat step 8 using sklearn Ridge and Lasso classes based on the below instruction:

- ### Use Ridge from https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Ridge.htmlLinks to an external site. and report and plot test MSE for alpha={0, 0.005, 0.05,0.1,1}
- ### Use Lasso from https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Lasso.htmlLinks to an external site. and report and plot test MSE for alpha={0, 0.005, 0.05,0.1,1}.

### 10- Use the following sklearn regressors and compare the training and test MSE values and report the model with the best generalization (do not change the default values for these objects):

- #### AdaBoostRegressor
- #### BaggingRegressor
- #### SVR
- #### RandomForestRegressor

