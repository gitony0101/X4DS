import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

mpg = pd.read_csv('../data/mpg.csv')

mpg_group = mpg.groupby('class').size().reset_index(name='counts')

_, ax = plt.subplots(figsize=(12, 7), subplot_kw=dict(aspect="equal"), dpi=80)

data = mpg_group['counts']
categories = mpg_group['class']
explode = [0, 0, 0, 0, 0, 0.1, 0]


def func(pct, allvals):
    absolute = int(pct / 100. * np.sum(allvals))
    return f"{pct:.1f}% ({absolute})"


wedges, texts, autotexts = ax.pie(data,
                                  autopct=lambda pct: func(pct, data),
                                  textprops=dict(color="w"),
                                  colors=plt.cm.Dark2.colors,
                                  startangle=140,
                                  explode=explode)

ax.legend(wedges,
          categories,
          title="Vehicle Class",
          loc="center left",
          bbox_to_anchor=(1, 0, 0.5, 1))
plt.setp(autotexts, size=10, weight=700)
ax.set_title("Class of Vehicles: Pie Chart")
plt.show()
