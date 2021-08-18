# 1. Chap 5 Resampling Methods

Resampling methods:

Resampling methods are an indispensable tool in modern statistics. They involve repeatedly drawing samples from a training set and refitting a model of interest on each sample in order to obtain additional information about the fitted mode.

Two most commonly used methods:

- Cross-Validation

- Bootstrap

$\textit{Cross-Validation}$ can be used to estimate the test error associated with a given statistical learning method in order to evaluate its performance, or to select the appropriate level of flexibility. Including: The Validation Set Approach,Leave-One-Out Cross-Validation and k-Fold Cross-Validation.

The $Bootstrap$ is used in several contexts, most commonly model selection to provide a measure of accuracy of a parameter estimate or of a given statistical learning method.

**Model assessment and selection**

The process of **evaluating a model’s performance** is known as **model assessment**, whereas model assessment the process of selecting the proper level of flexibility for a model is known as **model selection**.

## 1.1. Cross-Validation

### 1.1.1. The Validation Set Approach

The Validation Set Approach **randomly** dividing the available set of observations into**two parts**, **a training set and a validation set or hold-out set**.

The validation set approach is conceptually simple and is easy to implement. But it has two potential drawbacks:

- the validation **estimate of the test error rate can be highly variable**, depending on precisely which observations are included in the training set and which observations are included in the validation set.

- In the validation approach, **only a subset of the observations—those that are included in the training set** rather than in the validation set—are used to fit the model.

### 1.1.2. k-Fold Cross-Validation

I rearranged the order of the notes, since $LOOCV$ is the special case of $\textit{k-fold Cross Validation}$.

This approach involves randomly $\textit{k-fold CV}$ dividing the set of observations into $k$ groups, or folds, of approximately equal size. The first fold is treated as a validation set, and the method is fit on the remaining $k − 1$ folds. The mean squared error, $MSE_1$, is then computed on the observations in the held-out fold. This procedure is repeated $k$ times; each time, a different group of observations is treated as a validation set. This process results in k estimates of the test error, $MSE_1,MSE_2,⋯,MSE_k$.

<img src= https://pic3.zhimg.com/80/v2-b4cd20adb8d216dc3ce138cfde48d8be_1440w.jpg>

The $\textit{k-fold CV}$ estimate is computed by averaging these values:

$$
CV_{(n)} = \frac{1}{k}∑_{i=1}^kMSE_i
\tag{5.3}
$$

We can see that the $LOOCV$ is one of the $k-fold$ method when $k=n$.In practice ,one typically performs $\textit{k-fold CV}$ using $k = 5$ or $k = 10$.

The advantage of $k-fold$

- Easy to compute

- Bias-Variance Trade-Off for k-Fold Cross-Validation. As these values have been shown empirically to yield test error rate estimates that suffer **neither** from excessively high bias nor from very high variance.

## 1.2. Leave-one-out cross-validation (LOOCV)

Special case of $\textit{k-fold Cross Validation}$, as $k=n$.There is**just one observation** used for validation the remaining observations maked up the training set.

Assuming we have $n$ observations,the statistical learning method is fit on the $n − 1$ training observations, and a prediction $\hat{y}_1$ is made for the excluded observation, using its value $x_1$. Since $(x_1, y_1)$ was not used in the fitting process,$MSE_1 = (y_1 - \hat{y}_1)^2$,provides an approximately unbiased estimate for the test error.

We can repeat the procedure by selecting $(x_2, y_2)$ for the validation data, training the statistical learning procedure on the $n − 1$ observations ${(x_1, y_1), (x_3, y_3), . . . , (x_n, y_n)}$, and computing $MSE_2 = (y_2 - \hat{y}_2)^2$.

<img src=https://pic2.zhimg.com/80/v2-ed36f443aafbff838b69045d623d8ecd_1440w.jpg>

Repeating this approach n times produces n squared errors, $MSE_1,⋯,MSE_n$..The $LOOCV$ estimate for the test $MSE$ is the average of these $n$ test error estimates:

$$
CV_{(n)} = \frac{1}{n}∑_{i=1}^nMSE_i
\tag{5.1}
$$

Advantage of LOOCV

- it has far less bias.Repeatedly fit the statistical learning method using training sets almost as many as are in the entire data set.

- Performing LOOCV multiple times will always yield the same results: there is no randomness in the **training/validation set splits**.

Disadvantage of LOOCV

- Heavy computation when $n$ is very large.

> Based upon a single observation $(x_1, y_1)$, The estimation is **highly variable**.

## CV on Classification Problem

As we have seen previously, the training error tends to decrease as the flexibility of the fit increases. (The figure indicates that though the training error rate doesn’t quite decrease monotonically, it tends to decrease on the whole as the model complexity increases.)

In contrast, the test error displays a characteristic U-shape. The 10-fold CV error rate provides a pretty good approximation to the test error rate.

While it somewhat underestimates the error rate, it reaches a minimum when fourth-order polynomials are used, which is very close to the minimum of the test curve, which occurs when third-order polynomials are used. In fact, using fourth-order polynomials would likely lead to good test set performance, as the true test error rate is approximately the same for third, fourth, fifth, and sixth-order polynomials.

### Taylor Expansion

As we discussed above, we would like to introduce the Taylor Series Expansion:

The Taylor series of a real or complex-valued function $f (x)$ that is infinitely differentiable at a real or complex number $a$ is the power series:

$$
f(x) = f(a) + \frac{f'(a)}{1!}(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + ⋯,
$$

When we use high order expansion, the unknown $f(x)$ would be better fitted.

Compare the taylor expansion and the highorder poynomials fit.

## 1.3. Bootstrap

The bootstrap is a widely applicable and extremely powerful statistical tool bootstrap that can be used to quantify the uncertainty associated with a given estimator or statistical learning method.

Bootstrap method samples data from the original dataset **with replacement**, the new sampled dataset is Bootstrap DataSet: $Z^{*B}$, which has **the same sample volume $n$**, but different means $μ$.

It allows duplicate observations in the same bootstraped dataset, then estimate the the $SE(\hat{α})$ of the model.

Suppose that we wish to invest a fixed sum of money in two financial assets that yield returns of $X$ and $Y$ , respectively, where $X$ and $Y$ are random quantities. We will invest a fraction $α$ of our money in $X$, and will invest the remaining $1 − α$ in $Y$ . Since there is variability associated with the returns on these two assets, we wish to choose α to minimize the total risk, or variance, of our investment. In other words, we want to minimize $Var(αX + (1 - α)Y)$. One can show that the value that minimizes the risk is given by

$$
α = \frac{σ_Y^2 - σ_{XY}}{σ_X^2 + σ_Y^2 - 2σ_{XY}}
\tag{5.6}
$$

where: $σ_X^2=Var(X),σ_Y^2=Var(Y),σ_{XY}=Cov(X,Y)$. In reality, the quantities $σ_X,σ_Y,σ_{XY}$ are unknown，We can then estimate the value of α that minimizes the variance of our investment using:

$$
\hat{α }= \frac{\hat{σ}_Y^2 - \hat{σ}_{XY}}{\hat{σ}_X^2 + \hat{σ}_Y^2 - 2\hat{σ}_{XY}}
\tag{5.7}
$$

In practice, the procedure for estimating $SE(\hat{α})$ can not be applied, because for real data we cannot generate new samples from the original population. However, the bootstrap approach allows us to use a computer to emulate the process of obtaining new sample sets,so that we can estimate the variability of $\hat{α}$ without generating additional samples. Rather than repeatedly obtaining independent data sets from the population, we instead obtain distinct data sets by repeatedly sampling observations from the original data set.

Suppose we have $n=3$ observations, the original data set is $Z$, then we randomly select n observations from the data set in order to produce a bootstrap data set $Z^{*1}$. The sampling is performed **with replacement**, which means that the replacement same observation can occur more than once in the bootstrap data set. In this example, $Z^{*1}$ contains the third observation twice, the first observation once, and no instances of the second observation. Note that if an observation is contained in $Z^{*1}$, then both its $X$ and $Y$ values are included. We can use $Z^{*1}$ to produce a new bootstrap estimate for $α$, which we call $α^{,*1}$. This procedure is repeated $B$ times for some large value of $B$, in order to produce B different bootstrap data sets,$Z^{*1},Z^{*2},⋯,Z^{*B}$, and $B$ corresponding $α$ estimates, $α^{,*1},α^{*2},⋯,α^{*B}$. We can compute the standard error of these bootstrap estimates using the formula:

$$
SE_B(\hat{α}) = √{\frac{1}{B -1 }∑_{r=1}^B(\hat{α}^{*r} - \frac{1}{B}∑_{r'=1}^B\hat{α}^{*r'})^2}
\tag{5.8}
$$

<img src="https://pic1.zhimg.com/80/v2-0c8d156275837dff4dfff3232a1e8a1c_1440w.jpg">
bootstrap

### 1.3.1. 引导聚集算法 (Bagging-Boostrap aggregating)

#### 1.3.1.1. chap 8.2
