import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

mpg = pd.read_csv('../data/mpg.csv')

mpg_group = mpg[['cty', 'manufacturer'
                 ]].groupby('manufacturer').apply(lambda x: x.mean())
mpg_group.sort_values('cty', inplace=True)
mpg_group.reset_index(inplace=True)
mpg_group_median = mpg[['cty', 'manufacturer'
                        ]].groupby('manufacturer').apply(lambda x: x.median())

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

ax.hlines(y=mpg_group.index,
          xmin=0,
          xmax=40,
          color='gray',
          alpha=0.5,
          linewidth=.5,
          linestyles='dashdot')

for i, mark in enumerate(mpg_group.manufacturer):
    mpg_group_mark = mpg.loc[mpg.manufacturer == mark, :]
    ax.scatter(y=np.repeat(i, mpg_group_mark.shape[0]),
               x='cty',
               data=mpg_group_mark,
               s=75,
               edgecolors='gray',
               c='w',
               alpha=0.5)
    ax.scatter(y=i,
               x='cty',
               data=mpg_group_median.loc[mpg_group_median.index == mark, :],
               s=75,
               c='firebrick')

ax.text(33,
        13,
        "$red \ dots \ are \ the \ median$",
        fontdict={'size': 12},
        color='firebrick')

red_patch = ax.plot([], [],
                    marker="o",
                    ms=10,
                    ls="",
                    mec=None,
                    color='firebrick',
                    label="Median")
ax.legend(handles=red_patch)

ax.set_title('Distribution of City Mileage by Make', fontdict={'size': 16})
ax.set_xlabel('Miles Per Gallon (City)')
ax.set_yticks(mpg_group.index)
ax.set_yticklabels(
    mpg_group.manufacturer.str.title(),
    fontdict={'horizontalalignment': 'right'},
)
ax.set_xlim(1, 40)
ax.set_xticklabels(range(0, 45, 5), alpha=0.7)
ax.spines["top"].set_visible(False)
ax.spines["bottom"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)
ax.grid(axis='both', alpha=.4, linewidth=.1)
plt.show()
