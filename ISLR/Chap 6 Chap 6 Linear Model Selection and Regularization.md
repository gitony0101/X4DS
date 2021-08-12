# 1. Chap 6 Linear Model Selection and Regularization

## 1.1. Subset Selection

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
f(β) & = \sum_{i=1}^n(y_i-\hat{y_i})^2 + λ∑_{j=1}^p β_j^2
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

### Application in shrinkage by SVD

For each matrix ${\bf X}$, we have ${\bf X = U_p∑_pV_p^{⊤}}$, where ${\bf U_p,V_p}$are two orthonormal matrix with size $n x p,p x p$ and${\bf E}$ is a squared diagonal matrix
For each r; in Ep = diag(01,"..,op), we call it singularvalue.
o Tightly correlated with eigenvalue.


### 1.2.3. Lasso Regression

$$
\hat{β} = \mathop{arg \min\limits_{β}}{∑_{i=1}^n(y_i - β_0 - ∑_{j=1}^p X_{ij}β_j)^2 + λ∑_{j=1}^p |β_j|}
$$
