import yellowbrick.features as ybf

_, ax = plt.subplots(figsize=(6, 6))

pc = ybf.ParallelCoordinates(features=X.columns, classes=["Died", "Survived"])
pc.fit(X, y)
pc.transform(X)
ax.set_xticklabels(ax.get_xticklabels(), rotation=45)
pc.poof()
