import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

mpg = pd.read_csv('data/mpg.csv')
mpg['_class'] = mpg['class']
x_var, group_var = 'displ', 'class'
mpg_agg = mpg[[x_var, group_var]].groupby(group_var)

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

sns.histplot(data=mpg,
             x=x_var,
             hue=group_var,
             bins=30,
             multiple="stack",
             ax=ax)

fs = 12
ax.set(ylim=(0, 25))
ax.set_title(f'Stacked Histogram of ${x_var}$ colored by ${group_var}$',
             fontsize=fs + 4)
ax.set_xlabel(x_var, fontsize=fs)
ax.set_ylabel('Frequency', fontsize=fs)
plt.show()
