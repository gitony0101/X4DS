import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

visitors = pd.read_csv('../data/night_visitors.csv')

mycolors = [
    'tab:red', 'tab:blue', 'tab:green', 'tab:orange', 'tab:brown', 'tab:grey',
    'tab:pink', 'tab:olive'
]

columns = visitors.columns[1:]
labs = columns.values.tolist()

x = visitors['yearmon'].values.tolist()
y0 = visitors[columns[0]].values.tolist()
y1 = visitors[columns[1]].values.tolist()
y2 = visitors[columns[2]].values.tolist()
y3 = visitors[columns[3]].values.tolist()
y4 = visitors[columns[4]].values.tolist()
y5 = visitors[columns[5]].values.tolist()
y6 = visitors[columns[6]].values.tolist()
y7 = visitors[columns[7]].values.tolist()

y = np.vstack([y0, y2, y4, y6, y7, y5, y1, y3])

labs = columns.values.tolist()

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

ax.stackplot(x, y, labels=labs, colors=mycolors, alpha=0.8)

ax.set_title('Night Visitors in Australian Regions', fontsize=18)
ax.set(ylim=[0, 100000])
ax.legend(fontsize=10, ncol=4)
ax.set_xticklabels(x[::5], fontsize=10, horizontalalignment='center')
ax.set_yticklabels(np.arange(10000, 100000, 20000), fontsize=10)
ax.set_xlim(x[0], x[-1])

ax.spines['top'].set_alpha(0)
ax.spines['bottom'].set_alpha(.3)
ax.spines['right'].set_alpha(0)
ax.spines['left'].set_alpha(.3)

plt.show()
