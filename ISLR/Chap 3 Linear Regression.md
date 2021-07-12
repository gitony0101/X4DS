# 3 Linear Regression

## 1. Simple linear regression

It is a very straightforward simple linear regression approach for predicting a quantitative response Y on the basis of a single predictor variable X. It assumes that there is approximately a linear relationship between $X$ and $Y$. Mathematically, we can write this linear relationship as:

$$
Y ≈ β_0 + β_1X
$$

We will sometimes describe (3.1) by saying that we are regressing Y on X (or Y onto X).

### 1.1. Important assumptions in simple linear regression

- Linear relationship between $X$ & $Y$
- Error terms are Normal $ϵ ∼ N(μ=0, σ^2)$
- Variance of errors, $ϵ$,  is same for all values of $X$ (homoscedasticity)

## 2. Estimating the Coefficients

The goal is to obtain coefficients such that the linear model fits
the data well - *i.e.* as close as possible to the data points. The most common approach involves minimising the **least squares** criterion.

We let

$$
e_i = y_i − ŷ_i
$$

which represents the ith **residual**. The **residual sum of squares** or **RSS** is the sum of the squares of each of these residuals.

An example in R - we generate a our predictions base on $f(x)+e$, and also have a "guess" at an $\hat{f}(x)$. We calculate our $y_i$, and then calculate the RSS.

### 2.1. RSS:Residual Sum of Squares

$$
\mathrm{RSS}=e_{1}^{2}+e_{2}^{2}+⋯+e_{n}^{2}
$$

or equivalently as

$$
\operatorname{RSS}=\left(y_{1}-\hat{β}_{0}-\hat{β}_{1} x_{1}\right)^{2}+\left(y_{2}-\hat{β}_{0}-\hat{β}_{1} x_{2}\right)^{2}+\ldots+\left(y_{n}-\hat{β}_{0}-\hat{β}_{1} x_{n}\right)^{2}
$$

### 2.2. TSS

### 2.3. MSE

### 2.4. $R^2$

$$
R^2 = 
\frac{TSS - RSS}{TSS} = 
1 - \frac{RSS}{TSS} =
1-\frac{\text { Unexplained Variation }}{\text{ Total Variation }}
$$

$R^2$ proportion of total variation accountedfor by the independent variables in themodel.

- $0 ≤ R^2 ≤ 1$
- $R^2$ is correlation between predicted andobserved outcomes

### 2.5. P-value

### 2.6. Assumptions that matter in multiple linear regression

- Linear relationship between y and x1, y and x2, *etc.*
- Prediction errors, $ϵ$, have Normal Distribution
- Homoscedasticity: $Var(ϵ)=σ^2$  for all values of the independent variables $(x_1, x_2 , …)$
- No or little multicollinearity (correlation between $x_i$)

### 2.7. Notice：R2 & multiple regression & R2-adjusted in multiple regression

R2-Adjusted：

$$
R_{a d j}^{2}=1-\left[\frac{\left(1-R^{2}\right)(n-1)}{n-k-1}\right]
$$

Another measure of fit, R2-adjusted

Always less than R2 since it includes penalty for too many terms

As you add terms R2 always improves but the model may get worse

If R2 >> R2-adjusted, eliminate some of the X"s from the model

### 2.8. Summary for checking out a regression model

| Important Assumption                                     | What to check & do                                                                             |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Linear relationship between Y and X"s                    | Look at graphs of Xi vs Y for each i  -  should be linear                                      |
| Prediction errors, ϵ, have Normal Distribution<br/><br/> | Look at Normal probability plot of residuals<br/><br/>Check for outliers                       |
| Homoscedasticity<br/>constant variance<br/><br/><br/>    | Check plot of residuals vs. predicted values. Spread should be similar. If not, try transforms |
| No or little multicollinearity                           | Look at correlation matrix and graph – remove variables as needed                              |

## 3. Stepwise regression

- variables have importance measures
- start with current model
- try to ADD one variable and see if that helps – if yes, add in best one
- try to REMOVE one variable, if some are not significant, remove the worst one

### 3.1. Remember – high p-value means NOT significant (p>0.15)

- specify 2 importance thresholds:
- p-to-add threshold (p≤ 0.15 to add)
- p-to-remove threshold (p>0.15 to remove)

### 3.2. Variables have an importance measure with threshold k

- suppose current model is f(x_1, x_2)

> You want to REMOVE one – if p-value for x_1, & x_2 are <0.15 you can"t remove anything
> Otherwise, remove the least significant variable

- suppose current model is f(x_1, x_2)

> You want to REMOVE one – if p-value for $x_1$, & $x_2$ are <0.15 you can"t remove anything
> Otherwise, remove the least significant variable

## 4. When to stop:

- Stop when no variables can be ADDED or REMOVED

## 5. Danger of Stepwise Regression

- Subset of variables chosen not necessarily optimal
- Not good if number of variables >> observations (have at least 10 obs per variable is a guideline)
- R2 generally improves with each step but don"t be fooled!!!!!
- Consider ridge & lasso regression
