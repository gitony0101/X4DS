# 1. Chapter 4 Classification

## 1.1. Logistic regression

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
