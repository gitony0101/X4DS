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

A cluster depends on the context, and different algorithms will capture different kinds of clusters:

- Centroid
- Continuous regions of densely packed instances
- Clusters of clusters,etc.

Two popular clustering algorithms:**K-Means and DBSCAN**

# K-means

- Def k, find centroids of k clusters

- Computational complexity
  - Generally linear with regard to the number of instances $m$, the number of clusters $k$, and the number of dimensions $n$ **when the data has a clustering structure**. If not, boom exponentially with the number of instances.

## Finding the optimal number of clusters

- silhouette score
- silhouette diagram

## Compare with KNN

- KNN

  - Classification
  - Supervised(Labled dataset)
  - Find the nearest $k$ data points

- K-means
  - Clustering
  - Unsupervised
  - Find the centroids of the $k$ clusters

## Limits of K-means

- Def k every time when test with iterations
- Does not behave very well when the clusters have varying sizes

**Note**

It is **important to scale the input features before you run K-Means**, or the clusters may be very stretched and K-Means will perform poorly.

# DBSCAN

**Density-based spatial clustering of applications with noise** (DBSCAN) works well if all the clusters are dense enough and if they are well sep‐arated by low-density regions.

How it works:

1. For each instance, the algorithm counts how many instances are located within a small distance $ε$ from it. This region is called the instance’s $ϵ$ neighborhood.
2. If an instance has at least **min_samples instances** in its $ε$-neighborhood (including itself), then it is considered a **core instance**,which located in dense regions.
3. All instances in the neighborhood of a core instance belong to the same cluster.This neighborhood may include other core instances; therefore, a long sequence of neighboring core instances forms a single cluster.
4. Any instance that is not a core instance and does not have one in its neighborhood is considered an anomaly.

# Gaussian mixture models

A Gaussian mixture model **(GMM)** is a $\textit{probabilistic model}$ that assumes that the instances were generated from a mixture of several **Gaussian distributions** whose parameters are unknown.

- GMM variants:
  - The number $k$ of Gaussian distributions. 
  - The dataset $\bf{X}$ generated through the following probabilistic process: 
  - A cluster is picked randomly from among $k$ clusters. 
  - The probability of choosing the $j$th cluster is defined by the cluster’s $weight, φ^{(j)}$. The index of the cluster chosen for the $i$th instance is noted $z^{(i)}$.
  
    - If $z^{(i)} = j$, meaning the $i$th instance has been assigned to the $j$th cluster, the location$x^{(i)}$ of this instance is sampled randomly from the Gaussian distribution with mean $\bf{μ^{(j)}}$ and **covariance matrix** $\bf{Σ^{(j)}}$,which is noted $\bf{X}^{(i)}  ∼  N(\bf{μ^{(j)}},\bf{Σ^{(j)}})$




![](./img/GMM.drawio.png)

A graphical representation of a Gaussian mixture model, including its parameters (squares), random variables (circles), and their conditional dependencies (solid arrows)



![](./img/MVN-GMM.png)


How the weights calculated?
- EM(Expectation Maximization) algorithm.

## EM(Expectation Maximization)

### KL- Divergence(KLD)

- $\textit{Kullback-Leibler divergence}$, or simply, the KL divergence:
  
  - To measure the **difference between two probability distributions** over **the same variable** $x$.
  
  - The concept was originated in probability theory and information theory.The KL divergence, which is closely related to **relative entropy**, **information divergence**, and **information for discrimination**, is a non-symmetric measure of the difference between two probability distributions $p(x)$ and $q(x)$.
  - Specifically, the KLD of $q(x)$ from $p(x)$, denoted $D_{KL}(p(x), q(x))$, is **a measure of the information lost** when $q(x)$ is used to **approximate** $p(x)$.

- Def equation:
  
  Let $p(x)$ and $q(x)$ are two probability distributions of a discrete random variable $x$. That is, both $p(x)$ and $q(x)$ sum up to 1, and $p(x) > 0$ and $q(x) > 0$ for any $x$ in $X$:

  $$
\mathop{D_{KL}(p(x) || q(x))} = ∑_{x \in X} p(x) \log \frac{p(x)}{q(x)}\tag{discrete}
$$

$$
\mathop{D_{KL}(p(x) || q(x))} = ∫_{-∞}^{∞} p(x) \log \frac{p(x)}{q(x)}\tag{continuous}
$$

- Notes: KL Divergence:
  - Not a metric measure
  - Not symetric measure
  - Need **Not** satisfy triangular inequality
  -  When $p ≠ 0$ but $q = 0$, $D_{KL}(p||q)$ is defined as $∞$. This means that if one event $e$ is possible $(i.e., p(e) > 0)$, and the other predicts it is absolutely impossible $(i.e., q(e) = 0)$, then the two distributions are **absolutely different.** 
  
      However, in practice, two distributions $P$ and $Q$ are derived from observations and sample counting, that is, from frequency distributions. It is unreasonable to predict in the derived probability distribution that an event is completely impossible since we must take into account the possibility of unseen events.