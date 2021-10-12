# Chapter 7 Ensemble Learning and Random Forests

Ensemble: A group of predictors.

 Ensemble Learning algorithm is called an Ensemble method:
Aggregate the predictions of a group of predictors to get predictions.(wisdom of crowd).

 ## Voting Classifiers

- Hard voting classifier:
 Create an even better classifier is to aggregate the predictions of each classifier and predict the class that gets the most votes. 
![](img/hardvote.png)

-Soft voting classifier:
All classifiers are able to estimate class probabilities,then to predict the class with the highest class probability, averaged over all the individual classifiers.
![](img/softvoteq.png)
## Bagging and Pasting

- **Bagging (short for bootstrap aggregating)**: sampling with replacement. (`bootstrap=True`)
- **Pasting**: sampling without replacement.(`bootstrap=False`)

### Out-of-Bag Evaluation

In Bagging, Some instances may b not  sampled for any given predictor at all.By default a BaggingClassifier samples $m$ training instances with replacement (bootstrap=True), where $m$ is the size of the training set,we have 
$\underset{m→∞}{lim} 1  -(1 - \frac{1}{m})^m = 1 - e^{-1}=63.2%$. 
This means that only about 63% of the training instances are sampled on average for each predictor.The remaining 37% of the training instances that are not sampled are called $out-of-bag (oob)$ instances. 
- Note that they are not the same 37% for all predictors.

## Random Patches and Random Subspaces

## Random forests

A Random Forest is an ensemble of Decision Trees, generally trained via the bagging method (or sometimes pasting).

The Random Forest algorithm introduces extra randomness when growing trees; instead of searching for the very best feature when splitting a node, it searches for the best feature among a random subset of features. The algorithm results in greater tree diversity, which (again) trades **a higher bias for a lower variance**, generally yielding an overall better model.

### Extra Trees

`It is hard to tell in advance whether a RandomForestClassifier will perform better or worse than an ExtraTreesClassifier. Gen‐erally, the only way to know is to try both and compare them using cross-validation (tuning the hyperparameters using grid search).`

When you are growing a tree in a Random Forest, at each node only a random subset of the features is considered for splitting (as discussed earlier). It is possible to make trees even more random by also using random thresholds for each feature rather than searching for the best possible thresholds (like regular Decision Trees do).
A forest of such extremely random trees is called an $\textit{Extremely Randomized Trees ensemble (or Extra-Trees for short)}$. Once again, this technique trades **more bias for a lower variance**. It also makes Extra-Trees much faster to train than regular Random Forests, because finding the best possible threshold for each feature at every node is one of the most time-consuming tasks of growing a tree.

### Feature importance

In Random Forests method, measure the relative importance of each feature by looking at how much the tree nodes that use that feature reduce impurity on average (across all trees in the forest). More precisely, it is a weighted average, where each node’s weight is equal to the number of training samples that are associated with it

## Boosting

Boosting (originally called $hypothes\ boosting$) refers to any Ensemble method that can **combine several weak learners into a strong learner**. 

**The general idea of most boosting methods is to train predictors sequentially, each trying to correct its predecessor.**

Main boosting methods:
- AdaBoost
- Gradient Boosting
  