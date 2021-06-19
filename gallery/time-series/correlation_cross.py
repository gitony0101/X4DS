import statsmodels.tsa.stattools as stattools
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

mortality = pd.read_csv('../data/mortality.csv')
x = mortality['mdeaths']
y = mortality['fdeaths']

ccs = stattools.ccf(x, y)[:100]
nlags = len(ccs)

conf_level = 2 / np.sqrt(nlags)

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

ax.hlines(0, xmin=0, xmax=100, color='gray')
ax.hlines(conf_level, xmin=0, xmax=100, color='gray')
ax.hlines(-conf_level, xmin=0, xmax=100, color='gray')

ax.bar(x=np.arange(len(ccs)), height=ccs, width=.3)

ax.set_title('$Cross\ Correlation\ Plot:\ mdeaths\ vs\ fdeaths$', fontsize=16)
ax.set_xlim(0, len(ccs))
plt.show()
