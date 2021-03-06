# 1. Chap 5 重抽样方法

重采样方法（resampling methods）：

重采样方法指重复地从训练集中选取数据进行拟合，以得到拟合模型的更多信息。主要有：

- 交叉验证法（Cross-Validation）

- 自助法（bootstrap）

交叉验证法可以用于评估测试误差或者选取合适的灵活度（flexibility），自助法多用于评估参数估计的准确性。

交叉验证法，包括校验集方法（The Validation Set Approach），留一法（Leave-One-Out Cross-Validation），k 折交叉验证（k-Fold Cross-Validation）

## 1.1. 交叉验证法

### 1.1.1. 校验集方法 The Validation Set Approach

交叉验证法指的是将观测数据随机地分成训练集（training set）和校验集（validation set）两部分。训练集用于拟合模型，校验集用于测试拟合模型的效果好坏。 校验集方法的优点是概念简单，容易实施。缺点主要有两点：由于划分的随机性，校验集上得到的测试误差估计，可能会有很高的差异只有一部分数据用于训练，可能高估测试误差。

### 1.1.2. k 折交叉验证法 k-Fold Cross-Validation

我调了一下位置顺序，留一法是 K-fold 的特例

k 折交叉验证将观测数据随机地分成大小差不多的 $k$ 组，首先将第一组作为校验集，其余 $k-1$ 组作为训练集，得到一个$MSE_1$；然后将第二组作为校验集，其余 $k-1$组作为训练集，得到一个$MSE_2$ ；重复操作，得到一组$MSE_1,MSE_2,⋯,MSE_k$。

<img src= https://pic3.zhimg.com/80/v2-b4cd20adb8d216dc3ce138cfde48d8be_1440w.jpg>

用 k 折交叉验证得到的对测试$MSE$的估计可以用下式表示:

$$
CV_{(n)} = \frac{1}{k}∑_{i=1}^kMSE_i
\tag{5.3}
$$

可以看到，留一法是 $k=n$ 的特殊情况。实际问题中，$k$通常选取为 5 或者 10。

k 折交叉验证的优点是:

- 便于计算

- 在偏差方差权衡中，方差较小

## 1.2. 留一法 Leave-one-out cross-validation (LOOCV)

k 折交叉验证法特例：$k=n$,将观测数据分为训练集和校验集两部分，

只有**一个数据**用于校验集，其余数据用于训练集。

假如有 $n$个观测数据，留一法重复进行了$n$次校验集方法的操作，每次的校验集均不相同，可以得到 $n$ 个$MSE$。
<img src=https://pic2.zhimg.com/80/v2-ed36f443aafbff838b69045d623d8ecd_1440w.jpg>
$$留一法$$

用留一法得到的对测试 $MSE$ 的估计可以用下式表示:

$$
CV_{(n)} = \frac{1}{n}∑_{i=1}^nMSE_i
\tag{5.2}
$$

留一法的优点是

- 采用平均，得到的偏差很小

- 没有不确定性，总是得到一个固定的数值

留一法的缺点是

- 在 $n$很大的情况下，计算量大
- 在偏差方差权衡中，可能有较高的方差

## 1.3. 自助法

自助法是一类应用很广的统计方法，可以用来定量化参数估计或者统计学习方法的不确定性。自助法重复地从原数据集中采样,自助法数据集（Bootstrap DataSet: $Z^{*B}$）和原数据集样本容量$n$相同，但是均值$μ$不同,这里采样是**可放回的（with replacement）**，可以允许有同样的样本出现，然后用得到的样本进行参数估计。

举一个例子来说明自助法的应用。假设有$X$和 $Y$两种不同的金融资产，现要对 $X$和 $Y$ 进行投资，使得总风险最小。假设有 $α$ 投给了$X$， $(1 - α)$ 投给了$Y$，那么总风险就是 $Var(αX + (1 - α)Y)$。可以证明，当：

$$
α = \frac{σ_Y^2 - σ_{XY}}{σ_X^2 + σ_Y^2 - 2σ_{XY}}
\tag{5.6}
$$

时，总风险最小，这里：$σ_X^2=Var(X),σ_Y^2=Var(Y),σ_{XY}=Cov(X,Y)$,实际问题中，$σ_X,σ_Y,σ_{XY}$都是未知的，可以用原数据得到他们的估计：

$$
\hat{α }= \frac{\hat{σ}_Y^2 - \hat{σ}_{XY}}{\hat{σ}_X^2 + \hat{σ}_Y^2 - 2\hat{σ}_{XY}}
\tag{5.7}
$$

自助法旨在估计标准差$SE(α)$:
假设总共有$n=3$个观测数据，原数据集记作为$Z$。我们先**随机有放回地选择** $n$ 个数据，得到一个新的数据集记作 $Z^{*1}$（如下图 ），然后用 $Z^{*1}$得到 $α$ 的一个估计，记作$α^{*1}$。再将该操作重复 $B$ 次，得到数据集 $Z^{*1},Z^{*2},⋯,Z^{*B}$，还有 $α$ 的估计$α^{,*1},α^{*2},⋯,α^{*B}$ ，那么 $SE(α)$ 就可以用下式来估计：

$$
SE_B(\hat{α}) = √{\frac{1}{B -1 }∑_{r=1}^B(\hat{α}^{*r} - \frac{1}{B}∑_{r'=1}^B\hat{α}^{*r'})^2}
\tag{5.8}
$$

<img src="https://pic1.zhimg.com/80/v2-0c8d156275837dff4dfff3232a1e8a1c_1440w.jpg">
bootstrap

### 1.3.1. 引导聚集算法 (Bagging-Boostrap aggregating)

#### 1.3.1.1. chap 8.2
