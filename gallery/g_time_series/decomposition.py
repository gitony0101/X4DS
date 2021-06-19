from statsmodels.tsa.seasonal import seasonal_decompose
from dateutil.parser import parse
import matplotlib.pyplot as plt
import matplotlib.pyplot as plt
import pandas as pd

passengers = pd.read_csv('../data/air_passengers.csv')

dates = pd.DatetimeIndex(
    [parse(d).strftime('%Y-%m-01') for d in passengers['date']])
passengers.set_index(dates, inplace=True)

result = seasonal_decompose(passengers['traffic'], model='multiplicative')

plt.rcParams.update({'figure.figsize': (12, 8)})

result.plot().suptitle('Time Series Decomposition of Air Passengers')
plt.show()
