from pywaffle import Waffle
import pandas as pd
import matplotlib.pyplot as plt

mpg = pd.read_csv('../data/mpg.csv')

mpg_class = mpg.groupby('class').size().reset_index(name='counts_class')
n_categories = mpg_class.shape[0]
colors_class = [
    plt.cm.Set3(i / float(n_categories)) for i in range(n_categories)
]

mpg_cyl = mpg.groupby('cyl').size().reset_index(name='counts_cyl')
n_categories = mpg_cyl.shape[0]
colors_cyl = [
    plt.cm.Spectral(i / float(n_categories)) for i in range(n_categories)
]

mpg_make = mpg.groupby('manufacturer').size().reset_index(name='counts_make')
n_categories = mpg_make.shape[0]
colors_make = [
    plt.cm.tab20b(i / float(n_categories)) for i in range(n_categories)
]

fig = plt.figure(
    FigureClass=Waffle,
    plots={
        '311': {
            'values':
            mpg_class['counts_class'],
            'labels': [
                '{1}'.format(n[0], n[1])
                for n in mpg_class[['class', 'counts_class']].itertuples()
            ],
            'legend': {
                'loc': 'upper left',
                'bbox_to_anchor': (1.05, 1),
                'fontsize': 12,
                'title': 'Class'
            },
            'title': {
                'label': '# Vehicles by Class',
                'loc': 'center',
                'fontsize': 18
            },
            'colors':
            colors_class
        },
        '312': {
            'values':
            mpg_cyl['counts_cyl'],
            'labels': [
                '{1}'.format(n[0], n[1])
                for n in mpg_cyl[['cyl', 'counts_cyl']].itertuples()
            ],
            'legend': {
                'loc': 'upper left',
                'bbox_to_anchor': (1.05, 1),
                'fontsize': 12,
                'title': 'Cyl'
            },
            'title': {
                'label': '# Vehicles by Cyl',
                'loc': 'center',
                'fontsize': 18
            },
            'colors':
            colors_cyl
        },
        '313': {
            'values':
            mpg_make['counts_make'],
            'labels': [
                '{1}'.format(n[0], n[1]) for n in mpg_make[
                    ['manufacturer', 'counts_make']].itertuples()
            ],
            'legend': {
                'loc': 'upper left',
                'bbox_to_anchor': (1.05, 1),
                'fontsize': 12,
                'title': 'Manufacturer'
            },
            'title': {
                'label': '# Vehicles by Make',
                'loc': 'center',
                'fontsize': 18
            },
            'colors':
            colors_make
        }
    },
    rows=9,
    figsize=(16, 14))
