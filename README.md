# X4DS

**Python** & **Julia** port of codes in the following excellent R books (including exercises):

- [An Introduction to Statistical Learning](https://www.statlearning.com/) (ISLR)
- [Introduction To Probability](https://www.crcpress.com/Introduction-to-Probability-Second-Edition/Blitzstein-Hwang/p/book/9781138369917) (ITP)
- [Statistical Rethinking](https://xcelab.net/rm/statistical-rethinking/) (SRT)

> **Tidyverse** port also will be included.

<table border="1">
  <thead>
    <tr>
      <td></td>
      <td></td>
      <td>Python Stack</td>
      <td>Julia Stack</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2">Language Version</td>
      <td>v3.9</td>
      <td>v1.6</td>
    </tr>
    <tr>
      <td rowspan="2">Data <br />Processing</td>
      <td>Basic</td>
      <td><li>Pandas</li></td>
      <td><li>StatsKit</li></td>
    </tr>
    <tr>
      <td>Enhanced</td>
      <td><li>PyJanitor</li></td>
      <td><li>DataFramesMeta</li></td>
    </tr>
    <tr>
      <td rowspan="2">Visualization</td>
      <td>Basic</td>
      <td>
        <li>Matplotlib</li>
        <li>Seaborn</li>
      </td>
      <td>
        <li>MakiE</li>
        <li>AlgebraOfGraphics</li>
      </td>
    </tr>
    <tr>
      <td>Enhanced</td>
      <td><li>Yellowbrick</li></td>
      <td></td>
    </tr>
    <tr>
      <td>Machine<br />Learning</td>
      <td>Basic</td>
      <td>
        <li>Scikit-Learn</li>
        <li>MLXtend</li>
      </td>
      <td>
        <li>MLJ</li>
        <li>Clustering</li>
      </td>
    </tr>
    <tr>
      <td>
        Probablistic<br />
        Programming
      </td>
      <td>Basic</td>
      <td>
        <li>PyMC3</li>
        <li>Bambi</li>
      </td>
      <td><li>Turing</li></td>
    </tr>
  </tbody>
</table>

## Code Styles

### 2.1. Basics

- prefer `enumerate()` over `range(len())`

```python
xs = range(3)

# good
for ind, x in enumerate(xs):
  print(f'{ind}: {x}')

# bad
for i in range(len(xs)):
  print(f'{i}: {xs[i]}')
```

### 2.2. Matplotlib

including seaborn

- prefer `Axes` object over `Figure` object
- use `constrained_layout=True` when draw subplots

```python
# good
_, axes = plt.subplots(1, 2, constrained_layout=True)
axes[0].plot(x1, y1)
axes[1].hist(x2, y2)

# bad
plt.subplot(121)
plt.plot(x1, y1)
plt.subplot(122)
plt.hist(x2, y2)
```

- prefer `set()` method over `set_*()` method

```python

# good
ax.set(xlabel='x', ylabel='y')

# bad
ax.set_xlabel('x')
ax.set_ylabel('y')
```

- Prefer `despine()` over `ax.spines[*].set_visible()`

```python
# good
sns.despine()

# bad
ax.spines["top"].set_visible(False)
ax.spines["bottom"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)
```

- prefer `dpi` over `figsize` in cases where the number of subplots is less than 3

```python
# good
_, ax = plt.subplots(dpi=100)

# bad
_, ax = plt.subplots(figsize=(10, 8))
```

### 2.3. Pandas

- prefer `df['col']` over `df.col`

```python
# good
movies['duration']

# bad
movies.duration
```

- prefer `df.query` over `df[]` or `df.loc[]` in simple-selection

```python
# good
movies.query('duration >= 200')

# bad
movies[movies['duration'] >= 200]
movies.loc[movies['duration'] >= 200, :]
```

- prefer `df.loc` and `df.iloc` over `df[]` in multiple-selection

```python
# good
movies.loc[movies['duration'] >= 200, 'genre']
movies.iloc[0:2, :]

# bad
movies[movies['duration'] >= 200].genre
movies[0:2]
```

## LaTeX Styles

### Multiple lines

Reduce the use of `begin{array}...end{array}`

- equations: `begin{aligned}...end{aligned}`

```latex
$$
\begin{aligned}
y_1 = x^2 + 2*x \\
y_2 = x^3 + x
\end{aligned}
$$
```

- equations with conditions: `begin{cases}...end{cases}`

```latex
$$
\begin{cases}
y = x^2 + 2*x & x > 0 \\
y = x^3 + x & x ≤ 0
\end{cases}
$$
```

- matrix: `begin{matrix}...end{matrix}`

```latex
$$
\begin{vmatrix}
  a + a^′ & b + b^′ \\ c & d
  \end{vmatrix}= \begin{vmatrix}
  a & b \\ c & d
  \end{vmatrix} + \begin{vmatrix}
  a^′ & b^′ \\ c & d
\end{vmatrix}
$$
```
  
### Brackets

- prefer `\Bigg...\Bigg` over `\left...\right`


```latex
$$
A\Bigg[v_1\ v_2\ ⋯\ v_r\Bigg]
$$
```

## Fundamental Exercises

* [Matplotlib-Seaborn](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/FundamentalEx/mpl50_sns.ipynb)
* [Pandas](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/FundamentalEx/pandas.ipynb)

## ISLR

* [Chapter 02 - Statistical Learning](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/ISLR/Ch02%20-%20Statistical%20Learning.ipynb)
* [Chapter 03 - Linear Regression](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/ISLR/Ch03%20-%20Linear%20Regression.ipynb)
* [Chapter 04 - Classification](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/ISLR/Ch04%20-%20Classification.ipynb)
* [Chapter 05 - Resampling Methods](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/ISLR/Ch05%20-%20Resampling%20Methods.ipynb)
* [Chapter 06 - Linear Model Selection and Regularization](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/ISLR/Ch05%20-%20Resampling%20Methods.ipynb)
* [Chapter 07 - Moving Beyond Linearity](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/ISLR/Ch07%20-%20Moving%20Beyond%20Linearity.ipynb)
* [Chapter 08 - Tree Based Methods](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/ISLR/Ch08%20-%20Tree-Based%20Methods.ipynb)
* [Chapter 09 - Support Vector Machines](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/ISLR/Ch09%20-%20Support%20Vector%20Machines.ipynb)
* [Chapter 10 - Unsupervised Learning](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/ISLR/Ch10%20-%20Unsupervised%20Learning.ipynb)

## ITP

* [Chapter 01 - Probability and Counting](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch1.ipynb) 
* [Chapter 02 - Conditional Probability](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch2.ipynb)
* [Chapter 03 - Random Variables and their Distributions](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch3.ipynb)
* [Chapter 04 - Expectation](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch4.ipynb)
* [Chapter 05 - Continuous Random Variables](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch5.ipynb)
* [Chapter 06 - Moments](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch6.ipynb)
* [Chapter 07 - Joint Distributions](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch7.ipynb)
* [Chapter 08 - Transformations](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch8.ipynb)
* [Chapter 09 - Conditional Expectation](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch9.ipynb)
* [Chapter 10 - Inequalities and Limit Theorems](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch10.ipynb)
* [Chapter 11 - Markov Chains](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch11.ipynb)
* [Chapter 12 - Markov Chain Monte Carlo](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch12.ipynb)
* [Chapter 13 - Poisson Processes](https://colab.research.google.com/github/gitony0101/X4DS/blob/main/IPT/Ch13.ipynb)

## References

- https://github.com/a-martyn/ISL-python
- https://github.com/buruzaemon/IntroductionToProbabilityPy
- https://github.com/tndoan/ISLR.jl

<details>
  <summary>style</summary>
  <style>
    table {
      border-collapse: collapse;
      text-align: center;
    }
  </style>
</details>
