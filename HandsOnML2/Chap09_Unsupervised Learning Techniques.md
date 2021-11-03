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

# Clustering

$$
\textit{Birds of a feather flock together.}
$$

A cluster  depends on the context, and different algorithms will capture different kinds of clusters: 
- Centroid
- Continuous regions of densely packed instances 
- Clusters of clusters,etc.

Two popular clustering algorithms:**K-Means and DBSCAN**

## K-means

- Def k, find centroids of k clusters

- Computational complexity
  - Generally linear with regard to the number of instances $m$, the number of clusters $k$, and the number of dimensions $n$ **when the data has a clustering structure**. If not, boom exponentially with the number of instances.

### Finding the optimal number of clusters

- silhouette score
  
- silhouette diagram


### Compare with KNN

- KNN
  - Classification
  - Supervised(Labled dataset)
  - Find the nearest $k$ data points

- K-means 
  - Clustering
  - Unsupervised
  - Find the centroids of the $k$ clusters

### Limits of K-means

  - Def k every time when test with iterations
  - Does not behave very well when the clusters have varying sizes

 **Note** 
    
  It is **important to scale the input features before you run K-Means**, or the clusters may be very stretched and K-Means will perform poorly.

