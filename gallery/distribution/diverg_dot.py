import pandas as pd
import matplotlib.pyplot as plt

mtcars = pd.read_csv("../data/mtcars.csv")

x = mtcars['mpg']
mtcars['mpg_z'] = (x - x.mean()) / x.std()
mtcars['colors'] = ['red' if x < 0 else 'green' for x in mtcars['mpg_z']]
mtcars.sort_values('mpg_z', inplace=True)
mtcars.reset_index(inplace=True)

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

ax.scatter(mtcars.mpg_z, mtcars.index, size=450, alpha=.6, color=mtcars.colors)

for x, y, tex in zip(mtcars.mpg_z, mtcars.index, mtcars.mpg_z):
    ax.text(x,
            y,
            round(tex, 1),
            horizontalalignment='center',
            verticalalignment='center',
            fontdict={'color': 'white'})

ax.spines['top'].set_alpha(.3)
ax.spines['bottom'].set_alpha(.3)
ax.spines['right'].set_alpha(.3)
ax.spines['left'].set_alpha(.3)

fs = 12
ax.set_xlabel('$Mileage$', fontdict={'fontsize': fs})
ax.set_ylabel('$Model$', fontdict={'fontsize': fs})
ax.set_yticks(mtcars.index)
ax.set_yticklabels(mtcars.cars, fontdict={'fontsize': fs - 2})
ax.set_title('Diverging Dotplot of Car Mileage', fontdict={'size': fs + 4})
ax.grid(linestyle='--', alpha=0.5)
plt.show()
