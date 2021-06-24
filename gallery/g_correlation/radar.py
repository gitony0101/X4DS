import yellowbrick.features as ybf
import matplotlib.pyplot as plt

_, ax = plt.subplots(figsize=(6, 6))

rv = ybf.RadViz(features=X.columns, classes=["Died", "Survived"])
rv.fit(X, y)
rv.transform(X)
rv.poof()
