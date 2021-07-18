# Chaper 3 Linear Regression

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

### 2.0 Important definitions: RSS ESS TSS RSE MSE, etc.

>From the very beginning we need to acknowledge the important criterions which evalue the performance of linear regression.


#### 2.0.1 **RSS——Residual Sum of Squares**

$$
\mathrm{RSS}=e_{1}^{2}+e_{2}^{2}+⋯+e_{n}^{2}
$$

or equivalently as

$$
\operatorname{RSS}=\sum_{i=1}^n(y_i-\hat{y})^2=\left(y_{1}-\hat{β}_{0}-\hat{β}_{1} x_{1}\right)^{2}+\left(y_{2}-\hat{β}_{0}-\hat{β}_{1} x_{2}\right)^{2}+\ldots+\left(y_{n}-\hat{β}_{0}-\hat{β}_{1} x_{n}\right)^{2}
$$


#### 2.0.2 **ESS——Explained Sum of Squares**

The explained sum of squares (ESS) is the sum of the squares of the deviations of the predicted values from the mean value of a response variable.

For example: $y_i = a + b_1x_{1i} + b_2x_{2i} + ... + ε_i$, where $y_i$ is the $i^{th}$ observation of the response variable, $x_{ji}$ is the$i^{th}$bservation of the $j$ th explanatory variable, a and $b_j$ are coefficients, $i$ indexes the observations from  to n, and $ϵ_i$ is the $i^{th}$ value of the error term. In general, the greater the ESS, the better the estimated model performs.

We let $\hat{a}$ and $\hat{b}$ are the estimated coefficients, then$\hat{y_i} = \hat{a} + \hat{b_1}x_{1i} + \hat{b_2}x_{2i} + ........$is the $i^{th}$ predicted value of the response variable. The ESS:

$$
\mathop{ESS} = \sum_{i=1}^n(\hat{y_i} - \bar{y})^2
$$
where $\hat{y_i}$ the value estimated by the regression line.

#### 2.0.3 **TSS——Total Sum of Squares**

In statistical data analysis the total sum of squares (TSS or SST) is a quantity that appears as part of a standard way of presenting results of such analyses.

$$
\mathop{TSS} = \sum_{i=1}^n(y_i-\bar{y})^2
$$

**Notes:**In some cases : total sum of squares ( TSS ) = explained sum of squares (ESS)+ residual sum of squares (RSS):

$$
\mathop{TSS} = \mathop{ESS} + \mathop{RSS}
$$

**The least squares approach** chooses $\hat\beta_0$ and $\hat\beta_1$ to minimize the RSS. Using some calculus, one can show that the minimizers are:

$$
\mathop{\hat{β}_{1}}=\frac{\sum_{i=1}^{n}\left(x_{i}-\bar{x}\right)\left(y_{i}-\bar{y}\right)}{\sum_{i=1}^{n}\left(x_{i}-\bar{x}\right)^{2}}\\
\mathop{\hat{β}_{0}}=\bar{y}-\hat{β}_{1}\bar{x}~~~~~~~(3.4)
$$
where $\bar{y}≣ \frac{1}{n} \sum_{i=1}^ny_i$ and $\bar{x}≣ \frac{1}{n} \sum_{i=1}^nx_i$ are the sample means.Or the equation defines are $\mathit{least\ squares\ estimats\ for\ simple \ linear\ regression}$


### 2.0.4 Alternative definitions
>different definitions:

- SSR(Sum of Squares for **regression**) = ESS (explained sum of squares)

- SSE（Sum of Squares for Error） = RSS (residual sum of squares)

- SST(Sum of Squares for total) = TSS(total sum of squares)

So we have:
- **SSE+SSR=SST** 
  
  or equivalently:

- **RSS+ESS=TSS**

#### 2.0.4 Standard Error of $\hat{μ}$

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


#### 2.0.5 **RSE——Residual Standard Error**

Since every observation has an associated error term $ϵ$, having the knowledge of true $β_0$ and $β_1$ will still not allow one to perfectly predict $Y$. The residual standard error estimates the standard deviation of the error term.

$$
\mathop{RSE} = \sqrt{1/(n-2)*RSS} = \sqrt{1/(n-2)\sum_{i=1}^{n}(y_i - \hat y)^2}
$$


#### 2.0.6 **MSE--Mean Squared Error**

(CH02 2.2.1) \
In order to evaluate the performance of a statistical learning method on a given data set, we need some way to measure how well its predictions actually match the observed data. \
That is, we need to quantify the extent to which the predicted response value for a given observation is close to the true response value for that observation. In the regression setting, the most commonly-used measure is the mean squared error (MSE), given by:

$$
\mathop{MSE}= \frac{1}{n}(y_i - \hat{f}(x_i))^2
$$

where $\hat{f}(x_i)$ is the prediction that $\hat{f}$ gives for the $i$th observation
\
The MSE will be small if the predicted responses are very close to the true responses, and will be large if for some of the observations, the predicted and true responses differ substantially.

#### 2.0.7 $R^2$

$$
R^2 = 
\frac{TSS - RSS}{TSS} = 
1 - \frac{RSS}{TSS} =
1-\frac{\text { Unexplained Variation }}{\text{ Total Variation }}
$$

$R^2$ proportion of total variation accountedfor by the independent variables in themodel.

- $0 ≤ R^2 ≤ 1$
- $R^2$ is correlation between predicted andobserved outcomes

### 2.0.8 P-value(Check $hypothesis~test$)

larger in absolute value, assuming $β_1$= 0. We call this probability the p-value.

p-value is a  association between the predictor and the response. Hence, if we see a small p-value,then we can infer that there is an association between the predictor and the response.

#### 2.0.X notes for me

表征依变数Y的变异中有多少百分比,可由控制的自变数X来解释.
相关系数（coefficient of correlation）的平方即为决定系数。它与相关系数的区别在于除掉|R|=0和1情况，
由于R2<R,可以防止对相关系数所表示的相关做夸张的解释。
确定系数：在Y的总平方和中，由X引起的平方和所占的比例，记为R2(R的平方)
确定系数的大小决定了相关的密切程度。
当R2越接近1时，表示相关的方程式参考价值越高；相反，越接近0时，表示参考价值越低。这是在一元回归分3析中的情况。但从本质上说确定系数和回归系数没有关系，就像标准差和标准误差在本质上没有关系一样。
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


## 3.2. Estimating the Coefficients

The goal is to obtain coefficients such that the linear model fits
the data well - *i.e.* as close as possible to the data points. The most common approach involves minimizing the **least squares** criterion.

We let

$$
e_i = y_i − ŷ_i
$$

which represents the ith **residual**. The **residual sum of squares** or **RSS** is the sum of the squares of each of these residuals.

An example in R - we generate a our predictions base on $f(x)+e$, and also have a "guess" at an $\hat{f}(x)$. We calculate our $y_i$, and then calculate the RSS.


### 3.2.1 Computing Confidence Intervals

Standard Erros $μ$ can be used to compute the **$Confidence\ Intervals$**:

A 95 % confidence interval confidence interval is defined as a range of values such that with 95 % probability, the range will contain the true unknown value of the parameter.The range is defined in terms of lower and upper limits computed from the sample of data. For linear regression, the 95 % confidence interval for $β_1$ approximately takes the form:

$$
[\hat{β_1} - 2⋅\mathop{SE(\hat{β_1})}  , \hat{β_1} + 2⋅\mathop{SE(\hat{β_1})}  ]
$$

Accordingly,we have the 95% chance confidence interval for $β_0$:


$$
[\hat{β_0} - 2⋅\mathop{SE(\hat{β_0})}  , \hat{β_0} + 2⋅\mathop{SE(\hat{β_0})}  ]
$$

### 3.2.2 Hypothesis Tests

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

To test the null hypothesis, we need to determine whether $\hat{β_1}$,our estimate for $β_1$, is sufficiently far from zero that we can be confident that $β_1$ is non-zero. 

> How far is far enough? 

This of course depends on the accuracy of $\hat{β1}$—that is, it depends on $\mathopSE(ˆβ1). If SE(ˆβ1) is small, then even relatively small values ofˆβ1may provide strong evidence that β1?= 0, and hence that there is a relationship between X and Y . In contrast, if SE(ˆβ1) is large, thenˆβ1must be large in absolute value in order for us to reject the null hypothesis. In practice, we compute a t-statistic,


$$
t = \frac{\hat{β_1}-0}{\mathop{SE(\hat{β_1})}}
$$


### 2.2 Assessing the Accuracy of the Coefficient Estimates and RSE

We assume that the true relationship between $X$ and $Y$ takes the form $Y = f(X) + ϵ$ for some unknown function $f$, where $ϵ$ is a **mean-zero random error** term.
\If f is to be approximated by a linear function, then we can write this relationship as
$$
Y= \beta_0 + \beta_1X + ϵ
$$
Here $β_0$ is the intercept term—that is, the expected value of $Y$ when $X = 0$, and $β_1$ is the slope—the average increase in $Y$ associated with a one-unit increase in $X$.


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
