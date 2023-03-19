# HandsOn Machin Learning 2 supportive materials

# Statistical Learining & Machine Learning

## Bayesian Theorem

In order to make probability statements about $θ$ given $x$, we must begin with a model providing a joint probability distribution for $θ$ and $x$. 

The joint probability mass or density function can be written as a product of two densities that are often referred to as the **prior distribution** $p(θ)$ and the **sampling distribution (or data distribution)** $p(x|θ)$, respectively:

Bayes rule
$$
p(θ,x) = p(θ)p(x|θ)
$$

**Bayesian Inference**

Simply conditioning on the known value of the data $x$, using the basic property of conditional probability known as Bayes’ rule, yields the posterior density:

$$
p(θ|x) =\frac{p(θ,x)}{p(x)}= \frac{p(x|θ)p(θ)}{p(x)}
$$

- $p(θ)$: Prior distribution
- $p(x|θ)$:Likelihood: The likeliness between obsevations and the model parameters
- $p(θ|x)$: Posterior distribution, the probability distribution of $θ$ tuned by the likelihood.

where $p(x)=∑_θp(θ)p(y|θ)$(or continous $θ$: $p(x) =∫_θp(θ)p(x|θ)$) the sum is all possible values of $θ$. The second term $p(x|θ)$ is taken as **the function of θ ,NOT of** $x$.

Also, the function can be written as: 

$$
p(θ|x) ∝ p(θ)p(x|θ)
$$


**These simple formulas encapsulate the technical core of Bayesian inference:**

- The primary task of any specific application is to develop the model $p(θ, x)$ and perform the computations to summarize $p(θ|x)$ in appropriate ways.





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
  - Usually the base of the log is 2,in netural network it is $e$ but it can be any base >1. 
  - Not a metric measure
  - Not symetric measure
  - Need **Not** satisfy triangular inequality
  -  When $p ≠ 0$ but $q = 0$, $D_{KL}(p||q)$ is defined as $∞$. This means that if one event $e$ is possible $(i.e., p(e) > 0)$, and the other predicts it is absolutely impossible $(i.e., q(e) = 0)$, then the two distributions are **absolutely different.** 
  
      However, in practice, two distributions $P$ and $Q$ are derived from observations and sample counting, that is, from frequency distributions. It is unreasonable to predict in the derived probability distribution that an event is completely impossible since we must take into account the possibility of unseen events.


# Algorithms
   
## lightGBM

#  issues

# Thinking

What is Model?
What is algorithm?