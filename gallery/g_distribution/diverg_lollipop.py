import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import patches

mtcars = pd.read_csv("../data/mtcars.csv")

x = mtcars['mpg']
mtcars['mpg_z'] = (x - x.mean()) / x.std()
mtcars['colors'] = ['red' if x < 0 else 'green' for x in mtcars['mpg_z']]
mtcars.sort_values('mpg_z', inplace=True)
mtcars.reset_index(inplace=True)

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

ax.scatter(mtcars.mpg_z,
           mtcars.index,
           color=mtcars.colors,
           s=[600 if x == 'Fiat X1-9' else 300 for x in mtcars.cars],
           alpha=0.6)

ax.hlines(y=mtcars.index,
          xmin=0,
          xmax=mtcars.mpg_z,
          color=mtcars.colors,
          alpha=0.4,
          linewidth=1)

ax.annotate('Mercedes Models',
            xy=(0.0, 11.0),
            xytext=(1.0, 11),
            xycoords='data',
            fontsize=15,
            ha='center',
            va='center',
            color='white',
            bbox=dict(boxstyle='square', fc='firebrick'),
            arrowprops=dict(arrowstyle='-[, widthB=2.0, lengthB=1.5',
                            lw=2.0,
                            color='steelblue'))

p1 = patches.Rectangle((-2.0, -1),
                       width=.3,
                       height=3,
                       alpha=.2,
                       facecolor='red')
p2 = patches.Rectangle((1.5, 27),
                       width=.8,
                       height=5,
                       alpha=.2,
                       facecolor='green')
ax.add_patch(p1)
ax.add_patch(p2)

fs = 12
ax.set_xlabel('$Mileage$', fontdict={'fontsize': fs})
ax.set_ylabel('$Model$', fontdict={'fontsize': fs})
ax.set_yticks(mtcars.index)
ax.set_yticklabels(mtcars.cars, fontdict={'fontsize': fs - 2})
ax.set_title('Diverging Bars of Car Mileage', fontdict={'size': fs + 4})
ax.grid(linestyle='--', alpha=0.5)
plt.show()
