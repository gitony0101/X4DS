import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

economics = pd.read_csv('../data/economics.csv', parse_dates=['date'])

x = np.arange(economics.shape[0])
y_returns = (economics.psavert.diff().fillna(0) /
             economics.psavert.shift(1)).fillna(0) * 100

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

ax.fill_between(x[1:],
                y_returns[1:],
                0,
                where=y_returns[1:] >= 0,
                facecolor='green',
                interpolate=True,
                alpha=0.7)

ax.fill_between(x[1:],
                y_returns[1:],
                0,
                where=y_returns[1:] <= 0,
                facecolor='red',
                interpolate=True,
                alpha=0.7)

plt.annotate('Peak \n1975',
             xy=(94.0, 21.0),
             xytext=(88.0, 28),
             bbox=dict(boxstyle='square', fc='firebrick'),
             arrowprops=dict(facecolor='steelblue', shrink=0.05),
             fontsize=15,
             color='white')

xtickvals = [
    str(m)[:3].upper() + '-' + str(y)
    for y, m in zip(economics.date.dt.year, economics.date.dt.month_name())
]

ax.set_xticks(x[::6])
ax.set_xticklabels(xtickvals[::6],
                   rotation=90,
                   fontdict={
                       'horizontalalignment': 'center',
                       'verticalalignment': 'center_baseline'
                   })
ax.set(xlim=(1, 100), ylim=(-35, 35))
ax.set_title('Month Economics Return %', fontsize=22)
ax.set_ylabel('Monthly returns %')
ax.grid(alpha=0.5)
plt.show()
