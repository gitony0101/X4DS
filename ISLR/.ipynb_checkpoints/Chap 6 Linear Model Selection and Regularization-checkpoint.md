# 1. Chap 6 Linear Model Selection and Regularization

## 1.1. Subset Selection

There are two main types of subset selection methods: best subset selection and stepwise model selection.

we explore alternative fitting procedures since that alternative fitting procedures can yield better $\textit{Prediction accuracy and Model interpretability}$.

- $\textit{Prediction accuracy}$: Provided the relationship between the response and its predictors is approximately linear, then least squares estimates will have low bias.

  - If $n>>p$, meaning that the number of observations $n$ is much larger than the number of predictors $p$, then the least squares estimates tend to also have low variance. As $p$ approaches n, there can be a lot of variability in the least squares fit, which could result in **overfitting and poor predictions** on future observations. If $p > n$, there is no longer a unique least squares coefficient estimate; the method doesn’t work. By constraining or shrinking the estimated coefficients, we can significantly reduce the variance at the cost of a negligible increase in bias.

<br/>

- $\textit{Model interpretability}$: It is common for predictor variables used in a multiple regression model to not be associated with the response. Including these irrelevant variables leads to unnecessary complexity in the resulting model. If we could remove these variables by setting their coefficients equal to zero, we can obtain a simpler, more interpretable model. The chance of least squares yielding a zero coefficient is quite low. We will explore some approaches for feature selection.

### 1.1.1. Best Subset Selection

We fit a separate least squares regression for each possible combination of the $p$ predictors. That is, we fit all p models that contain exactly one predictor, all $\binom{p}{2}$ that contain exactly two predictors, and so forth. Once we fit all of them, we identify the one that is best.However, this is just the problem with best subset selection is the computational cost. Fitting $2^p$ possible model quickly grows prohibitively expensive.

### 1.1.2. Stepwise Selection

- Forward stepwise selection
- Backward stepwise selection
- Hybrid Approaches

  - Another alternative is a hybrid approach. Variables can be added to the model sequentially, as in forward selection. However, after adding each new variable, the method may also remove any variables that no longer provide an improvement in model fit. **Such an approach attempts to mimic best subset selection while retaining the computational advantages of forward and backward stepwise selection.**

### 1.1.3. Choosing the Optimal Model

In order to select the best model with respect to the test error, the test error needs to be estimated through one of two methods:

- An indirect estimate through some kind of mathematical adjustment to the training error, which accounts for bias due to overfitting.

- A direct estimate through a method such as cross-validation.

#### 1.1.3.1. $C_p$,AIC,BIC and $R_{adj}^2$

In general, the training set $MSE$ is an underestimate of the test $MSE$. When we fit a model to the training data using least squares, we specifically estimate the regression coefficients such that the training $RSS$ is as small as possible. Training error will always decrease as we add more variables to the model, but the test error may not. Therefore, we cannot use metrics such as $R^2$ to select from models containing different numbers of variables.We do have a number of techniques for adjusting the training error:

1.  For a fitted least squares model containing d predictors, the $C_p$ estimate of test $MSE$ is computed using the equation:

$$
C_{p}=\frac{1}{n}\left(\mathrm{RSS}+2 d \hat{\sigma}^{2}\right)
$$

- Where $σ^2$ is an estimate of the variance of the error $ϵ$ associated with each response measurement. Typically, $σ^2$ is estimated using the full model with all predictors. The $C_p$ statistic essentially adds a penalty of $2dσ^2$ to the training $RSS$ in order to adjust for the fact that the training error tends to underestimate the test error. The more predictors, the higher the penalty.

2.  The AIC criterion is defined for a large class of models fit by maximum likelihood. In the case of the model with Gaussian errors, maximum likelihood and least squares are the same thing.For least squares, AIC and $C_P$ are proportional to eachother.

$$
AIC=\frac{1}{n\hat\sigma^2}\left(\mathrm{RSS}+2 d \hat{\sigma}^{2}\right)
$$

3. BIC looks similar but can place a higher penalty on models with many variables.
   $$
   BIC=\frac{1}{n\hat\sigma^2}\left(\mathrm{RSS}+log(n){\sigma}^{2}\right)
   $$

- BIC replaces the $2dσ^2$ used by $C_p$ with a $log(n)σ^2$. Since log$(n)>2$ for any $n>7$, BIC places a heavier penalty on models with many variables and tends to select smaller models than $C_p$.

4. Another measure of fit, $R^2-adjusted$.IT is another approach for selecting among a set of models. Remember that $R^2$ is defined as $1−RSS/TSS$. Since $RSS$ can only decrease as more variables are added to the model, $R^2$ always increases as more variables are added. For a least squares model with $d$ variables, adjusted $R^2$ is calculated as

$$
R_{adj}^2=1- \bigg[\frac{(1-R^2)(n-1)}{n-k-1}\bigg]
$$

- Always less than$R^2$ since it includes penalty for too many terms

- As you add terms $R^2$ always improves but the model may get worse

- If $R^2$ >> $R^2-adjusted$, eliminate some of the $X_i$s from the model

## 1.2. Shrinkage Methods-Ridge & Lasso-Models with penalty

Shrinkage methods = RSS + Penalty, this is a soultion of the multicollinearity for linear regression.

Rethink about the multicollinearity and cramer's rule.

### 1.2.1. Why Shrinkage methods?

Previously, in Multiple Linear Regression, we can estimate the $\hat{β}$ with $\mathop{\hat{β}} = {\bf (X^{⊤}X)^{-1}X^{⊤}y}$, but what if ${\bf X^{⊤}X}$ is NOT inverse?

> ${\bf X^{⊤}X}$ is NOT inverse:${\bf X^{⊤}X}$ is NOT Full-ranked, which means ${\bf |X^{⊤}X| = 0}$, or $Multicollinearity$: There is at **least one eigenvalue** $λ_i = 0$
>
> - In practice, the ${\bf |X^{⊤}X| ≈ 0}$, thus makes the $\hat{β}$ **unstable** : $D(\hat{β}) = σ^2({\bf X^{⊤}X})^{-1}$ **increases**.

### 1.2.2. Penalty

In order to solve the practical problem, we want the $\hat{β}$ not to fluctuate to much, so we want to make a limitation for $\hat{β}$: the Penalty.

#### 1.2.2.1. But why penalty?

In Matrix Algebra , Matrix has the property, intuitively, if $\{λ_1,λ_2,⋯,λ_p\}$ are the eigenvalues of ${\bf X^{⊤}X}$,then $\{λ_1 + k,λ_2+ k,⋯,λ_p + k\}$ are the eigenvalues of $({\bf X^{⊤}X} + kI),(k > 0)$, where ${\bf X^{⊤}X}$ is $s.p.d(Semi-positive-definite)$.

The penalty works like the $kI$ in the matrix $({\bf X^{⊤}X} + kI),(k > 0)$, which can make the new matrix **full-ranked** , in the original $RSS + penalty$, it make sure that **solution of $\hat{β}$ exists**.Alternatively, **the estimator of Ridge or Lasso Regression exist. The multicollinearity issue got solved.**

#### 1.2.2.2. Regularization Frame :**The main difference of the models is the feature of the penalty**

Regularization Frame:

$$
{arg}\ \underset{w}{min}{[\underset{loss}{L(β)} + λ\underset{penalty}{P(β)}]}
$$

Here we would like to make the summary of the models with penalty:

$$
\mathop{\hat{β}^{\bf shrink}} = \mathop{RSS} + λ\sum_{j=1}^pβ_j^{\mathit{S}}
$$

When the ${\bf shrinkage}$ model is $Ridge$ Regression,${\mathit{S}} = 2$;

When the ${\bf shrinkage}$ model is $Lasso$ Regression,${\mathit{S}} = 1$.

Here come the models with $penalty:β_j^{\mathit{S}}$.

More generally, we can

where $\mathop{RSS}=\sum_{i=1}^n(y_i-\hat{y})^2$.\, It is the **key point of Statistical Learning**, since the target of which is to **$minimize$ the sum of differences** between **the observations $\hat{y_i}$ and the true value $y_i$**.

Figure 6.7

<img src=https://dtkaplan.github.io/math253/Class_notes/_book/Images/Chapter-6/6.7.png>

$\mathop{FIGURE\ 6.7.}$ Contours of the error and constraint functions for the $Lasso (left)$ and $Ridge\ regression (right)$.

The solid blue areas are the constraint regions, $|β_1| + |β_2| ≤ s$ and $β_1^2 + β_2^2 ≤ s$,

while the **red ellipses** are the **contours of the $RSS$**.

Rethinking of[models with penalty-Lagrange Relaxation](https://zhuanlan.zhihu.com/p/31458541)

### 1.1.2. Pre. Matrix Derivative Computations

- Matrix Derivative is more than importantin many areasrelated to data science, such as $SVM$ and $RNN$.

- Therefore, some tricks of computation could aid a lot in computing $gradient$ and $Hessian$.

If $f: \mathbb{R}^{n} → \mathbb{R}, C^1$, then

$$
\mathrm{D}{\bf f(x)[v]=v^⊤ ∇f(x)} = \langle {\bf v,∇f(x)}\rangle
\\
\tag{Theorem-12 “cha.”ch3-4}
$$

where $\mathrm{D}$ means the directional derivative.

> Also, we have the Matrix Derivative:

$$
\mathrm{D}{\bf f(A)[d]} = \langle {\bf d, ∇f(A)} \rangle =  \langle {\bf∇f(A),d} \rangle
\tag{Theorem 12.1}
$$

Similarily,we have:

If $f: \mathbb{R}^{n} → \mathbb{R}, C^{2}$, then $\nabla^{2} f(x) \cdot v=D(\nabla f(x))[v]$, where D means the directional derivative.

#### 1.1.2.1. e.g Find the Gradient and Hessian of $f(x)= \frac12{\bf x^{⊤}Ax}$.

$Sol.$ Firstly, note that $\forall v$, we have

$$
\begin{aligned}
\mathrm{D}{\bf f(x)[v]} &={\bf v^{\top} ∇{f(x)}}=\lim _{t→0} {\bf \frac{f(x+tv)-f(x)}{t}}
\\ &= \frac12 \lim _{t→0} {\bf \frac{(x+tv)^{⊤}A(x+tv) - x^{⊤}Ax}{t}}
\\ &= \frac12 \lim _{t→0} {\bf \frac{x^{⊤}Ax + x^{⊤}Atv + tv^{⊤}Ax +t^2v^{⊤}Av - x^{⊤}Ax}{t}}
\\ &=\frac12 {\bf v^{⊤}Ax+\frac12 x^{⊤} Av}={\bf v^{⊤}Ax}
\end{aligned}
$$

So we have ${\bf \nabla f(x)=A x}$.

Secondly, Note that ${\bf ∀ v}$, we have

$$
\begin{aligned}
{\bf \nabla^{2} f(x)⋅v} &=\mathrm{D}{\bf \nabla f(x)[v] \lim _{t → 0} \frac{\nabla f(x+tv)-\nabla f(x)}{t}}
\\&={\bf Av}
\end{aligned}
$$

So we have ${\bf \nabla^{2} f(x)=A}$

#### 1.1.2.2. Matrixes inner product : trace of the product of the Matrixes:

Definition of the Matrixes inner product:

$$
⟨{\bf A,B}⟩ = \sum_{ij}a_{ij}b_{ij}
$$

where ${\bf A ∈ R^{m×n}, B ∈ R^{m×n}}$.

$Prop.$ Then the matrixes inner product equals to the trace of the product of the Matrixes:

$$
⟨{\bf A,B}⟩ = \mathop{Tr}({\bf A^{⊤}B})
$$

### 1.1.2. Ridge Regression

Ridge Regression Estimator: $\hat{β}(k) = {\bf (X^{\top}X +kI)^{-1}X^{⊤}Y}$

Ridge Regression Objective:

$$
\hat{β} = \mathop{arg \min\limits_{β}}{Σ_{i=1}^n(y_i - β_0 - Σ_{j=1}^p X_{ij}β_j)^2 + λΣ_{j=1}^p β_j^2}
$$

We let:

$$
\begin{aligned}
\mathbf{y}&=\left[\begin{array}{c}
y_{1} \\
y_{2} \\
\vdots \\
y_{n}
\end{array}\right], \quad\quad \quad  \mathbf{X}=\left[\begin{array}{ccccc}
1 & x_{11} & x_{12} & \cdots & x_{1 k} \\
1 & x_{21} & x_{22} & \cdots & x_{2 k} \\
\vdots & \vdots & \vdots & & \vdots \\
1 & x_{n 1} & x_{n 2} & \cdots & x_{n k}
\end{array}\right]
\\
β&=\left[\begin{array}{c}
β_{0} \\
β_{1} \\
\vdots \\
β_{k}
\end{array}\right], \quad\quad \quad
ϵ=\left[\begin{array}{c}
ϵ_{1} \\
ϵ_{2} \\
\vdots \\
ϵ_{n}
\end{array}\right]
\end{aligned}
$$

We let:

$$
\begin{aligned}
f(β) & = \sum_{i=1}^n(y_i-\hat{y_i})^2 + λΣ_{j=1}^p β_j^2
\\ & ={\bf (y-xβ)^{⊤}(y-xβ) + λβ^{⊤}β}
\end{aligned}
$$

We want to find $\mathop{arg \min\limits_{β}}f(β)$

Firstly, $\frac{ λβ^{⊤}β}{∂β} = ∇f(\beta)$
We want to find $\mathop{arg \min\limits_{β}}f(β)$, which means $\frac{∂f(β)}{∂β} = ∇f(\beta)$.

Given that $\frac{∂(\bf λβ^{⊤}β)}{∂{\bf β}} = 2λβ$ ,Secondly, let $g(β) = {\bf (y-xβ)^{⊤}(y-xβ)}$

Find the direction derivative of $g(β)$ by definition:

$$
\begin{aligned}
\frac{∂g(β)}{∂β} & = ∇g(\beta)
\\ & = \lim _{t→0} \frac{g(β + tv) - g(β)}{t}
\\ & \stackrel{\text{\bf z = y-xβ}}{=}  \lim _{t→0} \frac{\bf (z - txv)^{⊤}(z-txv) - z^{⊤}z }{t}
\\ & = {\bf -v^{⊤}2x^{⊤}z} = {\bf -v^{⊤}2x^{⊤}(y-xβ)}= {\bf v^{⊤}∇g(β)}
\end{aligned}
$$

It's triky that how $\text{\bf z = y-xβ}$ transfer works,thus I solve it by the second-derivative:$g(β) = {\bf (y-xβ)^{⊤}(y-xβ)} ={\bf y^{⊤}y - y^{⊤}xβ - x^{⊤}yβ + x^{⊤}xβ^2}$

Thus:

$$
\begin{aligned}
\frac{∂g(β)}{∂β} & = {\bf - y^{⊤}x - x^{⊤}y + 2x^{⊤}xβ}
\\ & = {\bf -2x^{⊤}y + 2x^{⊤}xβ}
\\ & = {\bf -2x^{⊤}(y-xβ)}
\\ & {\bf (x^{⊤}y = y^{⊤}x)}
\end{aligned}
$$

Also,${\bf v}$ is arbitrary,${\bf ∇g(β) = -2x^{⊤}(y-xβ)}$.
Thus,${\bf ∇f(β) = -2x^{⊤}(y-xβ)} + 2λβ$,let${\bf ∇f(β) =0}$,we have:

$$
\mathop{\hat{β}} = {\bf (x^{⊤}x + λI)^{-1}x^{⊤}y}
$$

However, it not enough, since it's just the **first-order derivative** of $f(β)$ which may be NOT Min(Max) point, instead, it could be the extreme point of $f(β)$, so we need the **Second Derivative** of $f(β)$, go on by definition of derivative:

$$
\begin{aligned}
\mathop{\frac{\partial f^2(β)}{\partial β^2}} & = ∇^2f(β)
\\ &= \lim _{t→0} {\bf \frac{∇f(β + tv) - ∇f(β)}{t}}
\\ & = \lim _{t→0} {\bf \frac{2x^{⊤}xv + 2λv}{t}}
\\ & =  {\bf 2(x^{⊤}x + λ)v = ∇^2f(β)v}
\end{aligned}
$$

> Here ${\bf ∇f(β) = -2x^{⊤}(y-xβ)} + 2λβ = 2(λβ - x^{⊤}y + x^{⊤}xβ)$, the $- x^{⊤}y$ can be omitted since it is unrelative with $β$.

So,$∇^2f(β) =  {\bf 2(x^{⊤}x + λI)} > 0$, the $f(β)$ is **Positive Definite**. And we proved that the **Ridge Regression Estimator** and **Ridge Regression Objective** is equivalent substantially.

### 1.1.3. From SVD to the essence of Ridge

For each matrix ${\bf X}$, we have ${\bf X = U_pΣ_pV_p^{⊤}}$(Low Ranked SVD), where ${\bf U_p,V_p}$are two orthonormal matrix with size $n×p,p×p$ and${\bf E}$ is a squared diagonal matrix.
For each $σ_i$; in ${\bf Σ_p} =diag(σ_1,σ_2⋯,σ_p)$, we call it **singular value**.SVD is tightly correlated with eigenvalue.

$$
\underset{\bf U}{\begin{bmatrix}
  U_1 & U_2 & ⋯ & U_m
  \end{bmatrix}}
  \underset{\bf Σ}{
  \begin{bmatrix}
σ_1 \\
&σ_2 \\
&& ⋱ \\
&&& σ_m
  \end{bmatrix}}
\underset{\bf V^{⊤}}{
 \begin{bmatrix}
V_1^{⊤}\\
V_2^{⊤}\\
⋮\\
V_m^{⊤}
\end{bmatrix}}
$$

if $σ_{p+1},⋯σ_m = 0$,then $U_{p+1},⋯U_m,V_{p+1}^{⊤},⋯V_m^{⊤}$ are all equals to 0(They all do not work:

$$
\underset{\bf U}{\begin{bmatrix}
  U_1 & U_2 & ⋯ & U_p
  \end{bmatrix}}
  \underset{\bf Σ}{
  \begin{bmatrix}
σ_1 \\
&σ_2 \\
&& ⋱ \\
&&& σ_p\\
&&&& 0\\
&&&&& ⋱\\
&&&&&& 0\\
  \end{bmatrix}}
\underset{\bf V^{⊤}}{
 \begin{bmatrix}
V_1^{⊤}\\
V_2^{⊤}\\
⋮\\
V_p^{⊤}
\end{bmatrix}}
$$

#### 1.1.3.1. Norm

**Norm:** $||...||$

e.g.
${\bf X} =(x_1,x_2,⋯,x_n)^{⊤}$,then ${\bf ||X||_2 =\sqrt {x_1^2 +x_2^2 + ⋯ + x_n^2}}$,and we have ${\bf ||I||}_2 = 1$

Now Assumming $\underset{m×p}{\bf X} = \underset{m×p}{\bf U} \underset{p×p}{\bf Σ}\underset{p×p}{\bf V^{⊤}}$, then we can find that:

$$
\begin{aligned}
{\bf X^{⊤}X + kI} &= {\bf VΣU^{⊤}UΣV^{⊤} + kI}
\\ & = {\bf VΣ^2V^{⊤} + kI}
\\ & = {\bf V(Σ^{2} + kI)V^{⊤}}
\end{aligned}
$$

where ${\bf V^{⊤}V = I, V^{⊤} = V^{-1}}$

So

$$
\begin{aligned}
{\bf (X^{⊤}X + kI)^{-1}X^{⊤}X} & = {\bf V(Σ^{2} + kI)V^{⊤} VΣ^2V^{⊤}}
\\ & = {\bf V(Σ^{2} + kI)Σ^2V^{⊤}}
\end{aligned}
$$

Also we have the $\hat{β}(k) = {\bf A_k\hat{β}}$,where ${\bf A_k} =  {\bf  V(Σ^{2} + kI)Σ^2V^{⊤}}$,so

$$
||\hat{β}(k)|| = ||{\bf  V(Σ^{2} + kI)Σ^2V^{⊤}}⋅\hat{β}|| ≤ ||{\bf  V(Σ^{2} + kI)Σ^2V^{⊤}}||⋅||\hat{β}||
$$

where we have ${\bf ||AB|| ≤ ||A||⋅||B||}$.

Here $||{\bf  V(Σ^{2} + kI)Σ^2V^{⊤}}||⋅||\hat{β}|| \underset{col\ row\ orthogonal}{=}||{\bf  (Σ^{2} + kI)Σ^2}||⋅||\hat{β}||$

#### 1.1.3.2. Shrinkage factor - Which to Srinkage

Yeah, we made it, go on ,let's look at what is ${\bf  (Σ^{2} + kI)Σ^2}$:

$$
\begin{pmatrix}
\frac{1}{σ_1^2 + λ}\\
&\frac{1}{σ_2^2 + λ}\\
&&⋱\\
&&&\frac{1}{σ_p^2 + λ}
\end{pmatrix}
\begin{pmatrix}
σ_1 \\
&σ_2 \\
&& ⋱ \\
&&& σ_p
\end{pmatrix}
=
\begin{pmatrix}
\frac{σ_1^2}{σ_1^2 + λ}\\
&\frac{σ_2^2}{σ_2^2 + λ}\\
&&⋱\\
&&&\frac{σ_p^2}{σ_p^2 + λ}
\end{pmatrix}
$$

We find that $\frac{σ_i^2}{σ_i^2 + λ} < 1$,then $||{\bf  (Σ^{2} + kI)Σ^2|| < ||I||}(=1)$, thus $||{\bf  (Σ^{2} + kI)Σ^2}||⋅||\hat{β}|| ≤ ||\hat{β}||$.

$\frac{σ_i^2}{σ_i^2 + λ}$ is called $\text{Shrinkage factor}$, **When $σ_i^2$ increases, the Shrinkage factor $i$ increases, consequently, it will be harder for shrinkaging**. Thus $σ_i^2$ detemines which to shrinkage.

#### 1.1.3.3. The essence of Ridge

Alternatively, we can say the larger the $σ_i^2$ is , the more information $i$ contains.Thats what the RIdge Regression means, leave the dataset with more information, get rid of the dataset with less information.

### 1.1.2. Lasso Regression

- Could we change the penalty? Yes,From 2-norm to 1-norm.

Least Absolute Selection and Shrinkage Operator (LASSO),which has some unexpected properties

$$
\hat{β} = \mathop{arg \min\limits_{β}}{Σ_{i=1}^n(y_i - β_0 - Σ_{j=1}^p X_{ij}β_j)^2 + λΣ_{j=1}^p |β_j|}
$$

### 1.1.3. Other Penaties: Elastic Net

### 1.1.4. Ridge Regression vs Lasso Regression

In general, lasso regression is expected to perform better than ridge regression when the response (Y Y Y) is expected to be a function of only a few of the predictors.

In general, ridge regression is expected to perform better than lasso regression when the response is expected to be a function of a large number of predictors.

Cross-validation should be used to compare both methods and choose the best model.

### 1.1.5. Selecting the Tuning Parameter λ \lambda λ

As mentioned previously, choosing the proper value for the tuning parameter is crucial for coming up with the best model.

Cross-validation is a simple method of choosing the appropriate λ \lambda λ value. First, create a grid of different λ \lambda λ values, and determine the cross-validation test error for each value. Finally, choose the value that resulted in the lowest error.

## 1.2. Dimension Reduction Methods

### 1.2.1. Principal Components Analysis & Regression


#### PCA

#### PCR

The number of principal components to use in regression can be chosen in one of two ways. 

- The first method involves simply using the number of components that explain a large amount of the variation in the data.

- The second method involves choosing the number of principal components that results in the regression model with the lowest test error. 

Typically, both methods should result in the same or similar final models with test errors that do not greatly differ from one another.


## 1.2. Considerations in High Dimensions

Today, it is common to be able to collect hundreds or even thousands of predictors for our data. The high dimensional setting refers to situations where the number of predictors exceeds the number of observations we have available.

**In the high dimensional setting, least squares cannot be used** because it will result in coefficient estimates that are a **perfect fit** to the data, such that the residuals are zero. This is where subset selection, ridge regression, lasso, principal components regression, and partial least squares should be used instead.

However, the interpretation of model results is a bit different.Since we have hundreds of predictors,**a different dataset might actually result in a totally different predictive model**. Therefore, we must indicate that we have identified one of the many possible models, and it must be further validated on independent datasets.

Additionally, $\mathrm{SSE, p-values, R^2}$, and other traditional measures of model fit should never be used in the high dimensional setting. Instead, report the results of the model on an independent test dataset, or cross-validation errors.
