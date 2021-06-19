from pandas.plotting import andrews_curves
import matplotlib.pyplot as plt
import pandas as pd

mtcars = pd.read_csv("../data/mtcars.csv")
mtcars.drop(['cars', 'carname'], axis=1, inplace=True)

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

andrews_curves(mtcars, 'cyl', colormap='Set1')

ax.spines["top"].set_alpha(0)
ax.spines["bottom"].set_alpha(.3)
ax.spines["right"].set_alpha(0)
ax.spines["left"].set_alpha(.3)

ax.set_title('Andrews Curves of mtcars', fontsize=16)
ax.set_xlim(-3, 3)
ax.grid(alpha=0.3)
plt.show()
