# 1. Chap 6 Linear Model Selection and Regularization

## 1.1. Subset Selection

## 1.2. Shrinkage Methods-Ridge & Lasso-Models with penalty

### 1.2.1. Why Shrinkage methods?

Previously, in Multiple Linear Regression, we can estimate the $\hat{β}$ with $\mathop{\hat{β}} = {\bf (X^{⊤}X)^{-1}X^{⊤}y}$, but what if ${\bf X^{⊤}X}$ is NOT inverse?

> ${\bf X^{⊤}X}$ is NOT inverse:${\bf X^{⊤}X}$ is NOT Full-ranked, which means $Multicollinearity$.
> Or there is at **least one eigenvalue** $λ_i = 0$

### 1.2.2. Penalty

#### 1.2.2.1. But why penalty?

efinite Positive 正定

#### 1.2.2.2. **The main difference of the models is the feature of the penalty**

Here we would like to make the summary of the models with penalty:

$$
\mathop{\hat{β}^{\bf shrink}} = \mathop{RSS} + λ\sum_{j=1}^pβ_j^{\mathit{S}}
$$

When the ${\bf shrinkage}$ model is $Ridge$ Regression,${\mathit{S}} = 2$;

When the ${\bf shrinkage}$ model is $Lasso$ Regression,${\mathit{S}} = 1$.

Here come the models with $penalty:β_j^{\mathit{S}}$.

where $\mathop{RSS}=\sum_{i=1}^n(y_i-\hat{y})^2$.\, It is the **key point of Statistical Learning**, since the target of which is to **$minimize$ the sum of differences** between **the observations $\hat{y_i}$ and the true value $y_i$**.

Figure 6.7

<img src=https://dtkaplan.github.io/math253/Class_notes/_book/Images/Chapter-6/6.7.png>

$\mathop{FIGURE\ 6.7.}$ Contours of the error and constraint functions for the $Lasso (left)$ and $Ridge\ regression (right)$.

The solid blue areas are the constraint regions, $|β_1| + |β_2| ≤ s$ and $β_1^2 + β_2^2 ≤ s$,

while the **red ellipses** are the **contours of the $RSS$**.

Rethinking of[models with penalty-Lagrange Relaxation](https://zhuanlan.zhihu.com/p/31458541)

### 1.2.2. Pre. Matrix Derivative Computations

- Matrix Derivative is more than importantin many areasrelated to data science, such as $SVM$ and $RNN$.

- Therefore, some tricks of computation could aid a lot in computing $gradient$ and $Hessian$.

If $f: \mathbb{R}^{n} → \mathbb{R}, C^1$, then

$$
\mathrm{D}{\bf f(x)[v]=v^⊤ ∇f(x)} = \langle {\bf v,∇f(x)}\rangle
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

#### 1.2.2.1. e.g Find the Gradient and Hessian of $f(x)= \frac12{\bf x^{⊤}Ax}$.

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

#### 1.2.2.2. Matrixes inner product : trace of the product of the Matrixes:

Definition of the Matrixes inner product:

$$
⟨{\bf A,B}⟩ = \sum_{ij}a_{ij}b_{ij}
$$

where ${\bf A ∈ R^{m×n}, B ∈ R^{m×n}}$.

$Prop.$ Then the matrixes inner product equals to the trace of the product of the Matrixes:

$$
⟨{\bf A,B}⟩ = \mathop{Tr}({\bf A^{⊤}B})
$$

### 1.2.2. Ridge Regression

Ridge Regression Estimator: $\hat{β}(k) = {\bf (X^{\top}X +kI)^{-1}X^{⊤}Y}$

Ridge Regression Objective:

$$
\hat{β} = \mathop{arg \min\limits_{β}}{∑_{i=1}^n(y_i - β_0 - ∑_{j=1}^p X_{ij}β_j)^2 + λ∑_{j=1}^p β_j^2}
$$

### 1.2.3. Lasso Regression

$$
\hat{β} = \mathop{arg \min\limits_{β}}{∑_{i=1}^n(y_i - β_0 - ∑_{j=1}^p X_{ij}β_j)^2 + λ∑_{j=1}^p |β_j|}
$$
