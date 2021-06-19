import pandas as pd
import matplotlib.pyplot as plt

mtcars = pd.read_csv("../data/mtcars.csv")

x = mtcars['mpg']
mtcars['mpg_z'] = (x - x.mean()) / x.std()
mtcars['colors'] = ['red' if x < 0 else 'green' for x in mtcars['mpg_z']]
mtcars.sort_values('mpg_z', inplace=True)

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

ax.hlines(y=mtcars.index,
          xmin=0,
          xmax=mtcars.mpg_z,
          color=mtcars.colors,
          alpha=0.4,
          linewidth=5)

for x, y, tex in zip(mtcars.mpg_z, mtcars.index, mtcars.mpg_z):
    ax.text(x,
            y,
            round(tex, 2),
            horizontalalignment='right' if x < 0 else 'left',
            verticalalignment='center',
            fontdict={
                'color': 'red' if x < 0 else 'green',
                'size': 8
            })

fs = 12
ax.set_xlabel('$Mileage$', fontdict={'fontsize': fs})
ax.set_ylabel('$Model$', fontdict={'fontsize': fs})
ax.set_yticks(mtcars.index)
ax.set_yticklabels(mtcars.cars, fontdict={'fontsize': fs - 2})
ax.set_title('Diverging Bars of Car Mileage', fontdict={'fontsize': fs + 4})
ax.grid(linestyle='--', alpha=0.5)
plt.show()
