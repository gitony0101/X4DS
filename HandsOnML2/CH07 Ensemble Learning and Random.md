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