# Introduction to Statistical Learning

## What Is Statistical Learning?

**Statistical Learning** - a set of approaches for estimating a function $f(X)$ from a set of data.

More generally, suppose that we observe a quantitative response $Y$ and $p$ different predictors, $X*{1}, X*{2}, \ldots, X\_{p} $.

We assume that there is some relationship between $Y$ and $X=\left(X_{1}, X_{2}, \ldots, X_{p}\right)$, which can be written in the very general form:

$$
Y=f(X)+\epsilon
$$

The symbol $f$ represents the systematic information that $X$ provides about $Y$. Statistical learning refers to a set of approaches for estimating $f$.

## Why estimate $f$?

Either for **prediction** or **inference**.

## Prediction

The set of inputs X are readily available, but the output Y cannot easily be obtained. We wish to predict what Y will be given a set of inputs X

$$
\hat{Y}=\hat{f}(X)
$$

The accuracy of the prediction depends on two quantities - **the reducible and the irreducible error**. The estimate $\hat{f}(X)$
will not be a perfect estimate for the **true** $f(X)$

We can reduce the error by using better statistical learning techniques.
However the variability of $ϵ$ also affects the accuracy of the predictions. This is the irreducible error.

Consider a given estimate $\hat{f}$ and a set of predictors $X$, which yields the prediction $\hat{Y}=\hat{f}(X)$. Assume for a moment that both $\hat{f}$ and $X$ are fixed. Then, it is easy to show that

$$
\begin{aligned}
E(Y-\hat{Y})^{2} &=E[f(X)+\epsilon-\hat{f}(X)]^{2} \\
&=\underbrace{[f(X)-\hat{f}(X)]^{2}}_{\text {Reducible }}+\underbrace{\operatorname{Var}(\epsilon)}_{\text {Irreducible }}
\end{aligned}
$$

where $E(Y-\hat{Y})^{2}$ represents the average, or expected value, of the squared difference between the predicted and actual value of $Y$, and $\operatorname{Var}(\epsilon)$ represents the variance associated with the error term $\epsilon$.

## Inference

We are often interested in the way that Y
is affected by changes in X. We need to estimate $f(X)$, but we don’t want to predict Y. We instead want to understand the relationship betrween X and Y.

## Assessing Model Accuracy

Every data set is different and there is no one statistical learning method that works best for all data sets. It is important for any given data set to find the statistical learning method that produces the best results. This section presents some concepts that are part of that decision-making process.

### Measuring the Quality of Fit

#### [MSE:Mean Squared Error](https://en.wikipedia.org/wiki/Mean_squared_error)

**Proof of variance and bias relationship:**

In regression, mean squared error (MSE) is the most commonly-used measure. A small MSE indicates the predicted responses are very close to the true ones. MSE used on training data is more accurately referred to as the training MSE.

We are most concerned with the accuracy of the predictions when we apply our methods to previously unseen data. If you are trying to predict the value of a stock, your concern is how it performs in the future, not on known data from the past. Thus, the goal is then minimizing the test MSE, which measures the accuracy of a model on observations that were not used to train the model. Imagine a set of observations (x0,y0)
that were not used to train the statistical learning method.

$$Ave(y_0 - \hat{f}(x_0))^2$$

### The Bias-Variance Trade-Off

The expected test MSE can be broken down into the sum of three quantities:

1. the variance of $\hat{f}\left(x_{0}\right)$
2. the squared bias of $\hat{f}\left(x_{0}\right)$
3. the variance of the error terms $\varepsilon$
   $$
   E\left(y_{0}-\hat{f}\left(x_{0}\right)^{2}=\operatorname{Var}\left(\hat{f}\left(x_{0}\right)\right)+\left[\operatorname{Bias}\left(\hat{f}\left(x_{0}\right)\right)\right]^{2}+\operatorname{Var}(\varepsilon)\right.
   $$

# Stastical Learning Methods

## Supervised Learning

## Unsupervised Learning

## Reinforcement Learning

# Chap01 - The Machine Learning Landscape

## 1.1. Machiner Learning Concept and priority

Machine Learning is the science (and art) of programming computers so they can learn from data.

Main steps:

1. Study the data.
2. Select a model.
3. Train it on the training data.
4. Apply the model to make predictions on new cases.

Machine Learning is great for:

- Problems for which existing solutions **require a lot of fine-tuning or long lists of rules**: one Machine Learning algorithm can often simplify code and perform better than the traditional approach.
- Complex problems for which using a traditional approach yields no good solution: the best Machine Learning techniques can perhaps find a solution.
- Fluctuating environments: a Machine Learning system can **adapt to new data**.
- Getting insights about complex problems and large amounts of data.

## 1.2. Types of Machine Learning Systems

Machine Learning systems can be classified **according to the amount and type of supervision** they get during training. There are four major categories:

- Supervised learning,
- Unsupervised learning,
- Semisupervised learning,
- Reinforcement learning.

### 1.2.1. Supervised learning

In supervised learning, the training set you feed to the algorithm includes the desired solutions, called **labels**.Logistic Regression is commonly used for classification, as it can output a value that corresponds to the probability of belonging to a given class

Task:

- Classification
- Predict a target numeric value.

Most important supervised learning algorithms:

- $k$-Nearest Neighbors
- Linear Regression
- Logistic Regression
- Support Vector Machines (SVMs)
- Decision Trees and Random Forests
- Neural network

### 1.2.2. Unsupervised learning

In unsupervised learning, the training data is **unlabeled**,The system tries to learn itself.

Task:

- Visualization
- Dimensionality reduction(feature extraction)
- Anomaly detection

Most important unsupervised learning algorithms:

- Clustering
  - K-Means
  - DBSCAN
  - Hierarchical Cluster Analysis (HCA)
- Anomaly detection and novelty detection
  - One-class SVM
  - Isolation Forest
- Visualization and dimensionality reduction
  - Principal Component Analysis (PCA)
  - Kernel PCA
  - Locally Linear Embedding (LLE)
  - t-Distributed Stochastic Neighbor Embedding (t-SNE)
- Association rule learning
  - Apriori
  - Eclat

### 1.2.3. Semisupervised learning

Since labeling data is usually time-consuming and costly, you will often have **plenty of unlabeled instances, and few labeled instances.** Some algorithms can deal with data that’s **partially labeled**. This is called Semisupervised learning.

Most semisupervised learning algorithms are **combinations of unsupervised and supervised algorithms**.

- Deep belief networks (DBNs) are based on unsupervised components called restricted Boltzmann machines (RBMs) stacked on top of one another.

- RBMs are trained sequentially in an unsupervised manner, and then the whole system is fine-tuned using supervised learning techniques.

### 1.2.4. Reinforcement Learning

![](img/1-12.png)

Reinforcement Learning system named an **agent** in this context, can **observe the environment, select and perform actions, and get rewards in return (or penalties in the form of negative rewards)**.

It must then **learn by itself what is the best strategy**, called a $policy$, to get the most reward over time. A policy defines what action the agent should choose when it is in a given situation.

### 1.2.5. Batch and Online Learning

Batch and Online Learning system can **learn incrementally** from a stream of incoming data.

#### 1.2.5.1. Batch learning

In batch learning, the system is incapable of learning incrementally: it must be trained using all the available data. This will generally take a lot of time and computing resources, so it is **typically done offline**.

First the system is trained, and then it is l**aunched into production and runs without learning anymore; it just applies what it has learned.** This is called $offline\ learning$.

#### 1.2.5.2. Online learning

In online learning, you train the system incrementally by feeding it data **instances sequentially**, either individually or in small groups called **mini-batches**. **Each learning step is fast and cheap**, so the system can learn about new data on the fly, as it arrives.

One important parameter of online learning systems is how fast they should adapt to changing data: this is called the **learning rate**:

- If you set a high learning rate, then your system will rapidly adapt to new data, but it will also tend to quickly forget the old data (you don’t want a spam filter to flag only the latest kinds of spam it was shown).

- Conversely, if you set a low learning rate, the system will have more inertia; that is, it will learn more slowly, but it will also be less sensitive to noise in the new data or to sequences of nonrepresentative data points (outliers).

A big challenge with online learning is that if bad data is fed to the system, the sys‐tem’s performance will gradually decline. To reduce this risk, you need to monitor your system closely and promptly switch learning off (and possibly revert to a previously working state) if you detect a drop in perfor‐mance. You may also want to monitor the input data and react to abnormal data (e.g., using an anomaly detection algorithm.

### 1.2.2. Instance-Based Versus Model-Based Learning

One more way to categorize Machine Learning systems is by how they generalize.There are two main approaches to generalization:

- Instance-based learning
- Model-based learning.

#### 1.2.2.1. Instance-based learning

Instance-based learning: the system learns the examples by heart, then generalizes to new cases by **using a similarity measure** to **compare** them to the learned examples (or a subset of them).Possibly the most trivial form of learning is simply to learn by heart.

#### 1.2.2.2. Model-based learning

Another way to generalize from a set of examples is to **build a mode**l of these examples and then use that model to make predictions.Model selection is the key of this system, then specify a performance measure,either a utility function (or fitness function) that measures how good the model is.

## 1.2. Main Challenges of Machine Learning

### 1.2.1. Insufficient Quantity of Training Data

comment later

### 1.2.2. Nonrepresentative Training Data

comment later

### 1.2.3. Poor-Quality Data

It will make it harder for the system to detect the underlying patterns whici makes your system is less likely to perform well if your training data is full of errors, outliers, and noise.

**Cleaning up your training data**:

- If some instances are clearly outliers, it may help to simply discard them or try to fix the errors manually.
- If some instances are missing a few features, you must decide whether you want to ignore this attribute alto‐gether, ignore these instances, fill in the missing values, or train one model with the feature and one model without it.

### 1.2.4. Irrelevant Features

A critical part of the success of a Machine Learning project is coming up with a good set of features to train on.

This process, called **feature engineering**, involves the following steps:

- Feature selection
- Feature extraction
- Creating new features

### 1.2.5. Overfitting the Training Data

The model performs well on the training data, but it does not generalize well.Overfitting happens when the model is too complex relative to the amount and noisiness of the training data. Here are possible solu‐tions:

- Simplify the model by selecting one with fewer parameters (e.g., a linear model rather than a high-degree polynomial model), by reducing the number of attributes in the training data, or by constraining the model.
- Gather more training data.
- Reduce the noise in the training data (e.g., fix data errors and remove outliers).

### 1.2.6. Underfitting the Training Data

Underfitting is the opposite of overfitting: it occurs when your **model is too simple** to learn the underlying structure of the data.

Solutions:

- Select a more powerful model, with more parameters.
- Feed better features to the learning algorithm (feature engineering).
- Reduce the constraints on the model (e.g., reduce the regularization hyperpara‐meter).

### 1.2.7. Summary(step back)

- Machine Learning: Better at some task by learning from data than having to explicitly code rules.
- There are many different types of ML systems:

  - supervised or unsupervised
  - batch or online
  - instance-based or model-based.

- In an ML project, gather data in a training set, feed the training set to a learning algorithm.
  - **If the algorithm is model-based**, it tunes some parameters to fit the model to the training set (i.e., to make good predictions on the training set itself), and then hopefully it will be able to make good predictions on new cases as well.
  - **If the algorithm is instance-based**, it just learns the examples by heart and generalizes to new instances by using a similarity measure to compare them to the learned instances.
- The system will not perform well if your training set is too small, or if the data is not representative, is noisy, or is polluted with irrelevant features.The model needs to be neither too simple (in which case it will underfit) nor too complex (in which case it will overfit).

### 1.2.8. Testing and Validating

A better option is to split your data into two sets: the training set and the test set.

As these names imply, you train your model using the training set, and you test it using the test set. The error rate on new cases is called the generalization error (or out-of-sample error), and by evaluating your model on the test set, you get an estimate of this error. This value tells you how well your model will perform on instances it has never seen before.

### 1.2.9. Hyperparameter Tuning and Model Selection

How to decide between models:One option is to train both and compare how well they generalize using the test set.

A common solution to this problem is called holdout validation: you simply hold out part of the training set to evaluate several candidate models and select the best one.

The new held-out set is called the validation set (or sometimes the development set, or dev set). More specifically, you train multiple models with various hyperparameters on the reduced training set (i.e., the full training set minus the validation set), and you select the model that performs best on the validation set. After this holdout vali‐dation process, you train the best model on the full training set (including the valida‐tion set), and this gives you the final model. Lastly, you evaluate this final model on the test set to get an estimate of the generalization error.

#### 1.2.9.1. [Difference Between a Parameter and a Hyperparameter](https://machinelearningmastery.com/difference-between-a-parameter-and-a-hyperparameter/)

![](img/hyper.png)

**A model parameter** is a configuration variable that is internal to the model and whose value can be estimated from data.

- required by the model when making predictions.
- They values define the skill of the model on your problem.
- They are estimated or learned from data.
- They are often **not set manually** by the practitioner.
- They are often saved as part of the learned model.

Parameters are key to machine learning algorithms. They are the part of the model that is learned from historical training data.

Some examples of model parameters include:

- The weights in an artificial neural network.
- The support vectors in a support vector machine.
- The coefficients in a linear regression or logistic regression.

**A model hyperparameter** is a configuration that is **external to the model and whose value cannot be estimated from data.**

- They are often used in processes to help estimate model parameters.
- They are often specified by the practitioner.
- They can often be set using heuristics.
- They are often tuned for a given predictive modeling problem.

Some examples of model hyperparameters include:

- The learning rate for training a neural network.
- The C and sigma hyperparameters for support vector machines.
- The k in k-nearest neighbors.

- **model parameters are estimated from data automatically**
- **model hyperparameters are set manually and are used in processes to help estimate model parameters.**

### 1.2.2. Data Mismatch

In some cases, it’s easy to get a large amount of data for training, but this data proba‐bly won’t be perfectly representative of the data that will be used in production.

## 1.2. Exercises

1. How would you define Machine Learning?

   Machine Learning is about building systems that can learn from data. Learning means getting better at some task, given some performance measure.

2. Can you name four types of problems where it shines?

   Machine Learning is great for complex problems for which we have no algorithmic solution, to replace long lists of hand-tuned rules, to build systems that adapt to fluctuating environments, and finally to help humans learn (e.g., data mining).

3. What is a labeled training set?

   A labeled training set is a training set that contains the desired solution (a.k.a. a label) for each instance.

4. What are the two most common supervised tasks?

   Regression and classification

5. Can you name four common unsupervised tasks?

   Clustering, visualization, dimensionality reduction, and association rule learning.

6. What type of Machine Learning algorithm would you use to allow a robot to walk in various unknown terrains?

   Reinforcement Learning is likely to perform best if we want a robot to learn to walk in various unknown terrains, since this is typically the type of problem that Reinforcement Learning tackles. It might be possible to express the problem as a supervised or semisupervised learning problem, but it would be less natural.

7. What type of algorithm would you use to segment your customers into multiple groups?

   If you don’t know how to define the groups, then you can use a clustering algo‐rithm (unsupervised learning) to segment your customers into clusters of similar customers. However, if you know what groups you would like to have, then you can feed many examples of each group to a classification algorithm (supervised learning), and it will classify all your customers into these groups.

8. Would you frame the problem of spam detection as a supervised learning prob‐lem or an unsupervised learning problem?

   Spam detection is a typical supervised learning problem: the algorithm is fed many emails along with their labels (spam or not spam).

9. What is an online learning system?

   An online learning system can learn incrementally, as opposed to a batch learn‐ing system. This makes it capable of adapting rapidly to both changing data and autonomous systems, and of training on very large quantities of data.

10. What is out-of-core learning?

    Out-of-core algorithms can handle vast quantities of data that cannot fit in a computer’s main memory. An out-of-core learning algorithm chops the data into mini-batches and uses online learning techniques to learn from these minibatches.

11. What type of learning algorithm relies on a **similarity measure** to make predictions?

    An instance-based learning system learns the training data by heart; then, when given a new instance, it uses a similarity measure to find the most similar learned instances and uses them to make predictions.

12. **What is the difference between a model parameter and a learning algorithm’s hyperparameter?**

    A model has one or more model parameters that determine what it will predict given a new instance (e.g., the slope of a linear model). A learning algorithm tries to find optimal values for these parameters such that the model generalizes well to new instances..

    **A hyperparameter is a parameter of the learning algorithm itself, not of the model** (e.g., the amount of regularization to apply).

13. What do model-based learning algorithms search for?What is the most common strategy they use to succeed? How do they make predictions?

    Model-based learning algorithms **search for an optimal value for the model parameters** such that the model will generalize well to new instances. We usually **train such systems by minimizing a cost function** that measures how bad the system is at making predictions on the training data, plus a penalty for model com‐plexity if the model is regularized.

    To make predictions, we feed the new instance’s features into the model’s prediction function, using the parameter values found by the learning algorithm.

14. Can you name four of the main challenges in Machine Learning?

    Some of the main challenges in Machine Learning are the lack of data, poor data quality, nonrepresentative data, uninformative features, excessively simple models that underfit the training data, and excessively complex models that overfit the data.

15. If your model performs great on the training data but generalizes poorly to new instances, what is happening? Can you name three possible solutions?

    If a model performs great on the training data but generalizes poorly to new instances, the model is likely overfitting the training data (or we got extremely lucky on the training data). Possible solutions to overfitting are getting more data, simplifying the model (selecting a simpler algorithm, reducing the number of parameters or features used, or regularizing the model), or reducing the noise in the training data.

16. What is a test set, and why would you want to use it?

    A test set is used to estimate the generalization error that a model will make on new instances, before the model is launched in production.

17. What is the purpose of a validation set?

18. What is the train-dev set, when do you need it, and how do you use it?

    The train-dev set is used **when there is a risk of mismatch** between the training data and the data used in the validation and test datasets (which should always be as close as possible to the data used once the model is in production). The traindev set is a part of the training set that’s held out (the model is not trained on it).

    The model is trained on the rest of the training set, and evaluated on both the train-dev set and the validation set.

    If the model performs well on the training set but not on the train-dev set, then the model is likely overfitting the training set.

    If it performs well on both the training set and the train-dev set, but not on the validation set, then there is probably a significant data mismatch between the training data and the validation + test data, and you should try to improve the training data to make it look more like the validation + test data.

19. What can go wrong if you tune hyperparameters using the test set?

    If you tune hyperparameters using the test set, you risk overfitting the test set, and the generalization error you measure will be optimistic (you may launch a model that performs worse than you expect).
