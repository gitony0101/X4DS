# -*- coding: utf-8 -*-
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
import seaborn as sns

import janitor as jn
import yellowbrick.features as ybf
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import *
from sklearn.model_selection import *
from sklearn.preprocessing import *

import category_encoders as ce

from dataprep import eda

# ## Missing Data

df = pd.read_csv('../data/titanic_train.csv')
df.head()

# ### Show

eda.plot_missing(df)

# ### Imputation

# +
from sklearn.impute import SimpleImputer

num_cols = df.select_dtypes(include="number").columns
imp = SimpleImputer(strategy='mean')
df_imputed = imp.fit_transform(df[num_cols])


# -

# ### Adding Indicator Columns

def add_indicator(col):
    def wrapper(df):
        return df[col].isna().astype(int)

    return wrapper

df1 = df.assign(Cabin_Missing=add_indicator("Cabin"))
df1.head()

df.add_column(column_name="Cabin_Missing", value=add_indicator("Cabin")).head()

# ## Cleaning Data

# ### Column Names

# +
x_bad = pd.DataFrame(
    {
        "A": [1, None, 3],
        " sales numbers ": [20.0, 30.0, None],
    }
)

x_bad.clean_names()


# +
def clean_col(name):
    return (
        name.strip().lower().replace(" ", "_")
    )

x_bad.rename(columns=clean_col)
# -

# ### Replacing Missing Values

x_bad.fill_empty(columns=["A", " sales numbers "], value=10)

 x_bad.coalesce(columns=["A", " sales numbers "], new_column_name="val")

# ## Exploring


df.head()


# +
def tweak_titanic(df):
    df = (
        df.drop(columns=["Name", "Ticket", "Cabin"])
            .pipe(pd.get_dummies, drop_first=True)
    )
    return df

def get_train_test_X_y(df, target, size=0.3, std_cols=None):
    X, y = df.get_features_targets(target_columns=target)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=size, random_state=42)
    cols = X.columns
    num_cols = ["Pclass", "Age", "SibSp", "Parch", "Fare"]
    
    imp = IterativeImputer()
    fitted = imp.fit_transform(X_train[num_cols])
    
    X_train = X_train.assign(**{c:fitted[:,i] for i, c in enumerate(num_cols)})
    test_fit = imp.transform(X_test[num_cols])
    X_test = X_test.assign(**{c:test_fit[:,i] for i, c in enumerate(num_cols)})
    
    if std_cols:
        std = StandardScaler()
        fitted = std.fit_transform(X_train[std_cols])
        X_train = X_train.assign(**{c:fitted[:,i] for i, c in enumerate(std_cols)})
        test_fit = std.transform(X_test[std_cols])
        X_test = X_test.assign(**{c:test_fit[:,i] for i, c in enumerate(std_cols)})

    return X_train, X_test, y_train, y_test

ti_df = tweak_titanic(df)
std_cols = "Pclass,Age,SibSp,Fare".split(",")

target = "Survived"

X_train, X_test, y_train, y_test = get_train_test_X_y(ti_df, target, std_cols=std_cols)

X = pd.concat([X_train, X_test])
y = pd.concat([y_train, y_test])
# -

X.shape


X.describe().iloc[:, [0, -1]]


X.iloc[[1, 4], -3:]


X.loc[[677, 864], "sex_male":]


fig, ax = plt.subplots(figsize=(6, 4))
X.fare.plot(kind="hist", ax=ax)
#fig.savefig("images/mlpr_0601.png", dpi=300)




fig, ax = plt.subplots(figsize=(6, 4))
X.plot.scatter(
    x="age", y="fare", ax=ax, alpha=0.3
)
#fig.savefig("images/mlpr_0603.png", dpi=300)


X.age.corr(X.fare)


# +
from yellowbrick.features import JointPlotVisualizer

_, ax = plt.subplots(figsize=(6, 6))
jpv = JointPlotVisualizer(feature="Age", target="Fare")
jpv.fit(X["Age"], X["Fare"])
jpv.poof()
# -


new_df = X.copy()
new_df["target"] = y
p = sns.jointplot(data=new_df, x="Age", y="Fare", kind="reg")


new_df = X.copy()
new_df["target"] = y
xs = ["Pclass", "Age", "Fare"]
p = sns.pairplot(data=new_df, vars=xs, hue="target", kind="reg")


(
    X.assign(
        age_bin=pd.qcut(X['Age'], q=10, labels=False),
        class_bin=pd.cut(X['Pclass'], bins=3, labels=False),
    )
    .pipe(lambda df: pd.crosstab(df.age_bin, df.class_bin))
    .pipe(lambda df: df.div(df.sum(1), axis=0))
    .plot.bar(stacked=True)
    .legend(bbox_to_anchor=(1, 1))
)

# +
import yellowbrick.features as ybf

_, ax = plt.subplots(figsize=(6, 6))

X1 = X.select_dtypes(include="number")

pcv = ybf.Rank2D(features=X1.columns, algorithm="pearson")
pcv.fit(X1, y)
pcv.transform(X1)
pcv.poof()
# -


_, ax = plt.subplots(figsize=(6, 6))
rv = ybf.RadViz(features=X.columns, classes=["Died", "Survived"])
rv.fit(X, y)
rv.transform(X)
rv.poof()


# +
_, ax = plt.subplots(figsize=(6, 4))

pc = ybf.ParallelCoordinates(features=X.columns, classes=["died", "survived"])
pc.fit(X, y)
pc.transform(X)
ax.set_xticklabels(ax.get_xticklabels(), rotation=45)
pc.poof()


# +
y_col = "Survived"
df1 = df.drop(columns = ['PassengerId', 'Parch'])
X, y = df1.drop(columns=y_col), df1[y_col]

size = 0.3

X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=size, random_state=42
    )

def prep(X_train, X_test):

    num_cols = df1.select_dtypes(include="number").columns.to_list()
    num_cols.remove(y_col)

    imp = IterativeImputer()
    fitted = imp.fit_transform(X_train[num_cols])
    test_fit = imp.transform(X_test[num_cols])
    
    scale = StandardScaler()
    fitted = scale.fit_transform(fitted)
    test_fit = scale.transform(test_fit)
    
    return pd.DataFrame(fitted, columns=num_cols), pd.DataFrame(test_fit, columns=num_cols)
        
fitted, test_fit = prep(X_train, X_test)

X = pd.concat([X_train, X_test])
y = pd.concat([y_train, y_test])
# -

X.isnull().mean() * 100

(
    X.assign(
        age_bin=pd.qcut(X['Age'], q=10, labels=False),
        class_bin=pd.cut(X['Pclass'], bins=3, labels=False),
    )
    .pipe(lambda df: pd.crosstab(df.age_bin, df.class_bin))
    .pipe(lambda df: df.div(df.sum(1), axis=0))
    .plot.bar(stacked=True)
    .legend(bbox_to_anchor=(1, 1))
)

# +
import yellowbrick.features as ybf

_, ax = plt.subplots(figsize=(6, 6))

X1 = X.select_dtypes(include="number")

pcv = ybf.Rank2D(features=X1.columns, algorithm="pearson")
pcv.fit(X1, y)
pcv.transform(X1)
pcv.poof()


# +
_, ax = plt.subplots(figsize=(6, 6))

rv = ybf.RadViz(features=X.columns, classes=["Died", "Survived"])
rv.fit(X, y)
rv.transform(X)
rv.poof()

# +
_, ax = plt.subplots(figsize=(6, 6))

pc = ybf.ParallelCoordinates(features=X.columns, classes=["Died", "Survived"])
pc.fit(X, y)
pc.transform(X)
ax.set_xticklabels(ax.get_xticklabels(), rotation=45)
pc.poof()
# -

# ## Categorical Data

X_cat = pd.DataFrame(
   {
       "A": [1, None, 3],
       "names": [
           "Fred,George",
           "George",
           "John,Paul"
       ]
   }
)
X_cat


# ### Dummy Variables

pd.get_dummies(X_cat, prefix='', prefix_sep='', columns=['names'])

(
    X_cat['names']
    .str.split(',')
    .str.get_dummies()
)

X_cat.expand_column(column_name="names", sep=",")

# ### Label Encoder

lab = LabelEncoder()
lab.fit_transform(X_cat.names)

lab.inverse_transform([0, 1, 2])

(
    X_cat['names']
    .astype("category")
    .cat.as_ordered()
    .cat.codes + 1
)

# ### Frequency Encoding

X_cat['names'].map(
    X_cat['names'].value_counts()
)

# ### Pulling Categories from Strings

df = pd.read_csv('../data/titanic_train.csv')
df.head()

pattern_name = "([A-Za-z]+)\."
df['Name'].str.extract(pattern_name, expand=False).value_counts()

# ### Other Categorical Encoding

size_df = pd.DataFrame(
    {
        "name": ["Fred", "John", "Matt"],
        "size": ["small", "med", "xxl"],
    }
)

# +
# he = ce.HashingEncoder(verbose=0)
# he.fit_transform(size_df)

# +
ore = ce.OrdinalEncoder(
    mapping=[
        {
            "col": "size",
            "mapping": {
                "small": 1,
                "med": 2,
                "lg": 3,
            },
        }
    ]
)

ore.fit_transform(size_df)

# +
titles = df['Name'].str.extract("([A-Za-z]+)\.", expand=False)
df1 = df.add_column(column_name='Title', value=titles)

te = ce.TargetEncoder(cols="Title") # 先验
te.fit_transform(df1, df['Survived'])["Title"].head()
# -

# ## Feature Selection

# ### Multicollinearity

agg = (
     df.groupby("Cabin")
     .agg("min,max,mean,sum".split(","))
     .reset_index()
)
agg.columns = [
     "_".join(c).strip("_")
     for c in agg.columns.values
]
agg_df = df.merge(agg, on="Cabin")
agg_df.head()

# +
limit = 0.95
corr = agg_df.corr()

mask = np.triu(
    np.ones(corr.shape), k=1
).astype(bool)
corr_no_diag = corr.where(mask)
coll = [
    c
    for c in corr_no_diag.columns
    if any(abs(corr_no_diag[c]) > limit)
]
coll


# +
X1 = df.select_dtypes(include="number")

pcv = ybf.Rank2D(features=X1.columns, algorithm="pearson")
pcv.fit(X1, y)
pcv.transform(X1)
pcv.poof()
# -

# ### Recursive Feature Elimination

from sklearn.ensemble import *
import yellowbrick.model_selection as ybm

# +
rfc = RandomForestClassifier(n_estimators=100)

rfe = ybm.RFECV(model=rfc, cv=5)

rfe.fit(X, y)
rfe.poof()
# -

rfe.rfe_estimator_.ranking_
rfe.rfe_estimator_.n_features_
rfe.rfe_estimator_.support_

from sklearn.feature_selection import *

model = RandomForestClassifier(n_estimators=100)
rfe = RFE(model, n_features_to_select=4)
rfe.fit(X, y)
X.columns[rfe.support_]

# ### Mutual Information

# +
mic = mutual_info_classif(X, y)

fig, ax = plt.subplots(figsize=(10, 8))
(
    pd.DataFrame(
        {
            "feature": X.columns,
            "vimp": mic
        })
    .set_index("feature")
    .plot.barh(ax=ax)
)
# -


# ## Imbalanced Classes

# +
from sklearn.utils import resample

mask = df.Survived == 1
surv_df, death_df = df[mask], 
 = df[~mask]

df_upsample = resample(surv_df, replace=True, n_samples=len(death_df), random_state=42)
df2 = pd.concat([death_df, df_upsample])
df2.Survived.value_counts()

# +
from imblearn.over_sampling import RandomOverSampler

ros = RandomOverSampler(random_state=42)
X_ros, y_ros = ros.fit_sample(X, y)
pd.Series(y_ros).value_counts()

# +
from sklearn.utils import resample

mask = df.Survived == 1
surv_df, death_df = df[mask], df[~mask]

df_upsample = resample(death_df, replace=True, n_samples=len(surv_df), random_state=42)

df3 = pd.concat([surv_df, df_downsample])
df3.Survived.value_counts()
# -


