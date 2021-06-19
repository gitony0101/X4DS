from pandas.plotting import parallel_coordinates
import matplotlib.pyplot as plt
import pandas as pd

diamonds = pd.read_csv("../data/diamonds_filter.csv")

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

parallel_coordinates(diamonds, 'cut', colormap='Dark2')

ax.spines["top"].set_alpha(0)
ax.spines["bottom"].set_alpha(.3)
ax.spines["right"].set_alpha(0)
ax.spines["left"].set_alpha(.3)

ax.set_title('Parallel Coordinated of Diamonds', fontsize=16)
ax.grid(alpha=0.3)
plt.show()
