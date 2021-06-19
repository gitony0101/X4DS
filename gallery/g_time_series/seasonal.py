import pandas as pd
import matplotlib.pyplot as plt
from dateutil.parser import parse

passengers = pd.read_csv('../data/air_passengers.csv')

passengers['year'] = [parse(d).year for d in passengers.date]
passengers['month'] = [parse(d).strftime('%b') for d in passengers.date]
years = passengers['year'].unique()

mycolors = [
    'tab:red', 'tab:blue', 'tab:green', 'tab:orange', 'tab:brown', 'tab:grey',
    'tab:pink', 'tab:olive', 'deeppink', 'steelblue', 'firebrick',
    'mediumseagreen'
]

_, ax = plt.subplots(figsize=(12, 8), dpi=80)

for i, y in enumerate(years):
    ax.plot('month',
            'value',
            data=passengers.loc[passengers.year == y, :],
            color=mycolors[i],
            label=y)
    ax.text(passengers.loc[passengers.year == y, :].shape[0] - .9,
            passengers.loc[passengers.year == y, 'value'][-1:].values[0],
            y,
            fontsize=12,
            color=mycolors[i])

ax.set(xlim=(-0.3, 11), ylim=(50, 750))
ax.set_ylabel('$Air Traffic$')
ax.set_title("Monthly Seasonal Plot: Air Passengers Traffic (1949 - 1969)",
             fontsize=16)
ax.grid(axis='y', alpha=.3)
plt.show()
