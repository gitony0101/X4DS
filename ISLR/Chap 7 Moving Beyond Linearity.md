# 1. Chap 7: Moving Beyond Linearity

Linear models have its limitations in terms of predictive power.
Linear models can be extended simply as:

- $Polynomial\ regression$ extends the linear model by adding extra predictors, obtained by raising each of the original predictors to a power.
- $Step\ functions$ cut the range of a variable into $K$ distinct regions in order to produce a qualitative variable. This has the effect of fitting a $piecewise$ constant function.
- $Regression\ splines$ are more flexible than polynomials and step functions, and in fact, they are extensions of the two. They involve dividing the range of $X$ into $K$ distinct regions. Within each region, a polynomial function is fit to the data.

- $Smoothing\ splines$ are similar to regression splines, but **arise in a slightly different situation**. Smoothing splines result from minimizing a residual sum of squares criterion subject to a smoothness penalty.

- $Local\ regression$ is similar to splines, but differs in an important way.The regions are allowed to overlap, and indeed they do so in a very smooth way.

- $Generalized\ additive\ models(GAM)$ allow us to extend the methods above to deal with multiple predictors.

## 1.1. Polynomial Regression

Polynomial regression is the simplest method of extending linear regression. It involves adding extra predictors, which are just the original predictors raised to some exponent.That is, a standard linear regression model:

$$
y_i = β_0 + β_1x_i + ϵ_i
$$

can be replaced by a more generic polynomial function:

$$
y_i = β_0 + β_1x_i + β_2x_i^2 +  β_3x_i^3 + ⋯ + β_dx_i^d + ϵ_i,
\tag{7.1}
$$

where $ϵ_i$ is the $error\ term$.

This approach is known as **polynomial regression** and for large enough values of $d$, it can produce a highly non-linear curve. It is highly unusual to use $d$ greater than 3 or 4. The given model parameters can easily be estimated using linear least squares linear regression procedure. Similarly, polynomial functions can be modeled with the **logistic regression** as well：

$$
\mathop{Pr(y_i > y | x_i )} = \frac{exp(β_0 + β_1x_i + β_2x_i^2 +  β_3x_i^3 + ⋯ + β_dx_i^d)}{1 + exp(β_0 + β_1x_i + β_2x_i^2 +  β_3x_i^3 + ⋯ + β_dx_i^d)}.
\tag{7.3}
$$

## 1.2. Step Functions

Using polynomial functions of the features as predictors in a linear model imposes a global structure on the non-linear function of $X$.
We can instead use step functions in order to **avoid imposing such a global structure**. Here step function we break the range of $X$ **into bins**, and **fit a different constant in each bin.**

This amounts to converting a continuous variable into an ordered categorical variable. In greater detail, we create cutpoints $c_1, c_2,⋯ , c_K$ in the range of $X$, and then construct $K + 1$ new variables.

$$
\begin{aligned}
C_0(X) & = I(X<c_1)
\\ C_1(X) & = I(c_1 ≤ X < c_2)
\\ C_2(X) & = I(c_2 ≤ X < c_3)
\\ &  ⋮ \tag{7.4}
\\ C_{K-1}(X) & = I(c_{K-1} ≤ X < c_K)
\\ C_K(X) & = I(c_K ≤ X),
\end{aligned}
$$

where $I(⋅)$ is an $Indicator\ function$ that returns a $1$ if the condition is true and returns a $0$ otherwise.

After creating the **cutpoints**, least squares regression is used to fit a linear model that uses $C_1(X),C_2(X),⋯,C_K(X)$ as predictors:

$$
y_i = β_0 + β_1C_1(x_i) + β_2C_2(x_i) + ⋯ + β_KC_K(x_i) + ϵ_i.
\tag{7.5}
$$

Note that $C_0(X)$ is excluded as a predictor because it is redundant with the intercept. Additionally, for a given value of $X$, only one of the $C_K$​ values can be non-zero,We also fit the logistic regression model:

$$
\mathop{Pr(y_i > y | x_i )} = \frac{exp( β_0 + β_1C_1(x_i) + β_2C_2(x_i) + ⋯ + β_KC_K(x_i))}{1 + exp(β_0 + β_1C_1(x_i) + β_2C_2(x_i) + ⋯ + β_KC_K(x_i))}.
\tag{7.6}
$$

An example of a step function with cutpoints at 10 and 15 is shown in the following graph:
<img src=https://res.cloudinary.com/practicaldev/image/fetch/s--BVyUeFch--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1605462465349/pXYIQlZWw.png>

The step function is also known as a piecewise constant regression model.

## 1.3. Basis Functions

**Polynomial** and **piecewise** _constant models_ are special cases of a basis function approach. The basis function approach utilizes **a family of functions or transformations that can be applied to a predictor.** The model takes on the following form:

$$
y_i = β_0 + β_1b_1(x_i) + β_2b_2(x_i) + β_3b_3(x_i) ⋯ + β_Kb_K(x_i) + ϵ_i.
\tag{7.7}
$$

Note that the **basis functions** $b_1(·), b_2(·), ⋯ , b_K(·)$ are fixed and known (choose the functions ahead of time).

- For **polynomial regression**, the basis functions are $b_j(x_i) = x_i^j$

- For **piecewise constant functions** the basis functions are $b_j(x_i) = I(c_j ≤ x_i < c_{j+1})$.

Use least squares to estimate the unknown regression coefficients in (7.7) since We can think of (7.7) as a standard linear model with predictors $b_1(x_i), b_2(x_i), ⋯ , b_K(x_i)$. Moreover, all of the inference tools for linear models such as $standard\ errors$ and $F-statistics$ are available in this setting.

## 1.4. Regression Splines

Regression splines extend upon **polynomial regression** and **piecewise-constant regression**.

### 1.4.1. Piecewise Polynomials

Instead of fitting a high-degree polynomial over the entire range of $X$, piecewise polynomial regression involves **fitting separate low-degree polynomials** over **different regions** of $X.(piecewise\ polynomial\ regression)$：

$$
y_{i}= \begin{cases}
 β_{01}+β_{11} x_{i}+β_{21} x_{i}^{2}+ β_{31} x_{i}^{3}+ϵ_{i} & \text { if } x_{i} < c_1
 \\ β_{02}+β_{12} x_{i}+β_{22} x_{i}^{2}+β_{32} x_{i}^{3}+ϵ_{i} & \text { if } c_1 ≤ x_{i} < c_2
 \\  & ⋮
 \\β_{0\ K-1}+β_{1\ K-1} x_{i}+β_{2\ K-1} x_{i}^{2}+β_{3\ K-1} x_{i}^{3}+ϵ_{i} & \text { if } c_{K-1} ≤ x_{i} < c_K
 \\ β_{0K}+β_{1K} x_{i}+β_{2K} x_{i}^{2}+β_{3K} x_{i}^{3}+ϵ_{i} & \text { if }  x_{i} ≥ c_K
 \end{cases}
$$

An example of a piecewise polynomial regression model with one knot at X = 12 can be seen in the following graph:
<img src=https://res.cloudinary.com/practicaldev/image/fetch/s--fzPGhUMS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1605462508430/z-m6BG-0b.png>

As can be seen from the chart above, **piecewise polynomial models are discontinuous**.

While discontinuity can sometimes be desired, we usually want a continuous model. To solve this, we can introduce **constraints**, which result in continuous and smooth models.

### 1.4.2. Constraints and Splines

In order to produce **a piecewise polynomial model that is continuous**, we need to introduce a **continuity constraint.**

In other words, the **separate polynomial models must meet at the** $knots$. Introducing the continuity constraint on the previous chart might result in something like the following:

<img src=https://res.cloudinary.com/practicaldev/image/fetch/s--35Sdk6ze--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1605462522405/YyaucGfv6.png>

However, the point at which the functions join looks a bit unnatural. This can be addressed by introducing another constraint that results in a smooth join. **Specifically, this constraint requires that the derivatives up to degree (d-1) be continuous at each knot**. For example, if we have a cubic polynomial (d=3), then the first and second derivatives must be continuous at the knots.

A model that is continuous and smooth is known as a spline. Introducing the smoothness constraint on the previous chart might result in the following spline:

<img src=https://res.cloudinary.com/practicaldev/image/fetch/s--_fSWDLtO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.hashnode.com/res/hashnode/image/upload/v1605462533779/3_pvonryH.png>

<img src=https://web.stanford.edu/class/stats202/figs/Chapter7/7.3.png>

**Figure 7.3** – Various piecewise polynomials are fit to a subset of the Wage data, with a knot at age=50.

- Top Left: The cubic polynomials are unconstrained.
- Top Right: The cubic polynomials are constrained to be continuous at age=50.
- Bottom Left: The cubic polynomials are constrained to be continuous and smooth.
- Bottom Right: A linear spline is shown, which is constrained to be continuous.

### 1.4.3. The Spline Basis Representation

The regression splines that we just saw in the previous section may have seemed somewhat complex: how can we fit a piecewise $degree-d$ polynomial under the constraint that it $\textit{(and possibly its first d − 1 derivatives)}$ be continuous?

#### 1.4.3.1. Cubic splines

The most direct way to represent a cubic spline using (7.9) is to start off with a basis for **a cubic polynomial**—namely, $x, x^2, x^&—and then add one **truncated power basis function** per knot.
**A truncated power basis** function is defined as:

- Define a set of knots $ξ_1 <ξ_2 < ⋯ <ξ_𝐾$

- We want the function $f$ in $Y = f(X) + ϵ$ to:

  1.  Be a cubic polynomial between every pair of knots $ξ_i, ξ_{i+1}$.
  2.  Be $continuous$ at each $knot$.
  3.  Have $\text{continuous first and second derivatives}$ at each knot.

- It turns out, we can write $f$ in terms of $k + 3$ basis functions:

$$
f(x) = y_i = β_0 + β_1b_1(x_i) + β_2b_2(x_i) + β_3b_3(x_i) ⋯ + β_{K+3}b_{K+3}(x_i) + ϵ_i,
\tag{7.9}
$$

- Above，

$$
\mathop{h(x,ξ) = (x - ξ)_+^3 = }
\begin{cases}
(x - ξ)^3 & \text{if x > ξ}
\\ 0 & \text{otherwise}
\end{cases}
$$

where $ξ$ is the $knot$.

#### 1.4.3.2. Natural cubic splines

FIGURE 7.4. A cubic spline and a natural cubic spline, with three knots, fit to a subset of the Wage data.
<img src=https://web.stanford.edu/class/stats202/figs/Chapter7/7.4.png>

- Spline which is linear instead of cubic for $X < ξ_1, X > ξ_K$,
- The predictions are more stable for extreme values of $X$

### 1.4.2. Choosing the Number and Locations of Knots

- _Where to place the knots?_

  The regression spline is most flexible in regions that contain a lot of knots, because in those regions the polynomial coefficients can change rapidly. Hence, one option is to place more knots in places where we feel the function might vary most rapidly, and to place fewer knots where it seems more stable.

  While this option can work well, in practice it is common to place knots in a uniform fashion. One way to do this is to specify the desired degrees of freedom, and then have the software automatically place the **corresponding number of knots at uniform quantiles of the data**.

- _How many knots should we use, or equivalently how many degrees of freedom should our spline contain?_

  One option is to try out different numbers of knots and see which produces the best looking curve.

  A somewhat more objective approach is to **use cross-validation**. With this method, we remove a portion of the data (say 10 %), fit a spline with a certain number of knots to the remaining data, and then use the spline to make predictions for the held-out portion.

  We repeat this process multiple times until each observation has been left out once, and then compute the **overall cross-validated $RSS$**. This procedure can be repeated for different **numbers of knots $K$**. Then the value of $X$K giving the **smallest $RSS$** is chosen.

Choosing the number and locations of knots:
<img src=https://web.stanford.edu/class/stats202/figs/Chapter7/7.6.png>

- The locations of the knots are typically quantiles of $X$,
- The number of $knots\ K$ is chosen by $cross\ validation$.

### Comparison to Polynomial Regression

Regression splines often produce better results than polynomial regression models. This is because polynomial regression requires the use of a high-degree model to produce a very flexible fit. High-degree models usually lead to highly inaccurate predictions at certain X values. Splines produce flexible fits by introducing knots and separate low-degree functions, which ultimately results in better and stable predictions.

<img src=https://web.stanford.edu/class/stats202/figs/Chapter7/7.7.png>

Natural cubic splines vs. polynomial regression:

- Splines can fit complex functions with few parameters.

- Polynomials require high degree terms to be flexible.

- High-degree polynomials can be unstable at the edges

---
