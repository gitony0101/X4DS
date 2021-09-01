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

If $K=2$ and $π_1 = π_2$,then the Bayes classifier assigns an observation to class 1,if $2x(μ_1 - μ_2) > μ_1^2 - μ_2^2$,and to class 2 otherwise. In this case, **the Bayes decision boundary** corresponds to the point where:

$$
x=\frac{\mu_{1}^{2}-\mu_{2}^{2}}{2\left(\mu_{1}-\mu_{2}\right)}=\frac{\mu_{1}+\mu_{2}}{2}
\tag{4.14}
$$

Even if we are sure that $X$ is drawn from a Gaussian distribution within each class, we still need to estimate $μ_1, . . . , μ_K, π_1, . . . , π_K$, and σ_2. The $\textit{linear discriminant analysis (LDA)}$ method approximates the Bayes classifier by plugging in estimates as follows:

$$
\hat{\mu}_k = \frac{1}{n_k}\sum_{i:y_i=k}{x_i}
\\
\hat{\sigma}^2 = \frac{1}{n-K}\sum_{k=1}^{K}\sum_{i:y_i=k}{(x_i-\hat{\mu}_k)^2}
\tag{4.15}
$$

where $n$ is the total number of training observations, and $n_k$ is the number of **training observations** in the $kth$ class.

The estimate for $μ_k$ is simply the average of all the training observations from the kth class.To estimate $\hat{π}_k$, we simply take the proportion of training observations that belong to the $kth$ class:

$$
\hat{\pi}_k = n_k/n
\tag{4.16}
$$

From these estimates, we can achieve a \*_decision boundary_:

$$
\hat{δ}_k(x) =x ⋅ \frac{\hat{μ_k}}{\hat{σ}^2} - \frac{\hat{μ_k}^2}{2\hat{σ}^2} + log(\hat{π}_k)
\tag{4.17}
$$

The word **$linear$** in the classifier’s name stems from the fact that the $discriminant\ functions\ δ_k(x)$ in (4.17) are **linear functions** of $x$ (as opposed to a more complex function of x).

### 1.2.4. Linear Discriminant Analysis for p > 1

the $Multivariate\ Gaussian\ (or\ Normal)\  Distribution(MVN)$ comes on line:

To indicate that a $p-dimensional$ random variable $X$ has a MVN distribution: $X ~ N(μ, ∑)$ where:

- $E(X)=μ$ is the mean of $X$ (a vector with $p$
  components)

- $Cov(X)=Σ$ is the $p∗p$ $covariance\ matrix$ of $X$.

PDF:

$$
f(x) = \frac{1}{(2π)^{\frac{p}{2}}|∑|^{\frac{1}{2}}} exp(- \frac{1}{2}(x - μ)^T {∑}^{-1}(x - μ))
\tag{4.18}
$$

Likewise, plugging the density function for the $kth$ class, $f_k(X=x)$, into(4.10),we have: the**Bayes classifier**(p > 1) ,it will assign observation $X=x$ by identifying the class for which

$$
\delta_{k}(x)=x^{T} \boldsymbol{\Sigma}^{-1} \mu_{k}-\frac{1}{2} \mu_{k}^{T} \boldsymbol{\Sigma}^{-1} \mu_{k}+\log \pi_{k}
\tag{4.19}
$$

#### 1.2.4.1. Why not PCA,bro?

Linear Discriminant Analsys (LDA) is like PCA, but it focuses on maximzing the seperatibility among **known categories**:LDA is a **supervised** whereas PCA is **unsupervise**d – PCA ignores class labels.

Morever, let's look at the two algorithms:

We can picture PCA as a technique that finds the directions of maximal variance:

<img src=https://sebastianraschka.com/images/faq/lda-vs-pca/pca.png>

In contrast to PCA, LDA attempts to find a feature subspace that maximizes class separability (note that LD 2 would be a very bad linear discriminant in the figure above).

<img src=https://sebastianraschka.com/images/faq/lda-vs-pca/lda.png>

Remember that LDA makes assumptions about normally distributed classes and equal class covariances.

## 1.2. Model Assessment

Criterion methods of evaluating models:

- Precision-Recall Curve
- Confusion Matrix
- Receiver Operating Characteristic (ROC) Curve.
- AUC Curve

### 1.2.1. $Sensitivity$ and $specificity$

Sensitivity and specificity characterize the performance of a classifier or screening test.In the balance-default case:

- The $sensitivity$-(**Recall**) is the percentage of **true defaults who are identified**

- The specificity is the percentage of **non-defaulters who are correctly identified**

### 1.2.2. Precision-Recall (PR) Curve & ROC Curve

A PR curve is simply a graph with Precision values on the y-axis and Recall values on the x-axis. The PR curve contains TP/(TP+FN) on the y-axis and TP/(TP+FP) on the x-axis.

It is important to note that Precision is also called the Positive Predictive Value (PPV).Recall is also called Sensitivity, Hit Rate or True Positive Rate (TPR).

The figure below shows a juxtaposition of sample PR and ROC curves.

<img src=https://media.geeksforgeeks.org/wp-content/uploads/20190611002050/pr_roc.png>

Interpreting a PR Curve – It is desired that the algorithm should have both high precision, and high recall.
**However, most machine learning algorithms often involve a trade-off between the two**.

A good PR curve has greater **AUC (area under curve**). In the figure above, the classifier corresponding to the blue line has better performance than the classifier corresponding to the green line.

- It is important to note that: the classifier that has **a higher AUC on the ROC curve will always have a higher AUC on the PR curve as well.**

PR curve helps solve this issue. PR curve has the Recall value (TPR) on the x-axis, and precision = TP/(TP+FP) on the y-axis. Precision helps highlight how relevant the retrieved results are.

**The ROC curve is a popular graphic for simultaneously displaying the two types of errors for all possible thresholds.**

ROC curve is a plot containing Recall = TPR = TP/(TP+FN) on the x-axis and FPR = FP/(FP+TN) on the y-axis.

The overall performance of a classifier summarized over all possible thresholds is given by the area under the curve (AUC). An ideal ROC curve will hug the top left corner, so the larger the AUC, the better the classifier.

### 1.2.3. Confusion Matrix

A confusion matrix is a convenient way to display this information, and looks as follows for the linear discriminant model (50% probability threshold) fit to the full Credit Default data:

|          | Predicted 1 | Predicted2 |
| -------- | ----------- | ---------- |
| Actual 1 | $TP$        | $FN$       |
| Actual 2 | $FP$        | $TN$       |

where

**TP -> True Positive** (Predicting Pregnant as Pregnant).

**FN ->False Negative** (Predicting Pregnant as non-Pregnant).

- (Type 2 Error)

**FP -> False Positive** (predicting Non-Pregnant as Pregnant )

- (Type 1 Error)

**TN -> True Negativ**e (Predicting Non-Pregnant as non-Pregnant).

Or:

<img src=https://miro.medium.com/max/462/1*7EYylA6XlXSGBCF77j_rOA.png>

<img src=https://miro.medium.com/max/1854/1*uR09zTlPgIj5PvMYJZScVg.png>

### Compare 2 models-F-mearsure

$$
\mathop{F-measure} = F_1\ score = \frac{2 * Recall * Precision}{Recall + Precision}\\
= \frac{2TP}{2TP + FP + FN} = \frac{2}{2 + \frac{FP + FN}{TP}}
$$

It is difficult to compare two models with low precision and high recall or vice versa. So to make them comparable, we useF-Score. F-score helps to measure Recall and Precision at the same time. It uses Harmonic Mean in place of Arithmetic Mean by punishing the extreme values more.

## 1.2. Quadratic Discriminant Analysis

Linear discriminant analysis assumes that observations within each class are drawn from a multivariate normal distribution with class-specific means and a common covariance matrix for all of the classes.

Quadratic discriminant analysis assumes that each class has its own covariance matrix. In other words, quadratic discriminant analysis relaxes the assumption of the common covariance matrix.

It assumes that each observation from the $kth$ class has the form $X∼N(μ_k,Σ_k), where $Σ_k$ is a covariance matrix for the $kth$ class.

Under this assumption, **the Bayes classifier**assigns an observation $X=x$ to the class for which is largest. In this case, we plug in estimates for $Σ_k$, $μ_k$, and $π_k$. Notice the quantity $x$ appears as a quadratic function, hence the name.

$$
δ_k(x) = - \frac{1}{2}(x - μ_k)^T{∑}_k^{-1}(x - μ_k) - \frac{1}{2} log |\{{∑}_k| + log π_k\\
            = - \frac{1}{2}x^T{∑}_k^{-1}x + x^T{∑}_k^{-1}μ_k - \frac{1}{2}μ_k^T{∑}_k^{-1}μ_k- \frac{1}{2} log |\{{∑}_k| + log π_k
            \tag{4.23}
$$

### 1.2.1. Linear vs Quadratic Discriminant Analysis

LDA or QDA is better for classification lies in the **bias-variance tradeoff.**

LDA is a less flexible classifier, meaning it has lower variance than QDA. However, if the assumption of the common covariance matrix is badly off, then LDA could suffer from high bias.

$$
\textit{It depends.}
$$

In general, LDA tends to be a better classifier than QDA if there are **relatively few observations** in the training data because reducing variance is crucial in this case.

QDA is recommended over LDA if the **training data is large, meaning that the variance of the classifier is not a major concern.** Moreover, QDA is also recommended over LDA if the assumption of the common **covariance matrix is flawed**.

·

## A Comparison of Classification Methods

- Logistic regression
- LDA
- QDA
- K-nearest neighbors

There are four main classification methods: logistic regression, LDA, QDA, and KNN.

Logistic regression and LDA are closely connected. They both produce linear decision boundaries. However, LDA may provide improvement over logistic regression when the assumption of the normal distribution with common covariance for classes holds. Additionally, LDA may be better when the classes are well separated. On the other hand, logistic regression outperforms LDA when the normal distribution assumption is not met.

KNN is a completely non-parametric approach. There are no assumptions made about the shape of the decision boundary. KNN will outperform both logistic regression and LDA when the decision boundary is highly nonlinear. However, KNN does not indicate which predictors are important.

QDA serves as a compromise between the nonparametric KNN method and the linear LDA and logistic regression methods.
