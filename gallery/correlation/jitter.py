import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

mpg = pd.read_csv("../data/mpg.csv")

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

g = sns.stripplot(x='cty',
                  y='hwy',
                  data=mpg,
                  jitter=0.25,
                  size=8,
                  ax=ax,
                  linewidth=.5)

plt.title('Use jittered plots to avoid overlapping of points', fontsize=22)
plt.show()
