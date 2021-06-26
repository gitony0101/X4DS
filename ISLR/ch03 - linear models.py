# ---
# jupyter:
#   jupytext:
#     formats: ipynb,py:light
#     text_representation:
#       extension: .py
#       format_name: light
#       format_version: '1.5'
#       jupytext_version: 1.11.3
#   kernelspec:
#     display_name: 'Python 3.9.4 64-bit (''p39'': conda)'
#     language: python
#     name: python394jvsc74a57bd0ff2e645ef952f1284ebef59edbc19ad3cff03e6406671d2dab1ca7ad9588368d
# ---

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import missingno as msno
import seaborn as sns

import janitor as jn
import yellowbrick.features as ybf
import yellowbrick.regressor as ybr
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import *
from sklearn.model_selection import *
from sklearn.preprocessing import *
from sklearn.linear_model import *
from sklearn.datasets import *
from sklearn.ensemble import *
from sklearn.metrics import *

import warnings
warnings.filterwarnings("ignore")

# +
b = load_boston()
bos_X = pd.DataFrame(b.data, columns=b.feature_names)
bos_y = b.target

bos_X_train, bos_X_test, bos_y_train, bos_y_test = train_test_split(
    bos_X, bos_y,
    test_size=0.3, random_state=42
)

bos_sX = StandardScaler().fit_transform(bos_X)
bos_sX_train, bos_sX_test, bos_sy_train, bos_sy_test = train_test_split(
    bos_sX, bos_y,
    test_size=0.3, random_state=42,
)
# -

# ## Baseline Model


from sklearn.dummy import DummyRegressor


dr = DummyRegressor()
dr.fit(bos_X_train, bos_y_train)
dr.score(bos_X_test, bos_y_test)


lr = LinearRegression()
lr.fit(bos_X_train, bos_y_train)
lr.score(bos_X_test, bos_y_test)
lr.coef_


lr2 = LinearRegression()
lr2.fit(bos_sX_train, bos_sy_train)
lr2.score(bos_sX_test, bos_sy_test)
lr2.intercept_
lr2.coef_


fi_viz = ybf.FeatureImportances(lr2, labels=bos_X.columns)
fi_viz.fit(bos_sX, bos_y)
fi_viz.poof()


iris = load_iris()
iX = iris.data
iy = iris.target
lr2 = LinearRegression()
lr2.fit(iX, iy)
list(zip(iris.feature_names, lr2.coef_))


# ## Metrics


rfr = RandomForestRegressor(random_state=42, n_estimators=100)
rfr.fit(bos_X_train, bos_y_train)

rfr.score(bos_X_test, bos_y_test)
bos_y_test_pred = rfr.predict(bos_X_test)
r2_score(bos_y_test, bos_y_test_pred)

explained_variance_score(bos_y_test, bos_y_test_pred)


mean_absolute_error(bos_y_test, bos_y_test_pred)


mean_squared_error(bos_y_test, bos_y_test_pred)


mean_squared_log_error(bos_y_test, bos_y_test_pred)


# ## Residuals Plot

rpv = ybr.ResidualsPlot(rfr)
rpv.fit(bos_X_train, bos_y_train)
rpv.score(bos_X_test, bos_y_test)
rpv.poof()

# ## Heteroscedasticity

# +
import statsmodels.stats.api as sms

resids = bos_y_test - rfr.predict(bos_X_test)
hb = sms.het_breuschpagan(resids, bos_X_test)
labels = [
    "Lagrange multiplier statistic",
    "p-value",
    "f-value",
    "f p-value",
]
for name, num in zip(labels, hb):
    print(f"{name}: {num:.2}")
# -

# ## Normal Residuals

# +
resids = bos_y_test - rfr.predict(bos_X_test)

pd.Series(resids, name="residuals").plot.hist(bins=20, title="Residual Histogram")

# +
from scipy import stats

_, ax = plt.subplots(figsize=(6, 4))
_ = stats.probplot(resids, plot=ax)
# -

stats.kstest(resids, cdf="norm")

# ## Prediction Error Plot

pev = ybr.PredictionError(rfr)
pev.fit(bos_X_train, bos_y_train)
pev.score(bos_X_test, bos_y_test)
pev.poof()






