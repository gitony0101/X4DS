
# Mechine learning temp notes & scratches



### 1. relation between poisson and chi-square dist.

Q: Random variable $X \sim {{\chi}_{2n}}^2$ and $Y \sim P(\lambda)$. Prove that $P(X < 2\lambda) = P(Y \ge n)$.

I have found that

$P(X < 2\lambda) = \frac{\int_{0}^{\lambda} e^{-x}x^{n/2-1}dx}{\int_{0}^{\infty} e^{-x}x^{n/2-1}dx}$

and

$P(Y \ge n) = \frac{\sum_{k=n}^{\infty} \frac{\lambda^k}{k!}}{\sum_{k=0}^{\infty} \frac{\lambda^k}{k!}}$.

But I'm still having difficulty equating the two probability.

----

A:Since $X \sim \chi_{2n}^{2}=\Gamma(n,2)$, we have $P(X<2\lambda)=\displaystyle\int_{0}^{2\lambda}\frac{1}{\Gamma(n)2^n}x^{n-1}e^{-\frac{x}{2}}dx$. Also, we have $P(Y\geq n)=1-P(Y \leq n-1)=1-\displaystyle\sum_{i=0}^{n-1}\frac{e^{-\lambda}\lambda^i}{i!}$.

Now differentiate both in terms of $\lambda$. For the integral we obtain $\displaystyle\frac{2}{\Gamma(n)2^n}(2\lambda)^{n-1}e^{-\lambda}=\frac{\lambda^{n-1}e^{-\lambda}}{(n-1)!}$, and for the sum we obtain $\displaystyle\sum_{i=0}^{n-1}\frac{e^{-\lambda}\lambda^i}{i!}-\displaystyle\sum_{i=1}^{n-1}\frac{e^{-\lambda}\lambda^{i-1}}{(i-1)!}=\frac{\lambda^{n-1}e^{-\lambda}}{(n-1)!}$.

Since their derivative in terms of $\lambda$ is same, they are at most different by a constant. Substituting $\lambda = 0$ implies that both terms are zero, thus their values are same.
