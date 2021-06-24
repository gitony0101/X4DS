import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import sem

orders = pd.read_csv('../data/user_orders_hourofday.csv')
orders_mean = orders.groupby('order_hour_of_day').quantity.mean()
orders_se = orders.groupby('order_hour_of_day').quantity.apply(sem).mul(1.96)

x = orders_mean.index

fig, ax = plt.subplots(figsize=(12, 8), dpi=80)
ax.set_ylabel('# Orders', fontsize=12)
ax.plot(x, orders_mean, color='white', lw=2)
ax.fill_between(x,
                orders_mean - orders_se,
                orders_mean + orders_se,
                color='#3F5D7D')

ax.spines['top'].set_alpha(0)
ax.spines['bottom'].set_alpha(1)
ax.spines['right'].set_alpha(0)
ax.spines['left'].set_alpha(1)
ax.set_title('User Orders by Hour of Day (95% confidence)', fontsize=22)
ax.set_xlabel('Hour of Day')

s, e = ax.get_xlim()
plt.xlim(s, e)

for y in range(8, 20, 2):
    plt.hlines(y,
               xmin=s,
               xmax=e,
               colors='black',
               alpha=0.5,
               linestyles='--',
               lw=0.5)

plt.show()
