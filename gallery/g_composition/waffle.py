from pywaffle import Waffle
import pandas as pd
import matplotlib.pyplot as plt

mpg = pd.read_csv('../data/mpg.csv')

mpg_group = mpg.groupby('class').size().reset_index(name='counts')
n_categories = mpg_group.shape[0]

colors = [
    plt.cm.inferno_r(i / float(n_categories)) for i in range(n_categories)
]

fig = plt.figure(
    FigureClass=Waffle,
    plots={
        '111': {
            'values':
            mpg_group['counts'],
            'labels': [
                '{0} ({1})'.format(n[0], n[1])
                for n in mpg_group[['class', 'counts']].itertuples()
            ],
            'legend': {
                'loc': 'upper left',
                'bbox_to_anchor': (1.05, 1),
                'fontsize': 12
            },
            'title': {
                'label': '# Vehicles by Class',
                'loc': 'center',
                'fontsize': 18
            }
        },
    },
    rows=7,
    colors=colors,
    figsize=(12, 8))
