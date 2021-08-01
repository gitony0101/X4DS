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
\mathop{P(x)} = \frac{e^{ β_0 + β_1X}}{1 + e^{ β_0 + β_1X}}
\tag{4.2}
$$

To fit the model (4.2), we use a method called **maximum likelihood**,The logistic function will always produce an S-shaped curve of this form, and so regardless of the value of X, we will obtain a sensible prediction.With manipulation of (4.2), we find:

$$
\frac{p(X)}{1 - p(X)} = e^{β_0 + β_1X}
\tag{4.3}
$$

The quatity $\frac{p(X)}{1 - p(X)}$ is called **$odds$**,and can take on any value odds between 0 and $∞$. Values of the odds close to 0 and $∞$ indicate very low and very high probabilities of default, respectively. By taking the logarithm of both sides of (4.3), we arrive at:

$$
log(\frac{p(X)}{1 - p(X)}) = β_0 + β_1X
\tag{4.4}
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
log(\frac{p(X)}{1 - p(X)}) = β_0 + β_1X_1 + β_2X_2 ~ ⋯ + β_pX_p
\tag{4.6}
$$

where $X = (X_1, X_2, ⋯ + X_p)$ are $p$ predictors.manipulation of (4.6):

$$
\mathop{P(x)} = \frac{e^{β_0 + β_1X_1 + β_2X_2 ~ ⋯ + β_pX_p}}{1 + e^{β_0 + β_1X_1 + β_2X_2 ~ ⋯ + β_pX_p}}\tag{4.7}
$$

The dangers of drawing insights from **single predictor** regressions when other predictors may be relevant. The results from using one predictor can be substantially different compared to using multiple predictors. This phenomenon is known as **confounding**.

### 1.1.5. Logistic Regression for >2 Response Classes

Sometimes we wish to classify a response variable that has more than two classes. A method that is popular for multi-class classification is discriminant analysis.

## 1.2. Linear Discriminant Analysis(LDA)

### 1.2.1. Why LDA? Compared with LR?

- Well-separated classes produce unstable parameter estimates for logistic regression models.
- If $n$ is small and distribution of predictors $X$ is normall across the classes, the linear discriminant model is more stable than logistic regression.

### 1.2.2. Using Bayes’ Theorem for Classification

Consider the scenario where we want to classify an observation into one of $K$ classes, where $K≥2$.

- Let $π_k$ represent the overall or $prior$ probability that a randomly chosen observation comes from the $kth$ class.

- Let $f_k(x)=Pr(X=x|Y=k)$ denote the density function of $X$ for an observation that comes from the $kth$ class.

In other words,$f_k(x)$ being large means that there is a high probability that an observation in the $kth$ class has $X≈x$.

We can use $Bayes’\ theorem$

$$
Pr(Y=k|X=x) = \frac{π_kf_k(x)}{∑_{l=1}^Kπ_lf_l(x)}
\tag{4.10}
$$

Call the left-hand side $p_k(X)$. We can plug in estimates of $π_k$ and $f_k(X)$ into Bayes’ theorem above to get the probability of a certain class, given an observation.

- Solving for $π_k$ is easy if we have a random sample of $Y$s from the population. We simply calculate the fraction of observations that fall into a $k$ class.

- Estimating $f_k(X)$ is more challenging unless we assume simple forms for these densities.

We refer to $p_k(x)$ as the $posterior$ probability that an observation $X=x$ belongs to the $kth$ class. This is the probability that the observation belongs to the $kth$ class, given the predictor value for that observation.

The Bayes’ classifier classifies an observation to the class for which $p_k(X)$ is largest. If we can find a way to estimate $f_k(X)$, we can develop a classifier that approximates the Bayes classifier.

### 1.2.3. Linear Discriminant Analysis for p = 1

Let’s assume we have **one predictor**. We need to obtain an estimate for $f_k(x)$ (the density function for $X$ given a class $k$). This will obtain a value for $p_k(x)$. We will then classify this observation for which $p_k(x)$ is greatest.

To estimate $f_k(x)$, we need to make some assumptions about its form.

Let’s assume $f_k(x)$ is $normal$ or $Gaussian$ ($f_k(x) ∈ N(μ, σ^2)$).The normal density takes the form:

$$
\mathop{f_k(x)} = \frac{1}{\sqrt{2π}σ_k} exp(-\frac{1}{2σ_k^2}(x-μ_k)^2)
\tag{4.11}
$$

where: $μ_k$ and $σ_k^2$ are the mean and variance parameters for the $kth$ class.

Assuming that $σ_1^2= . . . = σ_k^2$: that is, there is a shared variance term across all $K$ classes, which for simplicity we can denote by $σ_2$.
Plugging this back in to $p_k(x)$, we obtain:

$$
p_k(x) = \frac{π_k \frac{1}{\sqrt{2π}σ} exp(-\frac{1}{2σ^2}(x-μ_k)^2)}{∑_{l=1}^K \frac{1}{\sqrt{2π}σ} exp(-\frac{1}{2σ^2}(x-μ_l)^2)}
\tag{4.12}
$$

$X = x$ to the class for which (4.12) is largest. Taking the log of (4.12) and rearranging the terms, it is not hard to show that this is equivalent to assigning the observation to the class for which is largest：

$$
δ_k(x) = x ⋅\frac{μ_k}{σ^2} - \frac{μ_k^2}{2σ^2} + log(π_k)
\tag{4.13}
$$

If $K=2$ and $π_1 = π_2$,then the Bayes classifier assigns an observation to class 1,if $2x(μ_1 - μ_2) > μ_1^2 - μ_2^2$,and to class 2 otherwise. In this case, the Bayes decision boundary corresponds to the point where:

$$
x=\frac{\mu_{1}^{2}-\mu_{2}^{2}}{2\left(\mu_{1}-\mu_{2}\right)}=\frac{\mu_{1}+\mu_{2}}{2}
\tag{4.14}
$$

### 1.2.4. Linear Discriminant Analysis for p > 1

#### 1.2.4.1. Why not PCA,bro?

Linear Discriminant Analsys (LDA) is like PCA, but it focuses on maximzing the seperatibility among **known categories**:LDA is a **supervised** whereas PCA is **unsupervise**d – PCA ignores class labels.

Morever, let's look at the two algorithms:

We can picture PCA as a technique that finds the directions of maximal variance:

<img src=https://sebastianraschka.com/images/faq/lda-vs-pca/pca.png>

In contrast to PCA, LDA attempts to find a feature subspace that maximizes class separability (note that LD 2 would be a very bad linear discriminant in the figure above).

<img src=https://sebastianraschka.com/images/faq/lda-vs-pca/lda.png>

Remember that LDA makes assumptions about normally distributed classes and equal class covariances.

## 1.2. Model Assessment

### 1.2.1. Confusion Matrix

A confusion matrix is a convenient way to display this information, and looks as follows for the linear discriminant model (50% probability threshold) fit to the full Credit Default data:

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
