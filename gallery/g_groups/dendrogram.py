import scipy.cluster.hierarchy as shc
import pandas as pd
import matplotlib.pyplot as plt

arrests = pd.read_csv('../data/us_arrests.csv')

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

dend = shc.dendrogram(shc.linkage(
    arrests[['Murder', 'Assault', 'UrbanPop', 'Rape']], method='ward'),
                      labels=arrests.State.values,
                      color_threshold=100)

ax.set_title("USArrests Dendograms", fontsize=16)
plt.show()
