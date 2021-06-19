import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

email = pd.read_csv('../data/email_campaign_funnel.csv')

group_col = 'Gender'
order_of_bars = email.Stage.unique()[::-1]

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

colors = [
    plt.cm.Spectral(i / float(len(email[group_col].unique()) - 1))
    for i in range(len(email[group_col].unique()))
]

for c, group in zip(colors, email[group_col].unique()):
    sns.barplot(x='Users',
                y='Stage',
                data=email.loc[email[group_col] == group, :],
                order=order_of_bars,
                color=c,
                label=group,
                ax=ax)

fs = 12
ax.set_xlabel("$Users$", fontsize=fs)
ax.set_ylabel("Stage of Purchase", fontsize=fs)
ax.set_title("Population Pyramid of the Marketing Funnel", fontsize=fs + 4)
ax.legend('')
plt.show()
