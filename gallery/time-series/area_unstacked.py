import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

economics = pd.read_csv('../data/economics.csv')

x = economics['date'].values.tolist()
y1 = economics['psavert'].values.tolist()
y2 = economics['uempmed'].values.tolist()
mycolors = [
    'tab:red', 'tab:blue', 'tab:green', 'tab:orange', 'tab:brown', 'tab:grey',
    'tab:pink', 'tab:olive'
]
columns = ['psavert', 'uempmed']

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

ax.fill_between(x,
                y1=y1,
                y2=0,
                label=columns[1],
                alpha=0.5,
                color=mycolors[1],
                linewidth=2)
ax.fill_between(x,
                y1=y2,
                y2=0,
                label=columns[0],
                alpha=0.5,
                color=mycolors[0],
                linewidth=2)

ax.set_title('Personal Savings Rate vs Median Duration of Unemployment',
             fontsize=18)
ax.set(ylim=[0, 30])
ax.set_xticklabels(x[::50], fontsize=10, horizontalalignment='center')
ax.set_yticklabels(np.arange(2.5, 30.0, 2.5), fontsize=10)
ax.set_xlim(-10, x[-1])
ax.legend(loc='best', fontsize=12)

for y in np.arange(2.5, 30.0, 2.5):
    plt.hlines(y,
               xmin=0,
               xmax=len(x),
               colors='black',
               alpha=0.3,
               linestyles='--',
               lw=0.5)

ax.spines['top'].set_alpha(0)
ax.spines['bottom'].set_alpha(.3)
ax.spines['right'].set_alpha(0)
ax.spines['left'].set_alpha(.3)
plt.show()
