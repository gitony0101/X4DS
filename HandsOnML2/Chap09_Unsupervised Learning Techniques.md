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

## Compare K-Means with Gaussian mixture models

- K-means algorithm
  - Assigned each example to exactly one cluster
  - What if clusters are overlapping?
    - Hard to tell which cluster is right
    - Maybe we should try to remain uncertain
  - Used Euclidean distance
  - What if cluster has a non-circular shape?
- Gaussian mixture models
  - Clusters modeled as Gaussians
    - Not just by their mean
  - EM algorithm: assign data to cluster with some probability
  - Gives probability model of $x$ ("generative")


## EM(Expectation Maximization) Algorithm

Model parameter estimation with latent variables

$$
θ_{MLE} = arg \underset{θ}{max} log\mathop{p}(x|θ))
$$

- log likelihood: $log\mathop{p}(x|θ))$ is the log likelihood of the data $x$ given the model parameters $θ$.
- Can not compute directly
- The algorithm is based on the **expectation step**, which is the process of estimating the parameters of the model.

The **core of the M-step** is the **maximization step**, which is the process of choosing the parameters that maximize the likelihood:

$$
θ^{t+1} = arg \underset{θ}{max} ∫_{z}\underset{\textit{log joint probs.}}{log\mathop{p(x,z|θ)}}⋅\underset{postetior}{p(z|x,\theta^{(t)})}dz
\tag{9.1}
$$

where the **core of E-step** is the **expectation step**, which is the process of estimating the parameters of the model:

$$
\underset{\textit{log joint probs.}}{log\mathop{p(x,z|θ)}} = E_{z|x,\theta^{(t)}}[log\mathop{p(x,z|θ)})]
\tag{9.2}
$$

- #### Hold on tight, what is $θ$?
  - Parameters of the  model, discuss in GMM below.
### Convergence proof

When $θ^{t} → θ^{t+1}$, there is $log\mathop{p(x|θ^{(t)})} ≤ log\mathop{p(x|θ^{(t + 1)})}$:

**Prof:**

$$
\begin{aligned}
{log\mathop{p(x|θ)}} & = log\mathop{p(x,z|θ)} - log\mathop{p(z|x,θ)}

\\ &\text{Bayes rule:} p(x,z|θ) = p(z|x,θ)⋅p(x|θ)
\\ & \text{Compute the log expectation, right side:}
\\ & = ∫_{z}p(z|x,θ^{(t)})log\mathop{p(x,z|θ)}dz - ∫_{z}p(z|x,θ^{(t)})log\mathop{p(z|x,θ)}dz
\\  Let : Q(θ,θ^{(t)}) & =∫_{z}p(z|x,θ^{(t)})log\mathop{p(x,z|θ)}dz
\\  H(θ,θ^{(t)}) & = ∫_{z}p(z|x,θ^{(t)})log\mathop{p(z|x,θ)}dz,then,
\\  \text{Right side} & =  Q(θ,θ^{(t)}) -  H(θ,θ^{(t)}),
\\ &  \text{By argmax definition (9.1) we have:}
\\ & Q(θ^{t+1},θ^{(t)}) ≥ Q(θ^{(t)},θ^{(t)}) (increasing)
\\
\\  \text{Now we focus on :}  H(θ,θ^{(t)})
\\
\\  H(θ^{(t+1)},θ^{(t)}) - H(θ^{(t)},θ^{(t)})  & = ∫_{z}p(z|x,θ^{(t)})log\mathop{p(z|x,θ^{(t+1)})}dz - ∫_{z}p(z|x,θ^{(t)})log\mathop{p(z|x,θ^{(t)})}dz
\\ & = ∫_{z}p(z|x,θ^{(t)})log\frac{p(z|x,θ^{(t+1)})}{p(z|x,θ^{(t)})}dz
\\  (\text{By, KL-Divergence(≥0),so} & = -KL(p(z|x,θ^{(t)}) || p(z|x,θ^{(t+1)})) ≤ 0 )
\\  \text{Thus, we  have:} & H(θ^{(t+1)},θ^{(t)}) ≤ H(θ^{(t)},θ^{(t)})
\\ \text{So, the convergence is achieved.}
\end{aligned}
$$

There is another substitution for KL-Divergence: [**Jensen Inequality** of **logarithmic function(concave)**](https://www.probabilitycourse.com/chapter6/6_2_5_jensen%27s_inequality.php)

- For a convex function, the Jensen inequality[^1] is satisfied if the function is increasing:
  $$
  E(g(X)) ≥ g[E(X)]
  $$

### ELBO and KL-Divergence forms

ELBO: Evidence Lower bound

$$
p(x|θ) = ELBO + KL(q||p)
$$

where:

$$
\begin{aligned}
ELBO & = E_{q(z)}[log\frac{p(x,z|θ)}{q(z)}]
\\
KL(q||p) & = ∫q(z)log\frac{q(z)}{p(z|x,θ)}dz
\end{aligned}
$$

### E-step (“Expectation")

Fix $θ$:

$$
\hat{q} = arg\underset{q}{min} KL(q||p)= argmax \mathcal{L}(q,θ)
$$

- For each datum (example) $x$ in the dataset, calculate the probability that it belongs to each of the $k$ clusters.
- Normalize to sum to one (over $k$ clusters )
- If $x^{(i)}$ is very likely under the $j$th Gaussian, it gets high weight $ϕ^{(j)}$

### M-step (“Maximization" )

Fix $\hat{q}$

$$
θ = arg\underset{θ}{max} \mathcal{L}(\hat{q},θ)
$$

- For each cluster $z^{(i)} = j$
- Update its parameters using the (weighted) data points
- Each step **increases** the log-likelihood of our model
- **Iterate until convergence,if not step back**
  - Convergence guaranteed
  - Local optima: initialization often important

### General EM 

$$
\begin{aligned}
\text{E-step:} \mathop{q^{(t+1)}} & = arg\underset{q}{max} \mathcal{L}(q,θ^{(t)})
\\
\text{M-step:} \mathop{θ^{(t+1)}} & = argmax \mathcal{L}(q^{(t+1)},θ)
\end{aligned}
$$

### EM Notes:

EM is a general framework for partially observed data:

- “Complete data’ $X$
- Assignments $z$ are missing (unobserved)

EM corresponds to:

- Computing the distribution over all $z^{(i)}$ given the parameters
- Maximizing the“expected complete”log likelihood
- GMMs = plug in“soft assignments”, but not always so easy

Alternatives: Stochastic EM, Hard EM

- Instead of expectations, just sample the $z^{(i)}$ or choose best (often easier)- Called “imputing”the values of $z$

- Hard EM:
  - Assignments are known
  - No missing data, values, clusters
  - Similar to EM, but less“smooth", more local minima

Stochastic EM:

- Similar to EM, but with extra randomness
- Not obvious when it has converged


## Gaussian mixture model

A Gaussian mixture model **(GMM)** is a $\textit{probabilistic model}$ that assumes that the instances were generated from a mixture of several **Gaussian distributions** whose parameters are unknown.

- GMM variants:

  - The number $k$ of Gaussian distributions.
  - The dataset $\bf{X}$ generated through the following probabilistic process:
  - A cluster is picked randomly from among $k$ clusters.
  - The probability of choosing the $j$th cluster is defined by the cluster’s $weight, φ^{(j)}$. The index of the cluster chosen for the $i$th instance is noted $z^{(i)}$.

    - If $z^{(i)} = j$, meaning the $i$th instance has been assigned to the $j$th cluster, the location$x^{(i)}$ of this instance is sampled randomly from the Gaussian distribution with mean $\bf{μ^{(j)}}$ and **covariance matrix** $\bf{Σ^{(j)}}$,which is noted $\bf{X}^{(i)}  ∼  N(\bf{μ^{(j)}},\bf{Σ^{(j)}})$

![](./img/GMM.drawio.png)

- A graphical representation of a Gaussian mixture model, including its parameters (squares), random variables (circles), and their conditional dependencies (solid arrows)
- “Latent assignment" $z$: we observe $x$, but $z$ is hidden.

GMM Model:

$$
\mathop{p(x)}= ∑_{i=1}^kϕ^{(j)}N(\bf{μ^{(j)}},\bf{Σ^{(j)}})
$$

where:

 $θ = \{P_1,P_2 ⋯,p_k,μ_1,μ_2⋯μ_k,∑_1,∑_2,⋯,∑_k\}$ 





![](./img/MVN-GMM.png)

 




### GMM & EM Summary

Gaussian mixture models

- Flexible class of probability distributions
- Explain variation with hidden groupings or clusters of data
- Latent “membership” $z^{(i)}$
- Feature values $x^{(i)}$ are Gaussian given $z^{(i)}$

Expectation-Maximization

- Compute soft membership probabilities, "responsibility": $Contribution$
- Update mixture component parameters given soft memberships
- Ascent on log-likelihood: convergent, but local optima

Selecting the number of clusters

- Penalized likelihood or validation data likelihood




# References

[^1]: [Jensen Inequality](https://bookdown.org/ts_robinson1994/10_fundamental_theorems_for_econometrics/exp-ineq.html#jensens-inequality)
