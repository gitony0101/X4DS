# Ch 9 Unsupervised Learning Techniques

# Tasks & Algorithms

- Tasks :

  - Clustering
  - Anomaly detection
  - Density estimation

- Algorithms
  - K-Means
  - DBSCAN
  - Gaussian mixture models
  - EM(Expectation Maximization)

## Clustering

$$
\textit{Birds of a feather flock together.}
$$

A cluster  depends on the context, and different algorithms will capture different kinds of clusters: 
- Centroid
- Continuous regions of densely packed instances 
- Clusters of clusters,etc.

Two popular clustering algorithms:**K-Means and DBSCAN**

### K-means

- def k, find centroids

The vast majority of the instances were clearly assigned to the appropriate cluster, but a few instances were probably mislabeled (especially near the boundary between the top-left cluster and the central cluster). Indeed, the K-Means algorithm does not behave very well when the blobs have very different diameters because all it cares about when assigning an instance to a cluster is the distance to the centroid.

#### Compare with KNN

- KNN
  - Classification
  - Supervised(Labled dataset)
  - Find the nearest $k$ data points

- K-means 
  - Clustering
  - Unsupervised
  - Find the centroids of the $k$ clusters