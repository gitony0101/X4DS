# X4DS

**Python** & **Julia** port of codes in the following excellent R books (including exercises):

- [An Introduction to Statistical Learning](https://www.statlearning.com/) (ISLR)
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

### basics

- use `enumerate()` rather than `range(len())`

```python
xs = range(3)

# good
for ind, x in enumerate(xs):
  print(f'{ind}: {x}')

# bad
for i in range(len(xs)):
  print(f'{i}: {xs[i]}')
```

### matplotlib

- use `Axes` object rather than `Figure` object

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

- use `set()` method rather than `set_*()` method

```python
# good
ax.set(xlabel='x', ylabel='y')

# bad
ax.set_xlabel('x')
ax.set_ylabel('y')
```

## References

- https://github.com/a-martyn/ISL-python
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
