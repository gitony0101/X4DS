# 1. Chapter 4 Classification

## 1.1. Logistic regression

Consider the default eaxmple:
<img src=https://beaulucas.github.io/tidy_islr/tidy_islr_files/figure-html/unnamed-chunk-77-1.png>
Logistic regression in this example is modelling the **probability of default**, given the value of balance:

$$
\mathop{Pr} = (default = Yes|balance)
$$

The values of $\mathop{Pr} = (default = Yes|balance)$, which we abbreviate $p(balance)$, will range between 0 and 1. Then for any given value of balance, a prediction can be made for default. For example, one might predict default = Yes for any individual for whom $p(balance)$> 0.5. Alternatively, if a company wishes to be conservative in predicting individuals who are at risk for default, then they may choose to use a lower threshold, such as $p(balance)$> 0.1.

**Key word: Conditional probabilty, Threshold**

### 1.1.1. Logistic Model

WE can use the linear regression model:$p(X) = β_0 + β_1X$ to represent the probabilities$p(X)$, while the model is not sensible since the $p(X) ∈ (0,1)$,to avodi this problem, we use the $logistic\ function$:

$$
\mathop{P(x)} = \frac{e^{ β_0 + β_1X}}{1 + e^{ β_0 + β_1X}}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(4.2)
$$

To fit the model (4.2), we use a method called **maximum likelihood**,The logistic function will always produce an S-shaped curve of this form, and so regardless of the value of X, we will obtain a sensible prediction.With manipulation of (4.2), we find:
$$\frac{p(X)}{1 - p(X)} = e^{β_0 + β_1X}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(4.3)$$
The quatity $\frac{p(X)}{1 - p(X)}$ is called **$odds$**,and can take on any value odds between 0 and $∞$. Values of the odds close to 0 and $∞$ indicate very low and very high probabilities of default, respectively.By taking the logarithm of both sides of (4.3), we arrive at:

$$
log(\frac{p(X)}{1 - p(X)}) = β_0 + β_1X~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(4.4)
$$

The left-hand side is called the $log-odds\ or\  logit$.

### 1.1.2. Estimating the Regression Coefficients

The coefficients $β_0$ and $β_1$ in (4.2) are unknown, and must be estimated based on the available training data by $MLE$.. This intuition can be formalized using a mathematical equation called a **likelihood function**:

$$
\mathop{ℓ(β_0, β_1)} = ∏_{i: y_{i}=1} p(x_{i}) ∏_{i': y_{i'}=1} p(x_{i'})
$$

The estimates $\hat{β}_0$ and $\hat{β}_1$ are chosen to **maximize this likelihood function.**

The test-statistic also behaves similarly. Coefficients with large statistics indicate evidence against the null hypothesis $H_0:β_1=0$. For logistic regression, the null hypothesis implies that $p(X) = \frac{e^{β_0}}{1+e^{β_0}}$ , which means that the probability of defaulting does not depend on balance.

Given the miniscule p-value associated with our balance coefficient, we can confidently reject $H_0$
. The intercept $β_0$ is typically not of interest; it’s main purpose is to adjust the average fitted probabilities to the proportion of ones in the data.

### 1.1.3. Making Predictions

$$
\hat{p}(X)=\frac{e^{\hat{β}_{0}+\hat{β}_{1} X}}{1+e^{\hat{β}_{0}+\hat{β}_{1} X}}
$$

### 1.1.4. Multiple Logistic Regression

We now consider the problem of predicting a binary response using multiple predictors.we can generalize (4.4) as follows:

$$
log(\frac{p(X)}{1 - p(X)}) = β_0 + β_1X_1 + β_2X_2 ~ ⋯ + β_pX_p~~~~~~~~~~~~(4.6)
$$

where $X = (X_1, X_2, ⋯ + X_p)$ are $p$ predictors.manipulation of (4.6):

$$
\mathop{P(x)} = \frac{e^{β_0 + β_1X_1 + β_2X_2 ~ ⋯ + β_pX_p}}{1 + e^{β_0 + β_1X_1 + β_2X_2 ~ ⋯ + β_pX_p}}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(4.7)
$$

## 1.2. Linear Discriminant Analysis(LDA)

### 1.2.1. Why LDA? Compared with LR?

- Well-separated classes produce unstable parameter estimates for logistic regression models.
- If $n$ is small and distribution of predictors $X$ is normall across the classes, the linear discriminant model is more stable than logistic regression.

## 1.2. Model Assessment

### 1.2.1. Confusion Matrix

A confusion matrix is a convenient way to display this information, and looks as follows for the linear discriminant model (50% probability threshold) fit to the full Credit Default data:

Did Not Default Did Default
Predict No Default 9644 252
Predict Default 23 81
Total 9667 333

### 1.2.2. ROC Curve

The ROC curve is a popular graphic for simultaneously displaying the two types of errors for all possible thresholds.

The overall performance of a classifier summarized over all possible thresholds is given by the area under the curve (AUC). An ideal ROC curve will hug the top left corner, so the larger the AUC, the better the classifier.

## 1.2. Quadratic Discriminant Analysis

Linear discriminant analysis assumes that observations within each class are drawn from a multivariate normal distribution with class-specific means and a common covariance matrix for all of the classes.

Quadratic discriminant analysis assumes that each class has its own covariance matrix. In other words, quadratic discriminant analysis relaxes the assumption of the common covariance matrix.

### 1.2.1. Linear vs Quadratic Discriminant Analysis

Which method is better for classification? LDA or QDA? The answer lies in the bias-variance tradeoff.

LDA is a less flexible classifier, meaning it has lower variance than QDA. However, if the assumption of the common covariance matrix is badly off, then LDA could suffer from high bias.

In general, LDA tends to be a better classifier than QDA if there are relatively few observations in the training data because reducing variance is crucial in this case.

In general, QDA is recommended over LDA if the training data is large, meaning that the variance of the classifier is not a major concern. QDA is also recommended over LDA if the assumption of the common covariance matrix is flawed.

## 1.2. KNN K-Nearest Neighbors

K K K-Nearest Neighbors (KNN) is a popular nonparametric classifier method.

Given a positive integer K K K and some test observation, the KNN classifier identifies the K K K points in the training data that are closest to the test observation. These closest K K K points are represented by N0 N*{0} N0​. Then, it estimates the conditional probability for a class as the fraction of points in N0 N*{0} N0​ that represent that specific class. Lastly, KNN will apply the Bayes' rule and classify the test observation to the class with the largest probability.

However, the choice of the K K K value is very important. Lower values are more flexible, whereas higher values are less flexible but have more bias. Similar to the regression setting, a bias-variance tradeoff exists.

## 1.3. Comparison of Classification Methods

There are four main classification methods: logistic regression, LDA, QDA, and KNN.

Logistic regression and LDA are closely connected. They both produce linear decision boundaries. However, LDA may provide improvement over logistic regression when the assumption of the normal distribution with common covariance for classes holds. Additionally, LDA may be better when the classes are well separated. On the other hand, logistic regression outperforms LDA when the normal distribution assumption is not met.

KNN is a completely non-parametric approach. There are no assumptions made about the shape of the decision boundary. KNN will outperform both logistic regression and LDA when the decision boundary is highly nonlinear. However, KNN does not indicate which predictors are important.

QDA serves as a compromise between the nonparametric KNN method and the linear LDA and logistic regression methods.
