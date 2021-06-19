import pandas as pd
import matplotlib.pyplot as plt

mpg = pd.read_csv('../data/mpg.csv')
mpg_group = mpg[['cty', 'manufacturer'
                 ]].groupby('manufacturer').apply(lambda x: x.mean())
mpg_group.sort_values('cty', inplace=True)
mpg_group.reset_index(inplace=True)

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

markerline, stemlines, _ = ax.stem(mpg_group.index, mpg_group.cty)
stemlines.set_color('firebrick')
markerline.set_markerfacecolor('firebrick')
markerline.set_markeredgecolor('firebrick')

fs = 12
ax.set(ylim=(0, 30))
ax.set_ylabel('Miles Per Gallon', fontdict={'fontsize': fs})
ax.set_xticks(mpg_group.index)
ax.set_xticklabels(mpg_group.manufacturer.str.upper(),
                   rotation=60,
                   fontdict={
                       'horizontalalignment': 'right',
                       'size': fs
                   })
ax.set_title('Lollipop Chart for Highway Mileage', fontdict={'size': fs + 4})

for row in mpg_group.itertuples():
    ax.text(row.Index,
            row.cty + .5,
            s=round(row.cty, 2),
            horizontalalignment='center',
            verticalalignment='bottom',
            fontsize=fs)

plt.show()
