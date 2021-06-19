import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import lines

health = pd.read_csv('../data/health.csv')
health.sort_values('pct_2014', inplace=True)
health.reset_index(inplace=True)


def connect_line(p1, p2, ax, color='black'):
    l = lines.Line2D([p1[0], p2[0]], [p1[1], p2[1]], color='skyblue')
    ax.add_line(l)
    return l


_, ax = plt.subplots(1, 1, figsize=(14, 14), facecolor='#f7f7f7', dpi=80)


def border_line(x,
                ymin,
                ymax,
                ax,
                color='black',
                alpha=1,
                linewidth=1,
                linestyle='dotted'):
    ax.vlines(x=x,
              ymin=ymin,
              ymax=ymax,
              color=color,
              alpha=alpha,
              linewidth=linewidth,
              linestyles=linestyle)


border_line(x=.05, ymin=0, ymax=26, ax=ax)
border_line(x=.10, ymin=0, ymax=26, ax=ax)
border_line(x=.15, ymin=0, ymax=26, ax=ax)
border_line(x=.20, ymin=0, ymax=26, ax=ax)

ax.scatter(y=health['index'],
           x=health['pct_2013'],
           color='#0e668b',
           s=50,
           alpha=0.7)

ax.scatter(y=health['index'],
           x=health['pct_2014'],
           color='#a3c4dc',
           s=50,
           alpha=0.7)

for i, p1, p2 in zip(health['index'], health['pct_2013'], health['pct_2014']):
    connect_line([p1, i], [p2, i], ax)

fs = 12
ax.set(xlim=(0, .25), ylim=(-1, 27), ylabel='Mean GDP Per Capita')
ax.set_facecolor('#f7f7f7')
ax.set_title('Dumbell Chart: Pct Change - 2013 vs 2014',
             fontdict={'size': fs + 4})
ax.set_xticks([.05, .1, .15, .20])
ax.set_xticklabels(['5%', '15%', '20%', '25%'])
plt.show()
