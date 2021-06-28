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
#     display_name: Python 3
#     language: python
#     name: python3
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
from sklearn.decomposition import *
from sklearn.cluster import *
from sklearn.base import *
from sklearn.pipeline import Pipeline

import warnings

# ## Classfication Pipeline


# +
def tweak_titanic(df):
    df = df.drop(columns=[
        "Name",
        "Ticket",
        "Cabin",
    ]).pipe(pd.get_dummies, drop_first=True)
    return df


class TitanicTransformer(BaseEstimator, TransformerMixin):
    def transform(self, X):
        X = tweak_titanic(X)
        X = X.drop(columns="Survived")
        return X

    def fit(self, X, y):
        return self


pipe = Pipeline([
    ("titan", TitanicTransformer()),
    ("impute", IterativeImputer()),
    ("std", StandardScaler()),
    ("rf", RandomForestClassifier()),
])
# -

df = pd.read_csv('../data/titanic_train.csv')
df.head()

X_train2, X_test2, y_train2, y_test2 = train_test_split(
    df,
    df.Survived,
    test_size=0.3,
    random_state=42,
)
pipe.fit(X_train2, y_train2)
pipe.score(X_test2, y_test2)

params = {
    "rf__max_features": [0.4, "auto"],
    "rf__n_estimators": [15, 200],
}
grid = GridSearchCV(pipe, cv=3, param_grid=params)
grid.fit(df, df.Survived)

grid.best_params_
pipe.set_params(**grid.best_params_)
pipe.fit(X_train2, y_train2)
pipe.score(X_test2, y_test2)

roc_auc_score(y_test2, pipe.predict(X_test2))

# ## Regression Pipeline

# +
from sklearn.datasets import load_boston

b = load_boston()
bos_X = pd.DataFrame(b.data, columns=b.feature_names)
bos_y = b.target
bos_X_train, bos_X_test, bos_y_train, bos_y_test = train_test_split(
    bos_X,
    bos_y,
    test_size=0.3,
    random_state=42,
)
bos_sX = StandardScaler().fit_transform(bos_X)
bos_sX_train, bos_sX_test, bos_sy_train, bos_sy_test = train_test_split(
    bos_sX,
    bos_y,
    test_size=0.3,
    random_state=42,
)
# -

reg_pipe = Pipeline([
    ("std", StandardScaler()),
    ("lr", LinearRegression()),
])
reg_pipe.fit(bos_X_train, bos_y_train)
reg_pipe.score(bos_X_test, bos_y_test)

reg_pipe.named_steps["lr"].intercept_
reg_pipe.named_steps["lr"].coef_

mean_squared_error(bos_y_test, reg_pipe.predict(bos_X_test))

# ## PCA Pipeline

# +
from sklearn.decomposition import PCA

pca_pipe = Pipeline([
    ("titan", TitanicTransformer()),
    ("impute", IterativeImputer()),
    ("std", StandardScaler()),
    ("pca", PCA()),
])

X_pca = pca_pipe.fit_transform(df, df.Survived)
# -

pca_pipe.named_steps["pca"].explained_variance_ratio_
pca_pipe.named_steps["pca"].components_[0]
