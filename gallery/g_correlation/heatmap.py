import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

mtcars = pd.read_csv("../data/mtcars.csv")

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

sns.heatmap(mtcars.corr(),
            xticklabels=mtcars.corr().columns,
            yticklabels=mtcars.corr().columns,
            cmap='RdYlGn',
            center=0,
            annot=True)

plt.title('Correlogram of mtcars', fontsize=22)
plt.xticks(fontsize=12)
plt.yticks(fontsize=12)
plt.show()
