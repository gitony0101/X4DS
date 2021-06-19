import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import sem
import numpy as np

orders_45d = pd.read_csv('../data/orders_45d.csv',
                         parse_dates=['purchase_time', 'purchase_date'])

orders_mean = orders_45d.groupby('purchase_date').quantity.mean()
orders_se = orders_45d.groupby('purchase_date').quantity.apply(sem).mul(1.96)

x = [d.date().strftime('%Y-%m-%d') for d in orders_mean.index]

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

ax.plot(x, orders_mean, color='white', lw=2)
ax.fill_between(x,
                orders_mean - orders_se,
                orders_mean + orders_se,
                color='#3F5D7D')

ax.spines['top'].set_alpha(0)
ax.spines['bottom'].set_alpha(1)
ax.spines['right'].set_alpha(0)
ax.spines['left'].set_alpha(1)

ax.set_ylabel('# Daily Orders', fontsize=12)
ax.set_xticks(np.arange(0, len(x), 5))
ax.set_title(
    'Daily Order Quantity of Brazilian Retail with Error Bands (95% confidence)',
    fontsize=20)

s, e = ax.get_xlim()
ax.set_xlim(s, e - 2)
ax.set_ylim(4, 10)

for y in range(5, 10, 1):
    plt.hlines(y,
               xmin=s,
               xmax=e,
               colors='black',
               alpha=0.5,
               linestyles='--',
               lw=0.5)

plt.show()
