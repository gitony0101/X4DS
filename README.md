# X4DS

This repo is a collection of **Python** & **Julia** port of codes in the following excellent R & Py books:

- [An Introduction to Statistical Learning](https://www.statlearning.com/) (ISLR)
- [Hands-on Machine Learning with Scikit-Learn, Keras & TensorFlow](https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/) (HandsOnML2)

<table border="1">
  <thead>
    <tr>
      <td></td>
      <td>Python Stack</td>
      <td>Julia Stack</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Language <br />Version</td>
      <td>v3.9</td>
      <td>v1.7</td>
    </tr>
    <tr>
      <td>Data <br />Processing</td>
      <td><li>Pandas</li></td>
      <td>
        <li>DataFrames</li>
      </td>
    </tr>
    <tr>
      <td>Visualization</td>
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
      <td>Machine<br />Learning</td>
      <td>
        <li>Scikit-Learn</li>
      </td>
      <td>
        <li>MLJ</li>
      </td>
    </tr>
    <tr>
      <td>
        Probablistic<br />
        Programming
      </td>
      <td>
        <li>PyMC</li>
      </td>
      <td><li>Turing</li></td>
    </tr>
  </tbody>
</table>

## Basics

- [Matplotlib](https://nbviewer.jupyter.org/github/gitony0101/X4DS/blob/main/matplotlib.ipynb)
- [Pandas](https://nbviewer.jupyter.org/github/gitony0101/X4DS/blob/main/pandas.ipynb)
- [NumPy](https://nbviewer.jupyter.org/github/gitony0101/X4DS/blob/main/numpy.ipynb)

## Series

- [ISLR-Py](https://nbviewer.org/github/gitony0101/X4DS/tree/main/ISLR/)
- [HandsOnML2](https://nbviewer.org/github/gitony0101/X4DS/tree/main/HandsOnML2/)
- [ML-Notes](https://nbviewer.org/github/gitony0101/X4DS/tree/main/Notes/)

## Code Styles

### Basics

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

### Matplotlib

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

- prefer `axes.flatten()` over `plt.subplot()` in cases where subplots' data is iterable
- prefer `zip()` or `enumerate()` over `range()` for iterable objects

```python
# good
_, ax = plt.subplots(2, 2, figsize=[12,8],constrained_layout=True)

for ax, x, y in zip(axes.flatten(), xs, ys):
  ax.plot(x, y)

# bad
for i in range(4):
  ax = plt.subplot(2, 2, i+1)
  ax.plot(x[i], y[i])
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

### Pandas

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

- prefer `\underset{}{}` over `\underset{}`

```latex
$$
\underset{θ}{\mathrm{argmax}}\ p(x_i|θ)
$$
```

### Expressions

- prefer `^{\top}` over `^T` for transpose

$$
𝐀^⊤
$$

```latex
$$
𝐀^{\top}
$$
```

- prefer `\to` over `\rightarrow` for limit

$$
\lim_{n → ∞}
$$

```latex
$$
\lim_{n\to \infty}
$$
```

- prefer `underset{}{}` over `\limits_`

$$
\underset{w}{\rm argmin}\ (wx +b)
$$

```latex
$$
\underset{w}{\rm argmin}\ (wx +b)
$$
```

### Fonts

- prefer `\mathrm` over `\mathop` or `\operatorname`

```latex
$$
θ_{\mathrm{MLE}}=\underset{θ}{\mathrm{argmax}}\ ∑_{i = 1}^{N}\log p(x_i|θ)
$$
```

## References

- [ISL-python](https://github.com/a-martyn/ISL-python)
- [ISLR.jl](https://github.com/tndoan/ISLR.jl)
- [handson-ml2](https://github.com/ageron/handson-ml2)

<details>
  <summary>style</summary>
  <style>
    table {
      border-collapse: collapse;
      text-align: center;
    }
  </style>
</details>
