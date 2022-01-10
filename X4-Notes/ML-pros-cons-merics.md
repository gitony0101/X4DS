# Machine Learning Algorithms Pros and Cons as well as the evaluation metrics

Start with Logistic Regression, then try Tree Ensembles, and/or Neural Networks.

Occam's Razor principle: use the least complicated algorithm that can address your needs and only go for something more complicated if strictly necessary.

Neural Networks(both traditional and deep neural nets) and Gradient Boosted Decision Trees(GBDT) are being widely used in industry.
Pros and Cons

Here discusses the most popular algorithms. For a full list of machine learning algorithms, check out the cheatsheet.
Naive Bayes

    super simple(just doing some counts) yet performing well in practice.
    compute the multiplication of independent distributions
    require less training data
    no distribution requirements
    converge quicker than discriminative models(e.g. logistic regression) under conditional independence assumption
    good for few categories variables
    suffer multicollinearity

Logistic Regression

Logistic regression is probably the most widely used

Learn More

    easy to interpret. the output can be interpreted as a probability: you can use it for ranking instead of classification.
    good for cases where features are expected to be roughly linear, and the problem to be linearly separable.
    can easily "feature engineering" most non-linear features into linear ones.
    robust to noise
    can use l2 or l1 regularization to avoid overfitting(and for feature selection)
    efficient, and can be distributed(ADMM)
    no distribution requirement
    compute the logistic distribution
    cannot handle categorical(binary) variables well
    compute Confidence Interval
    suffer multicollinearity
    no need to worry about features being correlated, like in Naive Bayes.
    easily update the model to take in new data (using an online gradient descent method)
    use it if you want a probabilistic framework (e.g., to easily adjust classification thresholds, to say when you're unsure, or to get confidence intervals)
    use it if you expect to receive more training data in the future and want to quickly be incorporate into the model.

Lasso(L1)

    no distribution requirement
    compute L1 loss
    variable selection
    suffer multicollinearity

Ridge(L2)

    no distribution requirement
    compute L2 loss
    no variable selection
    not suffer multicollinearity

When NOT to use

    if the variables are normally distributed and the categorical variables all have 5+ categories: use Linear discriminant analysis
    if the correlations are mostly nonlinear: use SVM
    if sparsity and multicollinearity are a concern: Adaptive Lasso with Ridge(weights) + Lasso

Linear discriminant analysis

LDA: Linear discriminant analysis, not latent Dirichlet allocation

    require normal distribution
    not good for few categories variables
    compute the addition of Multivariate distribution
    compute Confidence Interval
    suffer multicollinearity

Support Vector Machines

    Support Vector Machines (SVMs) use a different loss function (Hinge) from LR.
    they are also interpreted differently (maximum-margin).
    SVM with a linear kernel is similar to a Logistic Regression in practice
    if the problem is not linearly separable, use an SVM with a non linear kernel (e.g. RBF). (Logistic Regression can also be used with a different kernel)
    good in a high-dimensional space (e.g. text classification).
    high accuracy
    good theoretical guarantees regarding overfitting
    no distribution requirement
    compute hinge loss
    flexible selection of kernels for nonlinear correlation
    not suffer multicollinearity
    hard to interpret

Cons:

    can be inefficient to train, memory-intensive and annoying to run and tune
    not for problems with many training examples.
    not for most "industry scale" applications (anything beyond a toy or lab problem)

Decision Tree

    Easy to interpret and explain
    Non-parametric, no need to worry about outliers or whether the data is linearly separable.
    no distribution requirement
    heuristic
    good for few categories variables
    not suffer multicollinearity (by choosing one of them)
    can easily overfit,
    tree ensembles
        e.g. Random Forests and Gradient Boosted Trees, using bagging or boosting
        generally outperform single decision tree.
        handle very well high dimensional spaces as well as large number of training examples.

Random Forests

    train each tree independently, using a random sample of the data, so the trained model is more robust than a single decision tree, and less likely to overfit
    2 parameters: number of trees and number of features to be selected at each node.
    good for parallel or distributed computing.
    lower classification error and better f-scores than decision trees.
    perform as well as or better than SVMs, but far easier for humans to understand.
    good with uneven data sets with missing variables.
    calculates feature importance
    train faster than SVMs

Gradient Boosted Decision Trees

    build trees one at a time, each new tree corrects some errors made by the previous trees, the model becomes even more expressive.
    3 parameters - number of trees, depth of trees, and learning rate; trees are generally shallow.
    usually perform better than Random Forests, but harder to get right. The hyper-parameters are harder to tune and more prone to overfitting. RFs can almost work "out of the box".
    training takes longer since trees are built sequentially

Neural Network

    good to model the non-linear data with large number of input features
    widely used in industry
    many open source implementations
    only for numerical inputs, vectors with constant number of values, and datasets with non-missing data.
    "black box-y", the classification boundaries are hard to understand intuitively("like trying interrogate the human unconscious for the reasons behind our conscious actions.")
    computationally expensive.
    the trained model depends crucially on initial parameters
    difficult to troubleshoot when they don't work as expect
    not sure if they will generalize well to data not in training set
    multi-layer neural networks are usually hard to train, and require tuning lots of parameters
    not probabilistic, unlike their more statistical or Bayesian counterparts. The continuous number output (e.g. a score) can be difficult to translate that into a probability.

Deep Learning

    not a general-purpose technique for classification.
    good in image classification, video, audio, text.

Summary

Factors to consider

    number of training examples, (how large is your training set?)
        if small: high bias/low variance classifiers (e.g., Naive Bayes), less likely to overfit
        if large: low bias/high variance classifiers (e.g., kNN or logistic regression)
    dimensionality of the feature space
    is the problem linearly separable?
    are features independent?
    are features expected to linearly dependent with the target variable?
    is overfitting expected to be a problem?
    system requirement: speed, performance, memory usage
    Does it require variables to be normally distributed?
    Does it suffer multicollinearity issue?
    Dose it do as well with categorical variables as continuous variables?
    Does it calculate CI without CV?
    Does it conduct variables selection without stepwise?
    Does it apply to sparse data?

Start with something simple like Logistic Regression to set a baseline and only make it more complicated if you need to. At that point, tree ensembles, and in particular Random Forests since they are easy to tune, might be the right way to go. If you feel there is still room for improvement, try GBDT or get even fancier and go for Deep Learning.



Pros and cons of classical supervised ML algorithms
Here we explore the pros and cons of some the most popular classical machine learning algorithms for supervised learning. To recap, this is a learning situation where we are given some labelled data and the model must predict the value or class of a new datapoint using a hypothesis function that it has learned from studying the provided examples. 
By ‘classical’ machine leaning algorithms I mean anything that is not a neural network. We will cover the advantages and disadvantages of various neural network architectures in a future post. 
Also note that this post deals only with supervised learning. There will be another dealing with clustering algorithms for unsupervised tasks.
Linear Regression  
 
Note that there are two basic flavors of this: Lasso and Ridge regression, which regularize with the L1 and L2 norms respectively
This is used for regression problems.
Pros 

    Small number of hyperparmeters
    Easy to understand and explain
    Can be regularized to avoid overfitting and this is intuitive
    Lasso regression can provide feature importances

Cons

    Input data need to be scaled and there are a range of ways to do this
    May not work well when the hypothesis function is non-linear
    A complex hypothesis function is really difficult to fit.  This can be done by using quadratic and higher order features, but the number of these grows rapidly with the number of original features and may become very computationally expensive 
    Prone to overfitting with a large number of features are present
    May not handle irrelevant features well

Logistic Regression
Again, this can be regularized with the L1 or L2 norm 
This is used for classification problems.
Pros 

    Outputs a probabilistic interpretation, which can be investigated with P-R curves, ROC curves etc.
    Has a small number of hyperparameters 
    Overfitting can be addressed though regularization 
    Using L2 regularization will provide feature importances

Cons

 

    May overfit when provided with large numbers of features
    Can only learn linear hypothesis functions so are less suitable to complex relationships between features and target 
    Input data might need scaling 
    May not handle irrelevant features well, especially if the features are strongly correlated  

Naive Bayes 
This is used for classification problems.
An intuitive way of determining the probability that a sample falls into classes based on a simplification of Bayes Theorem where we treat all the features as statistically independent. Specifically, we are attempting to determine the classification of some example given its feature values.
Bayes Theroem states this is proportional to the probability of each class multiplied by the product of observing each of the feature values in each class.
Pros

    No training involved - this is just based on the distribution of feature values. Thus it is easy to implement and fast
    Very little parameter tuning is required
    Works surprisingly well given its simplicity
    Features do not need scaling

Cons

 

    Assumes that the features are independent, which is rarely true
    Will usually not perform as well as classification algorithms that follow the ‘train-test’ approach

 

K nearest neighbors 
This is an approach where the values of a datapoint’s nearest neighbors is used to either classify it or find its value

    For classification, the neighbors of the datapoint all vote for its class. The class with the most votes wins
    For regression, the value of the datapoint is determined as the average of its neighbors 

This is also known as lazy learning because there is no training and testing dataset
Pros

    No training involved 
    Intuitive and easy to understand the concept, especially for clustering
    Naturally handles multiclass classification and can learn complex decision boundaries

Cons

 

    The distance metric to choose it not obvious and difficult to justify in many cases
    Performs poorly on high dimensional datasets 
    Expensive and slow to predict new instances because the distance to all neighbors must be recalculated 
    Data needs to be scaled before use 

Decision Trees 
Decision trees are rule-based learning methods that usually use either gini impurity or entropy to split the dataset at a series of decisions, made at nodes. Each internal node represents a ‘test’ on an attribute and each test has a series of outcomes, which are represented by branches. At the very end of the branches are leaf nodes that represent a class or regression outcome from the tree. The tree is ‘learned’ by splitting the source set into subsets based on an attribute-value test. The process can be repeated on each derived subset in a recursive fashion.
Decision trees are known as ‘weak learners’ and form the basis for ensemble methods like bagging and boosting
Pros

    Easy to interpret 
    Can adapt to learn arbitrarily complex hypothesis functions 
    Requires little data preparation - data typically does not need to be scaled
    Feature importance is built in due to the way inwhich decision nodes are built 
    Performs well on large datasets

Cos

 

    Prone to overfitting unless pruning is used 
    Can be very non-robust, meaning that small changes in the training dataset can lead to quite major differences in the hypothesis function that gets learned 
    Generally have worse performance than ensemble methods

 

 

Support Vector Machines (SVM)
SVMs come in a variety of different flavors and are likely deserved of their own blog post for a more detailed description. Ultimately their goal is to find optimal hyperplanes that best separate the dataset. Typically a hyperplane is chosen such that the ‘margin’ between the plane and datapoints of different classes on either side is maximized

    Hard margin SVMs: These are not robust to outliers (noise), meaning that all datapoints within each class must be on the correct side of the hyperplane
    Soft margin SVM: A slack variable is introduced in the objective function so that the constraint can be satisfied even if it is not possible to fit a hyperplane to all datapoints. Typically these will have a regularization parameter C, whose size will control the extent of smoothing that occurs.  A small C emphases the importance of the slack variables while a large C diminishes is
    The kernel trick can be used to adapt SVMs so that they become capable of learning non-linear decision boundaries. A kernel is really just a measure of the similarity between a datapoint and all others represented in the dataset. The most commonly used kernel (Radial Basis Function or RBF) has a gaussian shape

Pros

    Fairly robust against overfitting, especially in higher dimensional space
    There are many kernels to choose from, and some may perform very well on the dataset in question
    The optimization problem is convex and so solvable with standard libraries and always unique

Cons

    Feature scaling is required
    There are many hyperparameters and their meanings are often not intuitive 
    Do not scale well to large datasets (difficult to parallelize) 

Bagging (random forest, for example)
The concept of bagging aggregates/combines the results of many weak learners. Each weak learner has low bias but high variance (not robust to variation in the training dataset), but when aggregated their variance is lowered. In classification, each tree votes for the class of the input datapoint. In regression, the value assigned to each input is the mean of the bagged learners. 
In random forest, the weak learners are decision trees. Each tree is grown using a random subset of features using a random subset of the data. This decorrelates the trees by showing them different datasets. See the overview of random forest document for more information. 
Pros

    Highly flexible and generally very accurate
    Naturally assigns feature importance scores, so can handle redundant feature columns
    Has the ability to address class imbalance by using the balanced class weight flag
    Scales to large datasets 
    Generally robust to overfitting 
    Data does not need to be scaled 
    Can learn non-linear hypothesis functions

Cons 

    Results may be difficult to interpret 
    Feature importances may not be robust to variation in the training dataset

 

Boosting (gradient boosted trees, for example)
Boosting is alternative ensemble method that relies on the idea of iteratively improving the performance of weak learners. In the case of gradient boosted decision trees, the trees are built sequentially and each tree is designed to correct errors made by previous trees. At each step, the residual between the predicted and observed training data is added to the cost function, which is then minimized in the next step. 
Pros

    Robust to missing data, highly correlated features and irrelevant features in much the same way as random forest
    Naturally assigns feature importance scores 
    In Kaggle competitions at least, XGBoost appears to be the method of choice, with slightly better performance than random forest
    Data does not need to be scaled
    Can learn non-linear hypothesis function

Cons

 

    May be more prone to overfitting than random forest - the main purpose of the boosting approach is to reduce bias , not variance
    Has many hyperparameters to tune, so model development may not be as fast
    Feature importances may not be robust to variation in the training dataset

Advantages of Machine Learning

There is an endless number of advantages of ML. We can take a look at the ones which are really helpful. The advantages of Machine Learning tell us how using ML would benefit us.

So, let’s have a look at the advantages of Machine Learning.
1. Automation of Everything

Machine Learning is responsible for cutting the workload and time. By automating things we let the algorithm do the hard work for us. Automation is now being done almost everywhere. The reason is that it is very reliable. Also, it helps us to think more creatively.

Due to ML, we are now designing more advanced computers. These computers can handle various Machine Learning models and algorithms efficiently. Even though automation is spreading fast, we still don’t completely rely on it. ML is slowly transforming the industry with its automation.
2. Wide Range of Applications

ML has a wide variety of applications. This means that we can apply ML on any of the major fields. ML has its role everywhere from medical, business, banking to science and tech. This helps to create more opportunities. It plays a major role in customer interactions.

Machine Learning can help in the detection of diseases more quickly. It is helping to lift up businesses. That is why investing in ML technology is worth it.
3. Scope of Improvement

Machine Learning is the type of technology that keeps on evolving. There is a lot of scope in ML to become the top technology in the future. The reason is, it has a lot of research areas in it. This helps us to improve both hardware and software.

In hardware, we have various laptops and GPUs. These have various ML and Deep Learning networks in them. These help in the faster processing power of the system. When it comes to software we have various UIs and libraries in use. These help in designing more efficient algorithms.
4. Efficient Handling of Data

Machine Learning has many factors that make it reliable. One of them is data handling. ML plays the biggest role when it comes to data at this time. It can handle any type of data.

Machine Learning can be multidimensional or different types of data. It can process and analyze these data that normal systems can’t. Data is the most important part of any Machine Learning model. Also, studying and handling of data is a field in itself.
5. Best for Education and Online Shopping

ML would be the best tool for education in the future. It provides very creative techniques to help students study.

Recently in China, a school has started to use ML to improve student focus. In online shopping, the ML model studies your searches. Based on your search history, it would provide advertisements. These will be about your search preferences in previous searches. In this, the search history is the data for the model. This is a great way to improve e-commerce with ML.

Now in TechVidvan’s advantages and disadvantages of Machine Learning article, we will see what are the drawbacks of Machine Learning. Let’s start:
Disadvantages of Machine Learning

Similar to the advantages of Machine Learning, we should also know the disadvantages of Machine Learning. If you don’t know the cons, you won’t know the risks of ML. So, let’s have a look at these disadvantages:
1. Possibility of High Error

In ML, we can choose the algorithms based on accurate results. For that, we have to run the results on every algorithm. The main problem occurs in the training and testing of data. The data is huge, so sometimes removing errors becomes nearly impossible. These errors can cause a headache to users. Since the data is huge, the errors take a lot of time to resolve.
2. Algorithm Selection

The selection of an algorithm in Machine Learning is still a manual job. We have to run and test our data in all the algorithms. After that only we can decide what algorithm we want. We choose them on the basis of result accuracy. The process is very much time-consuming.
3. Data Acquisition

In ML, we constantly work on data. We take a huge amount of data for training and testing. This process can sometimes cause data inconsistency. The reason is some data constantly keep on updating. So, we have to wait for the new data to arrive. If not, the old and new data might give different results. That is not a good sign for an algorithm.
4. Time and Space

Many ML algorithms might take more time than you think. Even if it’s the best algorithm it might sometimes surprise you. If your data is large and advanced, the system will take time. This may sometimes cause the consumption of more CPU power. Even with GPUs alongside, it sometimes becomes hectic. Also, the data might use more than the allotted space.
Summary

From this article, we can understand more closely about ML. The pros and cons of technology tell you the exact details of it. It is important to know the advantages and disadvantages of Machine Learning because it will help you. In ways like algorithm designing, decision making, etc. These were some of the most important advantages and disadvantages of Machine Learning.
