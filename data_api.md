# 数据分析 API

## 1. NumPy

### 1.1. 生成、类型

- generation
  - `zeros()`, `zeros_like()`
  - `ones()`, `ones_like()`
  - `full()`, `full_like()`
  - `empty()`, `empty_like()`
  - `eye()`
  - `identity()`
  - `repeat()`, `tile()`

- numpy.random
  - `rand()`：均匀分布
  - `randn()`：标准
  - `randint()`：随机生成整数
  - `normal()`
  - `binomial()`
  - `seed()`
  - `permutation()`, `shuffle()`

- types
  - `array(list)`
  - `asarray()`
  - `asmatrix()`
  - `asscalar()`

### 1.2. 查询、索引

- indeces
  - `take()`, `put()`

- inquery
  - `where(cond, xarr, yarr)`: x if condition else y
  - `searchsorted()`
  - `isnan()`
  - `isfinite()`, `isinf()`

### 1.3. 排序、变换

- rank
  - `sort()`
  - `argsort()`
  - `lexsort()`

- ndarray
  - `dtype`
  - `shape`
  - `ndim`
  - `T`
  - `astype()`
  - `reshape()`
  - `transpose()`
  - `swapaxes()`

- reshaping
  - `concatenate()`
  - `hstack()`, `vstack()`, `dstack()`
  - `row_stack()`, `column_stack()`
  - `split()`
  - `hsplit()`, `vsplit()`, `dsplit()`
  - `r_()`, `c_()`

### 1.4. 计算

- computation
  - `dot()`：内积，矩阵乘法
  - `power()`
  - `add()`, `substract()`, `multiply()`, `divide()`, `mod()`
  - `abs()`, `fabs()`
  - `sqrt()`, `square()`
  - `exp()`, `log()`, `log2()`, `log10()`, `log1p()`
  - `ceil()`, `floor()`
  - `sign()`
  - `maximum()`, `fmax()`, `minimum()`, `fmin()`

- set operation
  - `unique()`
  - `interset1d()`, `union1d()`
  - `in1d()`
  - `setdiff1d()`, `setxor()`

- numpy.linalg
  - `inv()`, `pinv()`
  - `qr()`, `svd()`
  - `eig()`， eigvals()`
  - `trace()`, `det()`
  - `solve()`, `lstsq()`

## 2. Pandas

### 2.1. 生成

- Series
- `Series()`
- `values`
- `index`, `index.name`
- `name`

- DataFrame
  - `DataFrame()`
  - `values`
  - `index`, `index.name`
  - `columns`, `columns.name`
  - `T`
  - `head()`, `tail()`

### 2.2. 查询、索引

- Index
  - `Index()`
  - `append()`, `drop()`
  - `insert()`, `delete()`
  - `unique()`
  - `intersection()`, `union()`
  - `difference()`
  - `reindex()`
  - `reset_index()`

- selection, column
  - `df[cond]`
  - `df[[*col_name]]`
  - `df.loc[col_name]`, `df.loc[:, col_name]`
  - `df.iloc[ind]`, `df.iloc[:, ind]`

- inquery
  - `isin()`, `notin()`

### 2.3. 排序、归纳、清洗

- rank
  - `sort_index()`
  - `sort_values()`

- summary
  - `describe()`
  - `unique()`
  - `value_counts()`

- problem values
  - `dropna()`
  - `fillna()`
  - `isnull()`, `notnull()`
  - `duplicate()`
  - `drop_duplicates()`

- numerical modification
  - `df.apply(func)`
  - `series.replace()`
  - `series.map(func)`
  - `drop()`

- colums
  - `rename()`

- strings
  - `series.str.func()`

### 2.4. 重塑

- df operation
  - `df.add()`, `df.sub()`, `df.mul()`, `df.div()`
  - `df.floordiv()`, `df.pow()`

- hierarchical indexing
  - `stack()`, `unstack()`
  - `swaplevel()`

- connectioin
  - `concat()`
  - `join()`
  - `merge()`

- rotate
  - `pivot()`
  - `melt()`

- grouping
  - `groupby()`
    - `agg()`
  - `cut()`, `qcut()`
  - `pivot_table()`
  - `crosstab()`

### 2.5. 时间序列

- data-time
  - `date_range()`
  - `Period()`
  - `PeriodIndex()`
  - `period_range()`
  - `ts.to_period()`
  - `ts..to_timestamp()`

- move
  - `ts.shift()`
  - `ts.rollforward()`
  - `ts.rollback()`

- resampling
  - `ts.resample()`
    - `ohlc()`
    - `expanding()`
  - `ts.rolling()`
  - `ewm()`
  - `pct_change()`

### 2.6. 分类数据

- categorial data
  - `Categorical()`
  - `get_dummies()`

## 3. Statsmodels

## 4. Basics

- debugging
  - `assert`
