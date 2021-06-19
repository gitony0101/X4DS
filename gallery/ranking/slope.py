import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from matplotlib import lines

gdp = pd.read_csv('../data/gdp_per_cap.csv')

left_label = [
    str(c) + ', ' + str(round(y)) for c, y in zip(gdp.continent, gdp['1952'])
]
right_label = [
    str(c) + ', ' + str(round(y)) for c, y in zip(gdp.continent, gdp['1957'])
]

year = [
    'red' if (y1 - y2) < 0 else 'green'
    for y1, y2 in zip(gdp['1952'], gdp['1957'])
]


def connect_line(p1, p2, ax, color='black'):
    l = lines.Line2D([p1[0], p2[0]], [p1[1], p2[1]],
                     color='red' if p1[1] - p2[1] > 0 else 'green',
                     marker='o',
                     markersize=6)
    ax.add_line(l)
    return l


def border_line(x,
                ymin,
                ymax,
                ax,
                color='black',
                alpha=.7,
                linewidth=1,
                linestyle='dotted'):
    ax.vlines(x=x,
              ymin=ymin,
              ymax=ymax,
              color=color,
              alpha=alpha,
              linewidth=linewidth,
              linestyles=linestyle)


_, ax = plt.subplots(1, 1, figsize=(14, 14), dpi=80)

border_line(x=1, ymin=500, ymax=13000, ax=ax)
border_line(x=3, ymin=500, ymax=13000, ax=ax)

ax.scatter(y=gdp['1952'],
           x=np.repeat(1, gdp.shape[0]),
           s=10,
           color='black',
           alpha=0.7)
ax.scatter(y=gdp['1957'],
           x=np.repeat(3, gdp.shape[0]),
           s=10,
           color='black',
           alpha=0.7)

for p1, p2, c in zip(gdp['1952'], gdp['1957'], gdp['continent']):
    connect_line([1, p1], [3, p2], ax=ax)
    ax.text(1 - 0.05,
            p1,
            c + ', ' + str(round(p1)),
            horizontalalignment='right',
            verticalalignment='center',
            fontdict={'size': 14})
    ax.text(3 + 0.05,
            p2,
            c + ', ' + str(round(p2)),
            horizontalalignment='left',
            verticalalignment='center',
            fontdict={'size': 14})

ax.text(1 - 0.05,
        13000,
        'BEFORE',
        horizontalalignment='right',
        verticalalignment='center',
        fontdict={
            'size': 18,
            'weight': 700
        })
ax.text(3 + 0.05,
        13000,
        'AFTER',
        horizontalalignment='left',
        verticalalignment='center',
        fontdict={
            'size': 18,
            'weight': 700
        })

fs = 12
ax.set(xlim=(0, 4), ylim=(0, 14000), ylabel='Mean GDP Per Capita')
ax.set_xticks([1, 3])
ax.set_xticklabels(['1952', '1957'])
ax.set_yticks(np.arange(500, 13000, 2000))
ax.set_yticklabels(np.arange(500, 13000, 2000), fontsize=fs)
ax.set_title('Slopechart: Comparing GDP Per Capita between 1952 vs 1957',
             fontdict={'size': fs + 4})

ax.spines['top'].set_alpha(.0)
ax.spines['bottom'].set_alpha(.0)
ax.spines['right'].set_alpha(.0)
ax.spines['left'].set_alpha(.0)
plt.show()
