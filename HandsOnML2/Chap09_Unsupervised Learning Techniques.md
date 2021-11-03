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

# DBSCAN

**Density-based spatial clustering of applications with noise** (DBSCAN)  works well if all the clusters are dense enough and if they are well sep‐arated by low-density regions.

How it works:

1. For each instance, the algorithm counts how many instances are located within a small distance $ε$  from it. This region is called the instance’s $ϵ$ neighborhood.
2. If an instance has at least **min_samples instances** in its $ε$-neighborhood (including itself), then it is considered a **core instance**,which located in dense regions.
3. All instances in the neighborhood of a core instance belong to the same cluster.This neighborhood may include other core instances; therefore, a long sequence of neighboring core instances forms a single cluster.
4. Any instance that is not a core instance and does not have one in its neighborhood is considered an anomaly.