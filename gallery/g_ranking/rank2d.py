import yellowbrick.features as ybf

_, ax = plt.subplots(figsize=(6, 6))

X1 = X.select_dtypes(include="number")
pcv = ybf.Rank2D(features=X1.columns, algorithm="pearson")
pcv.fit(X1, y)
pcv.transform(X1)
pcv.poof()
