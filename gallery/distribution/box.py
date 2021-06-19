import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

mpg = pd.read_csv('data/mpg.csv')


def add_n_obs(df, group_col, y):
    medians_dict = {
        group[0]: group[1][y].median()
        for group in df.groupby(group_col)
    }
    xticklabels = [x.get_text() for x in plt.gca().get_xticklabels()]
    n_obs = df.groupby(group_col)[y].size().values
    for (x, xticklabel), n_ob in zip(enumerate(xticklabels), n_obs):
        plt.text(x,
                 medians_dict[xticklabel] * 1.01,
                 "#obs : " + str(n_ob),
                 horizontalalignment='center',
                 fontdict={'size': 14},
                 color='white')


_, ax = plt.subplots(figsize=(12, 8), dpi=80)

g = sns.boxplot(x='class', y='hwy', data=mpg, notch=False, ax=ax)
add_n_obs(mpg, group_col='class', y='hwy')

g.set(ylim=(10, 40))
ax.set_title('Box Plot of Highway Mileage by Vehicle Class', fontsize=16)
plt.show()
