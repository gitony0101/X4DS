import pandas as pd
import matplotlib.pyplot as plt
from joypy import joyplot

mpg = pd.read_csv('../data/mpg.csv')
mpg['_class'] = mpg['class']

_, ax = joyplot(mpg,
                column=['hwy', 'cty'],
                by="class",
                ylim='own',
                figsize=(12, 8))

ax[0].set_title('Joy Plot of City and Highway Mileage by Class', fontsize=16)
plt.show()
