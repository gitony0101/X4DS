Markdown template (in unicode)

plug:Auto Markdown TOC By AX1 livepdm.auto-markdown-toc-ax1

## 1. Rules:

- latex in unicode
- commands upper and lower case sensitive: $≣$

$$
\mathit{Reference:b\_Ref\_Latex}
$$

## 2. greek symbol

$$
\hatβ
\\
y^{ix}_{jy}
$$

## 3. Equations

$$
F(i)=\sum_{i=1}^m5i
$$

$$
\begin{aligned}
\frac{∂g(β)}{∂β} & = ∇g(\beta)
\\ & = \lim _{t→0} \frac{g(β + tv) - g(β)}{t} \stackrel{\text{\bf z = y-xβ}}{=}
\end{aligned}
$$

## codes

```python

```

## 4. Math-Mode Fonts 2.2

$$
\mathrm{ABC abc}
\\
\mathit{abc}
\\
\mathbf{abc}
\\
\operatorname{abc}
$$

### 4.1. \operatorname and \mathrm

\
$\sin x + \sin(x+y) + a\sin z$

\
$\mathrm{sin} x + \mathrm{sin}(x+y) + a\mathrm{sin}z$

\
$\operatorname{sin} x + \operatorname{sin}(x+y) + a\operatorname{sin}z$

\
$\operatorname{pre-norm}(\mathbf{v})$

$\mathrm{pre-norm}(\mathbf{v})$

> Generally ,we can use \operatorname as standard
> When it goes to the text we use `\mathop`,which is preferable.

$\mathop{sin} x + \mathop{sin}(x+y) + a\mathop{sin}z$

$$
F(i)=\mathop{\sum y{(1)},y{(2)} , \cdots , y^{(m)}} \limits_{1 \cdots m}
\\
F(i)=\mathop{\sum y{(1)},y{(2)} , \cdots , y^{(m)}} \limits^{1 \cdots m}
$$

## 5. blankspace

- 1. \\

$$
\begin{equation}
\begin{split}

a+b=1\\
c+d=2

\end{split}
\end{equation}
$$

> $\mathit{Notes\ below\ by\ Xavier\ Yang:}$

## 6. Simple linear regression

It is a very straightforward simple linear regression approach for predicting a quantitative response Y on the basis of a single predictor variable X. It assumes that there is approximately a linear relationship between $X$ and $Y$. Mathematically, we can write this linear relationship as:

$$
Y ≈ β_0 + β_1X
$$

We will sometimes describe (3.1) by saying that we are regressinsg Y on X (or Y onto X).

### 6.1. Important assumptions in simple linear regression

- Linear relationship between $X$ & $Y$
- Error terms are Normal $ϵ ∼ N(μ=0, σ^2)$
- Variance of errors, $ϵ$,  is same for all values of $X$ (homoscedasticity)

## 7. Estimating the Coefficients

The goal is to obtain coefficients such that the linear model fits
the data well - _i.e._ as close as possible to the data points. The most common approach involves minimising the **least squares** criterion.

We let

$$
e_i = y_i − ŷ_i
$$

which represents the ith **residual**. The **residual sum of squares** or **RSS** is the sum of the squares of each of these residuals.

An example in R - we generate a our predictions base on $f(x)+e$, and also have a "guess" at an $\hat{f}(x)$. We calculate our $y_i$, and then calculate the RSS.

### 7.1. RSS:Residual Sum of Squares

$$
\mathrm{RSS}=e_{1}^{2}+e_{2}^{2}+⋯+e_{n}^{2}
$$

or equivalently as

$$
\operatorname{RSS}=\left(y_{1}-\hat{β}_{0}-\hat{β}_{1} x_{1}\right)^{2}+\left(y_{2}-\hat{β}_{0}-\hat{β}_{1} x_{2}\right)^{2}+\ldots+\left(y_{n}-\hat{β}_{0}-\hat{β}_{1} x_{n}\right)^{2}
$$

### 7.2. TSS

### 7.3. MSE

### 7.4. $R^2$

$$
R^2 =
\frac{TSS - RSS}{TSS} =
1 - \frac{RSS}{TSS} =
1-\frac{\text { Unexplained Variation }}{\text{ Total Variation }}
$$

$R^2$ proportion of total variation accountedfor by the independent variables in themodel.

- $0 ≤ R^2 ≤ 1$
- $R^2$ is correlation between predicted andobserved outcomes

### 7.5. P-value

比如不加 \mathrm 的 ABCDEFGabcdefg 如下所示：\mathrm{RSS [ABCDEFGabcdefg]

加了 \mathrm{ABCDEFGabcdefg} 如下所示： [\mathrm{ABCDEFGabcdefg}]
