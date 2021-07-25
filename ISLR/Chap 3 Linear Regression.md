# 1. Chaper 3 Linear Regression

<!-- TOC -->

- [1. Chaper 3 Linear Regression](#1-chaper-3-linear-regression)
  - [1.1. Simple linear regression](#11-simple-linear-regression)
    - [1.1.1. Important assumptions in simple linear regression](#111-important-assumptions-in-simple-linear-regression)
    - [1.1.2. Important definitions: RSS ESS TSS RSE MSE, etc.](#112-important-definitions-rss-ess-tss-rse-mse-etc)
      - [1.1.2.1. **RSS——Residual Sum of Squares**](#1121-rssresidual-sum-of-squares)
      - [1.1.2.2. **ESS——Explained Sum of Squares**](#1122-essexplained-sum-of-squares)
      - [1.1.2.3. **TSS——Total Sum of Squares**](#1123-tsstotal-sum-of-squares)
    - [1.1.2. Alternative definitions](#112-alternative-definitions)
      - [1.1.2.1. Standard Error of $\hat{μ}$](#1121-standard-error-of-hatμ)
      - [1.1.2.2. **RSE——Residual Standard Error**](#1122-rseresidual-standard-error)
      - [1.1.2.3. **MSE--Mean Squared Error**](#1123-mse--mean-squared-error)
      - [1.1.2.4. $R^2$ Statistic](#1124-r2-statistic)
    - [1.1.2. P-value(Check $hypothesis~test$)](#112-p-valuecheck-hypothesistest)
      - [1.1.2.1. X notes for me](#1121-x-notes-for-me)
  - [1.2. Estimating the Coefficients](#12-estimating-the-coefficients)
    - [1.2.1. Assessing the Accuracy of the Coefficient Estimates](#121-assessing-the-accuracy-of-the-coefficient-estimates)
    - [1.2.2. Computing Confidence Intervals](#122-computing-confidence-intervals)
    - [1.2.3. Hypothesis Tests](#123-hypothesis-tests)
    - [1.2.4. Assessing the Accuracy of the Model-By RSE and $R^2$](#124-assessing-the-accuracy-of-the-model-by-rse-and-r2)
  - [1.2. Multiple Linear Regression](#12-multiple-linear-regression)
    - [1.2.1. Assumptions that matter in multiple linear regression:](#121-assumptions-that-matter-in-multiple-linear-regression)
    - [1.2.2. Estimating the Regression Coefficients](#122-estimating-the-regression-coefficients)
    - [1.2.3. Important Issues](#123-important-issues)
      - [1.2.3.1. One: Is There a Relationship Between the Response and Predictors?](#1231-one-is-there-a-relationship-between-the-response-and-predictors)
      - [1.2.3.2. Deciding on Important Variables](#1232-deciding-on-important-variables)
      - [1.2.3.3. Model Fit](#1233-model-fit)
      - [1.2.3.4. Predictions](#1234-predictions)
    - [1.1.2. Other Considerations in the Regression Model](#112-other-considerations-in-the-regression-model)
      - [1.1.2.1. Qualitative Predictors In our discussion](#1121-qualitative-predictors-in-our-discussion)
      - [1.1.2.2. Predictors with only Two Levels](#1122-predictors-with-only-two-levels)
      - [Qualitative Predictors with More than Two Levels](#qualitative-predictors-with-more-than-two-levels)
    - [Extensions of the Linear Model](#extensions-of-the-linear-model)
    - [Potential Problems](#potential-problems)
    - [1.1.2. Summary for checking out a regression model](#112-summary-for-checking-out-a-regression-model)
    - [1.1.3. Notice：R2 & multiple regression & R2-adjusted in multiple regression](#113-noticer2--multiple-regression--r2-adjusted-in-multiple-regression)

<!-- /TOC -->

## 1.1. Simple linear regression

Simple linear regression:predicting a quantitative response Y on the basis of a single predictor variable X.
It assumes that there is approximately a linear relationship between $X$ and $Y$. Mathematically, we can write this linear relationship as:

$$
Y ≈ β_0 + β_1X~~~~~~~(3.1)
$$

### 1.1.1. Important assumptions in simple linear regression

- Linear relationship between $X$ & $Y$
- Error terms are Normal $ϵ ∼ N(μ=0, σ^2)$
- Variance of errors, $ϵ$,  is same for all values of $X$ (homoscedasticity)

### 1.1.2. Important definitions: RSS ESS TSS RSE MSE, etc.

> From the very beginning we need to acknowledge the important criterions which evalue the performance of linear regression.

#### 1.1.2.1. **RSS——Residual Sum of Squares**

$$
\mathrm{RSS}=e_{1}^{2}+e_{2}^{2}+⋯+e_{n}^{2}
$$

or equivalently as

$$
\mathop{RSS}=\sum_{i=1}^n(y_i-\hat{y})^2=\left(y_{1}-\hat{β}_{0}-\hat{β}_{1} x_{1}\right)^{2}+\left(y_{2}-\hat{β}_{0}-\hat{β}_{1} x_{2}\right)^{2}+\ldots+\left(y_{n}-\hat{β}_{0}-\hat{β}_{1} x_{n}\right)^{2}
$$

#### 1.1.2.2. **ESS——Explained Sum of Squares**

The explained sum of squares (ESS) is the sum of the squares of the deviations of the predicted values from the mean value of a response variable.

For example: $y_i = a + b_1x_{1i} + b_2x_{2i} + ... + ε_i$, where $y_i$ is the $i^{th}$ observation of the response variable, $x_{ji}$ is the$i^{th}$bservation of the $j$ th explanatory variable, a and $b_j$ are coefficients, $i$ indexes the observations from to n, and $ϵ_i$ is the $i^{th}$ value of the error term. In general, the greater the ESS, the better the estimated model performs.
We let $\hat{a}$ and $\hat{b}$ are the estimated coefficients, then$\hat{y_i} = \hat{a} + \hat{b_1}x_{1i} + \hat{b_2}x_{2i} + ........$is the $i^{th}$ predicted value of the response variable.The $\mathop{ESS}:$

$$
\mathop{ESS} = \sum_{i=1}^n(\hat{y_i} - \bar{y})^2
$$

where $\hat{y_i}$ the value estimated by the regression line.

#### 1.1.2.3. **TSS——Total Sum of Squares**

In statistical data analysis the total sum of squares (TSS or SST) is a quantity that appears as part of a standard way of presenting results of such analyses.

$$
\mathop{TSS} = \sum_{i=1}^n(y_i-\bar{y})^2
$$

**Notes**:In some cases : total sum of squares ( TSS ) = explained sum of squares (ESS)+ residual sum of squares (RSS):

$$
\mathop{TSS} = \mathop{ESS} + \mathop{RSS}
$$

**The least squares approach** chooses $\hat\beta_0$ and $\hat\beta_1$ to minimize the RSS. Using some calculus, one can show that the minimizers are:

$$
\mathop{\hat{β}_{1}}=\frac{\sum_{i=1}^{n}\left(x_{i}-\bar{x}\right)\left(y_{i}-\bar{y}\right)}{\sum_{i=1}^{n}\left(x_{i}-\bar{x}\right)^{2}}\\
\mathop{\hat{β}_{0}}=\bar{y}-\hat{β}_{1}\bar{x}~~~~~~~(3.4)
$$

where $\bar{y}≣ \frac{1}{n} \sum_{i=1}^ny_i$ and $\bar{x}≣ \frac{1}{n} \sum_{i=1}^nx_i$ are the sample means.Or the equation defines are $\mathit{least\ squares\ estimats\ for\ simple \ linear\ regression}$

### 1.1.2. Alternative definitions

> different definitions:

- SSR(Sum of Squares for **regression**) = ESS (explained sum of squares)

- SSE（Sum of Squares for Error） = RSS (residual sum of squares)

- SST(Sum of Squares for total) = TSS(total sum of squares)

So we have:

- **SSE+SSR=SST**

  or equivalently:

- **RSS+ESS=TSS**

#### 1.1.2.1. Standard Error of $\hat{μ}$

A natural question is as follows: how accurate is the sample mean $\hat{μ}$ as an estimate of $μ$? We have established that the average of $\hat{μ}'s$ over many data sets will be very close to $μ$, but that a single estimate $\hat{μ}$ may be a substantial underestimate or overestimate of $μ$.

How far off will that single estimate of $\hat{μ}$ be? In general, we answer this question by computing the standard error of $\hat{μ}$, written as $\mathop{SE(\hat{μ})}$. We have the well-known formula:

$$
\mathop{Var(\hat{μ})}=\mathop{SE(\hat{μ})}= \frac{σ^2}{n}
$$

where $σ$ is the standard deviation of each of the realizations $y_i$ of $Y$. Mathematically

Standard Error for $\hat{β}_0$:

$$
\mathrm{SE}(\hat{β}_0)^2 = σ^2 \left [ \frac{1}{n} + \frac{\bar{x}^2}{\displaystyle\sum_{i=1}^n (x_i - \bar{x})^2} \right ]
$$

Standard Error for $\hat{β}_1$:

$$
\mathrm{SE}(\hat{β}_1)^2 = \frac{σ^2}{\displaystyle\sum_{i=1}^n (x_i - \bar{x})^2}
$$

For more applications,check the:
$$Confidence~intervals~and~Hypothesis~test$$

#### 1.1.2.2. **RSE——Residual Standard Error**

Since every observation has an associated error term $ϵ$, having the knowledge of true $β_0$ and $β_1$ will still not allow one to perfectly predict $Y$. The residual standard error estimates the standard deviation of the error term.

$$
\mathop{RSE} = \sqrt{1/(n-2)*RSS} = \sqrt{1/(n-2)\sum_{i=1}^{n}(y_i - \hat y)^2}
$$

#### 1.1.2.3. **MSE--Mean Squared Error**

(CH02 2.2.1) \
In order to evaluate the performance of a statistical learning method on a given data set, we need some way to measure how well its predictions actually match the observed data. \
That is, we need to quantify the extent to which the predicted response value for a given observation is close to the true response value for that observation. In the regression setting, the most commonly-used measure is the mean squared error (MSE), given by:

$$
\mathop{MSE}= \frac{1}{n}(y_i - \hat{f}(x_i))^2
$$

where $\hat{f}(x_i)$ is the prediction that $\hat{f}$ gives for the $i$th observation

The MSE will be small if the predicted responses are very close to the true responses, and will be large if for some of the observations, the predicted and true responses differ substantially.

#### 1.1.2.4. $R^2$ Statistic

$$
R^2 =
\frac{TSS - RSS}{TSS} =
1 - \frac{RSS}{TSS} =
1-\frac{\text { Unexplained Variation }}{\text{ Total Variation }}
$$

$R^2$ proportion of total variation accountedfor by the independent variables in themodel.

- $0 ≤ R^2 ≤ 1$
- $R^2$ is correlation between predicted andobserved outcomes

### 1.1.2. P-value(Check $hypothesis~test$)

larger in absolute value, assuming $β_1$= 0. We call this probability the p-value.

p-value is a association between the predictor and the response. Hence, if we see a small p-value,then we can infer that there is an association between the predictor and the response.

#### 1.1.2.1. X notes for me

表征依变数 Y 的变异中有多少百分比,可由控制的自变数 X 来解释.
相关系数（coefficient of correlation）的平方即为决定系数。它与相关系数的区别在于除掉|R|=0 和 1 情况，
由于 R2<R,可以防止对相关系数所表示的相关做夸张的解释。
确定系数：在 Y 的总平方和中，由 X 引起的平方和所占的比例，记为 R2(R 的平方)
确定系数的大小决定了相关的密切程度。
当 R2 越接近 1 时，表示相关的方程式参考价值越高；相反，越接近 0 时，表示参考价值越低。这是在一元回归分 3 析中的情况。但从本质上说确定系数和回归系数没有关系，就像标准差和标准误差在本质上没有关系一样。
在多元回归分析中，确定系数是通径系数的平方。
表达式：R2=SSR/SST=1-SSE/SST
其中：SST=SSR+SSE，SST (total sum of squares)为总平方和，SSR (regression sum of squares)为回归平方和，SSE (error sum of squares) 为残差平方和。
注：（不同书命名不同）
回归平方和：SSR(Sum of Squares for regression) = ESS (explained sum of squares)
残差平方和：SSE（Sum of Squares for Error） = RSS (residual sum of squares)
总离差平方和：SST(Sum of Squares for total) = TSS(total sum of squares)
SSE+SSR=SST RSS+ESS=TSS
意义：拟合优度越大，自变量对因变量的解释程度越高，自变量引起的变动占总变动的百分比高。观察点在回归直线附近越密集。
取值范围：0-1.

## 1.2. Estimating the Coefficients

The goal is to obtain coefficients such that the linear model fits
the data well - _i.e._ as close as possible to the data points. The most common approach involves minimizing the **least squares** criterion.<br>We let

$$
e_i = y_i − ŷ_i
$$

which represents the ith **residual**. The **residual sum of squares** or **RSS** is the sum of the squares of each of these residuals.

An example in R - we generate a our predictions base on $f(x)+e$, and also have a "guess" at an $\hat{f}(x)$. We calculate our $y_i$, and then calculate the RSS.

### 1.2.1. Assessing the Accuracy of the Coefficient Estimates

We assume that the true relationship between $X$ and $Y$ takes the form $Y = f(X) + ϵ$ for some unknown function $f$, where $ϵ$ is a mean-zero random error term. If $f$ is to be approximated by a linear function, then we can write this relationship as

$$
Y = β_0 +β_1X + ϵ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(3.5)
$$

Here $β_0$ is the intercept term—that is, the expected value of $Y$ when $X = 0$, and $β_1$ is the slope—the average increase in $Y$ associated with a one-unit increase in $X$. The error term is a catch-all for what we miss with this simple model: the true relationship is probably not linear, there may be other variables that cause variation in $Y$ , and there may be measurement error. We typically assume that the error term is independent of X.
The model given by $(3.5)$ defines the population regression line, which population regression line is the best linear approximation to the true relationship between $X$ and $Y$

### 1.2.2. Computing Confidence Intervals

Standard Erros $μ$ can be used to compute the **$Confidence\ Intervals$**:

A 95 % confidence interval confidence interval is defined as a range of values such that with 95 % probability, the range will contain the true unknown value of the parameter.The range is defined in terms of lower and upper limits computed from the sample of data. For linear regression, the 95 % confidence interval for $β_1$ approximately takes the form:

$$
[\hat{β_1} - 2⋅\mathop{SE(\hat{β_1})}  , \hat{β_1} + 2⋅\mathop{SE(\hat{β_1})}  ]
$$

Accordingly,we have the 95% chance confidence interval for $β_0$:

$$
[\hat{β_0} - 2⋅\mathop{SE(\hat{β_0})}  , \hat{β_0} + 2⋅\mathop{SE(\hat{β_0})}  ]
$$

### 1.2.3. Hypothesis Tests

Standard Erros $μ$ can also be used to perform the $Hypothesis~Tests~on ~the~coefficients$,with the model of linear regression:$Y ≈ β_0 + β_1X$, we can find that if $β_1$ as the coefficient of $X$ is not equal to zero, that means there is some relationship between $X$ and $Y$.
Which is:

$The~null~hypothesis~of$

$$
H_0: There~is~no~relationship~between~X~and~Y
$$

versus the $alternative~hypothesis$

$$
H_a: There~is~some~relationship~between~X~and~Y
$$

Mathematically,we can say this corresponds to testing:

$$
H_0: β_1 = 0
$$

versus:

$$
H_a:β_1 \not ={0}
$$

Since if $β_1 = 0$then the model $Y ≈ β_0 + β_1X$ reduces to $Y = β_0+ ϵ$, and $X$ is not associated with $Y$ .

To test the null hypothesis, we need to determine whether $\hat{β_1},$our estimate for $β_1$, is sufficiently far from zero that we can be confident that $β_1$ is non-zero.

> How far is far enough?
> <br>This of course depends on the accuracy of $\hat{β1}$—that is, it depends on $\mathop{SE(\hat{β_1})}$.If $\mathop{SE(\hat{β_1})}$ is small, then even relatively small values of $\hat{β_1}$ may provide strong evidence that $\hat{β_1} \not= 0$, and hence that there is a relationship between X and Y .In contrast, if $\mathop{SE(\hat{β_1})}$ is large, then $\hat{β_1}$ must be large in absolute value in order for us to reject the null hypothesis.
> In practice, we compute a $t-statistic$,given by

$$
t = \frac{\hat{β_1}-0}{\mathop{SE(\hat{β_1})}}~~~~~~~~(3.14)
$$

If there really is no relationship between X and Y , then we expect that (3.14) will have a t-distribution with n − 2 degrees of freedom.

Consequently, it is a simple matter to compute the probability of observing any number equal to |t| or larger in absolute value, assuming $β_1= 0$. We call this probability the p-value.

Hence, if we see a small p-value, Roughly speaking, we interpret the p-value as follows: a small p-value indicates that it is unlikely to observe such a substant dictor and the response due to chance, in the absence of any real association then we can infer that there is an association between the predictor and the response. We reject the null hypothesis—that is, we declare a relationship to exist between $X$ and $Y$ —if the p-value is small enough.

Typical p-value cutoffs for rejecting the null hypothesis are 5 or 1 %.

### 1.2.4. Assessing the Accuracy of the Model-By RSE and $R^2$

Onece the null hypothesis is rejected, which means there is some relationship between $X$ and $Y$.Thus we would like to quantify the extent to which the mode fits the data. Here in linear regression, the $residual~ standard~error(RSE)$ and the $R^2~statistic$ are two related quantities to assess the model.

Recall the $RSE$:(残差标准误)

$$
\mathop{RSE} = \sqrt{1/(n-2)*RSS} = \sqrt{1/(n-2)\sum_{i=1}^{n}(y_i - \hat y)^2}
$$

The RSE is considered a measure of the $lack~of~fit$ of the model $(3.5)$ to the data. If the predictions obtained using the model are very close to the true outcome values—that is, if $\hat{y_i} ≈ y_i,for~i = 1, . . . , n$—then $RSE$ will be small, and we can conclude that the model fits the data very well. On the other hand, if $\hat{y_i}$ is very far from $y_i$ for one or more observations, then the RSE may be quite large, indicating that the model doesn’t fit the data well.

$R^2 Statistic$

$$
R^2 =
\frac{TSS - RSS}{TSS} =
1 - \frac{RSS}{TSS} =
1-\frac{\text { Unexplained Variation }}{\text{ Total Variation }}
$$

Where the TSS is the total sum of the squares and the RSS is Residual sum of the squares.TSS measures the total variance in the response Y , and can be thought of as the amount of variability inherent in the response before the regression is performed. In contrast, RSS measures the amount of variability that is left unexplained after performing the regression. Hence, TSS − RSS measures the amount of variability in the response that is explained (or removed) by performing the regression,$R^2$ measures the **$proportion~of~variability~in~Y~that~ can~ be~ explained~ using~ X$**.

An $R^2$ statistic that is close to 1 indicates that a large proportion of the variability in the response has been explained by the regression. A number near 0 indicates that the regression did not explain much of the variability in the response;this might occur because the linear model is wrong, or the inherent error $σ^2$ is high, or both.

$Correlation$

The $R^2$ statistic is a measure of the linear relationship between $X$ and $Y$ .

Recall that correlation, defined as:

$$

\mathop{\widehat{Cor(X,Y)}}=r= \frac{\sum_{i=1}^n(x_i-\bar{x})(y_i-\bar{y})}{√{\sum_{i=1}^n(x_i-\bar{x})^2}√{\sum_{i=1}^n(y_i-\bar{y})^2}}


$$

is also a measure of the linear relationship between $X$ and $Y$.

In simple linear regression, $R^2=r^2$.

## 1.2. Multiple Linear Regression

In general, suppose that we have $p$ distinct predictors. Then the multiple linear regression model takes the form:

$$
Y = β_0 +β_1X_1+β_2X_2+ \cdots +β_pX_p + ϵ ~~~~~~~~~~~~~~~~~~~~~~(3.19)
$$

where $X_j$ represents the jth predictor and $β_j$ quantifies the association between that variable and the response. We interpret $β_j$ as the average effect on Y of a one unit increase in $X_j$, holding all other predictors fixed.

### 1.2.1. Assumptions that matter in multiple linear regression:

- Linear relationship between $y$ and $x_1$, $y$ and $x_2, etc.$
- Prediction errors, $ϵ$, have Normal Distribution
- Homoscedasticity: $Var(ϵ)=σ^2$  for all values of the independent variables $(x_1, x_2 , …)$
- No or little multicollinearity (correlation between $x_i$)

### 1.2.2. Estimating the Regression Coefficients

The parameters are estimated using the same least squares approach that we saw in the context of simple linear regression. We choose $β_0, β_1, \cdots  , β_p$ to minimize the sum of squared residuals($RSS$):

$$
\mathop{RSS} = \sum_{i=1}^n(y_i-\hat{y_i})^2
\\
= \sum_{i=1}^n(y_i-\hat{β_0} - \hat{β_1}x_{i1} - \hat{β_2}x_{i2} - ⋯-\hat{β_p}x_{ip} )^2~~~~~~~~~~~~~~~~~~~~~~~~(3.22)
$$

The values$\hat{β_0},\hat{β_1}, ⋯ ,\hat{β_p}$ that minimize (3.22) are the multiple least squares regression coefficient estimates.

### 1.2.3. Important Issues

When we perform multiple linear regression, we usually are interested in answering a few important questions.

#### 1.2.3.1. One: Is There a Relationship Between the Response and Predictors?

In the multiple regression setting with p predictors, we need to ask whether all of the regression coefficients are zero, i.e. whether $β_1 = β_2 = · · · = β_p = 0$. As in the simple linear regression setting, we use a **hypothesis test** to answer this question.

We test the **null hypothesis**:

$$
H_0:β_1 = β_2 = · · · = β_p = 0
$$

versus the alternative:

$$
H_a: at~least~one~β_j~is~non-zero.
$$

This hypothesis test is performed by computing the $F-statistic$,

$$
F = \frac{(\mathop{TSS-RSS})/p}{RSS/(n-p-1)},~~~~~~~~~~~~~~(3.23)
$$

> where,as with with simple linear regression,$\mathop{TSS}= ∑(y_i=\bar{y})^2$ and $\mathop{RSS}= \sum(y_i-\bar{y_i})^2$.
> If linearmodel assumptions are correct,one can show that:

$$
\mathop{E\{{{RSS/(n-p-1)\}}}= σ^2}
$$

and that,provided $H_0$ is true,

$$
\mathop{E\{{{(RSS-RSS)/p\}}}= σ^2}
$$

Hence, when there is no relationship between the response and predictors, one would expect the $F-statistic$ to take on a value close to 1. On the other hand, if $H_a$ true, then $\mathop{E\{(TSS − RSS)/p\}} > σ^2$, so we expect $F$ to be greater than 1.

In (3.23) we are testing $H_0$ that all the coefficients are zero. Sometimes we want to test that a $particular~subset~of ~q$ of the coefficients are zero.
This corresponds to a null hypothesis:

$$
H_0:β_{p-q+1} = β_{p-q+2} = · · · = β_p = 0
$$

where for convenience we have put the variables chosen for omission at the end of the list.

In this case we fit a second model that uses all the variables **except those last $q$**. Suppose that the residual sum of squares for that model is $RSS_0$. Then the appropriate $F-statistic$ is:

$$
F=\frac{(RSS_0-RSS)/q}{RSS/(n-p-1)}~~~~~~~~~~~~~~(3.2.4)
$$

#### 1.2.3.2. Deciding on Important Variables

The task of determining which predictors are associated with the response, in order to fit a single model involving only those predictors, is referred to as $variable selection$.

Ideally, we would like to perform variable selection by trying out a lot of different models, each containing a different subset of the predictors.

For instance, if $p = 2$, then we can consider four models:

> (1) a model containing no variables, (2) a model containing $X_1$ only, (3) a model containing $X_2$ only, and (4) a model containing both $X_1$ and $X_2$.
> We can then select the **best model** out of all of the models that we have considered. Various statistics can be used to judge the quality of a model: $AIC-Akaike~information~criterion\\BIC-Bayesian~information~criterion~\\Adjusted~R^2$

The task of determining which predictors are associated with the response is referred to as variable selection. We could try out a lot of different models with combinations of predictors, $2^p$, but this is not practical as $p$ grows.
There are three ways to approach this task:

- $Forward\ selection$: We begin with the $null\ model$, which contains **an intercept but no predictors**. We then fit $p$ Simple Linear regressions and add to the null model the variable that results in the lowest RSS. We then repeat the process to determine the lowest RSS of the now two-variable model, continuing until some stopping rule is satisfied.
- $Backward\ selection$: Start with all the variables in the model,**remove** the variable with the largest p-value. Then, for the new $(p−1)$-variable model, do the same. Continue until stopping rule is reached (for example, some $p-value$ threshold)
- $Mixed\ selection$: Start with **no variables**, and proceed $ith$ forward selection. If any p-value of added variables pass a threshold once new predictors are added, we remove them. We continue the forward and backward until all variables in model have a sufficiently low $p-value$.

  > That explains the **stepwise regression**:

  - variables have importance measures
  - start with current model
  - try to ADD one variable and see if that helps – if yes, add in best one
  - try to REMOVE one variable, if some are not significant, remove the worst one
  - specify 2 importance thresholds:
    - $p-to-add threshold$ ($p$≤ 0.15 to add)
    - $p-to-remove threshold$ ($p$>0.15 to remove)
  - When to Stop:_No variables can be ADDED or REMOVED_

**The danger of Stepwise Regression**

- Subset of variables chosen not necessarily optimal
- Not good if the number of variables >> observations (have at least 10 obs per variable is a guideline)
- $R^2$ generally improves with each step but don"t be fooled!!!!!
- Consider $Ridge\ or \  Lasso\ Regression$

#### 1.2.3.3. Model Fit

Two common methods of model fit are the $RSE $and $R^2$,the fraction of variance explained.**Plotting the model** can also be useful.

#### 1.2.3.4. Predictions

**Three sorts of uncertainty** associated with the prediction:

- 1. The coefficient estimates $\hat{β_0}+ \hat{β_1} + ⋯+\hat{β_p}   $ are estimates for $β_0+β_1 + ⋯ + β_p$. This inaccuracy is part of the reducible error. We can compute a confidence interval to determine how close $\hat{Y}$ is to $f(X)$.
- 2 $Model~Bias$: can result from the fact that we are fitting a linear approximation to the true surface of $f(X)$.
- 3. $Random~Error~ϵ$: $irreducible\ error$. We can use prediction intervals to estimate how far $Y$ will differ from $\hat{Y}$. These will always be larger than confidence intervals, because they incorporate both the $reducible + irreducible error$.

### 1.1.2. Other Considerations in the Regression Model

#### 1.1.2.1. Qualitative Predictors In our discussion

We assume that all variables in our linear regression model are quantitative. But in practice, this is not necessarily the case; often some predictors are qualitative.

#### 1.1.2.2. Predictors with only Two Levels

If a qualitative variable (also known as a factor) only has two possible values, then incorporating it into a model is easy. We can create a binomial dummy variable that takes on two values. For gender, this could be a variable that is 0 if observation has value male, and 1 if observation has value female. This variable can then be used in the regression equation.

$$
x_{i}= \begin{cases}1 & \text { if } i \text { th person is female } \\ 0 & \text { if } i \text { th person is male }\end{cases}~~~~~~~(3.26)
$$

#### Qualitative Predictors with More than Two Levels

When a qualitative predictor has more than two levels, a single dummy variable cannot represent all possible values. In this situation, we can create additional dummy variables.

The level with no dummy variable is known as the $baseline$.

### Extensions of the Linear Model

The standard linear regression $Y = β_0 +β_1X_1+β_2X_2+ \cdots +β_pX_p + ϵ ~(3.19)$makes 2 most important and restrictive assumptions often violated in practice.:$additive\ and\ linear.In fact, the two assumption may bot incorrect,each of the assumption can be removed by several methods.

- The $additive\ assumption$:the effect of changes in a predictor $X_j$ on the response $Y$ is independent of the values of the other predictors.But ir may cause interaction (synergy),we can remove the assumption by adding interaction term-$X_iX_j$.

- The $linear\ assumption$ the change in the response $Y$ due to a one-unit change in $X_j$ is constant, regardless of the value of $X_j$.But in some cases, the true relationship between the response and the predictors may be nonlinear. Here we present a very simple way to directly extend the linear model to accommodate non-linear relationships, using $polynomial\ regression$.

### Potential Problems

When we fit a linear regression model to a particular data set, many problems may occur. Most common among these are the following:

$
    1. Non-linearity\ of\ the\ response-predictor\ relationships.\\
    2. Correlation\ of\ error\ terms.\\
    3. Non-constant\ variance\ of\ error\ terms.\\
    4. Outliers.\\
    5. High-leverage\ points.\\
    6. Collinearity.
$

### 1.1.2. Summary for checking out a regression model

| Important Assumption                                     | What to check & do                                                                             |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Linear relationship between Y and X"s                    | Look at graphs of Xi vs Y for each i - should be linear                                        |
| Prediction errors, ϵ, have Normal Distribution<br/><br/> | Look at Normal probability plot of residuals<br/><br/>Check for outliers                       |
| Homoscedasticity<br/>constant variance<br/><br/><br/>    | Check plot of residuals vs. predicted values. Spread should be similar. If not, try transforms |
| No or little multicollinearity                           | Look at correlation matrix and graph – remove variables as needed                              |

### 1.1.3. Notice：R2 & multiple regression & R2-adjusted in multiple regression

R2-Adjusted：

$$
R_{a d j}^{2}=1-\left[\frac{\left(1-R^{2}\right)(n-1)}{n-k-1}\right]
$$

Another measure of fit, R2-adjusted

Always less than R2 since it includes penalty for too many terms

As you add terms R2 always improves but the model may get worse

If R2 >> R2-adjusted, eliminate some of the X"s from the model
