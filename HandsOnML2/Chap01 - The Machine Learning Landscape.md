# 1. Chap01 - The Machine Learning Landscape

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

A big challenge with online learning is that if bad data is fed to the system, the sys‐tem’s performance will gradually decline. To reduce this risk, you need to monitor your system closely and promptly switch learning off (and possibly revert to a previously working state) if you detect a drop in perfor‐mance. You may also want to monitor the input data and react to abnormal data (e.g., using an anomaly detection algorithm。

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

- Feature selection (selecting the most useful features to train on among existing features)
- Feature extraction (combining existing features to produce a more useful one—as we saw earlier, dimensionality reduction algorithms can help)
- Creating new features by gathering new data Now that we have looked at many examples of bad data.

### 1.2.5. Overfitting the Training Data

Say you are visiting a foreign country and the taxi driver rips you off. You might be tempted to say that all taxi drivers in that country are thieves. Overgeneralizing is something that we humans do all too often, and unfortunately machines can fall into the same trap if we are not careful. In Machine Learning this is called overfitting: it means that the model performs well on the training data, but it does not generalize well.

### 1.2.6. Underfitting the Training Data

As you might guess, underfitting is the opposite of overfitting: it occurs when your model is too simple to learn the underlying structure of the data. For example, a lin‐ear model of life satisfaction is prone to underfit; reality is just more complex than the model, so its predictions are bound to be inaccurate, even on the training examples.
Here are the main options for fixing this problem:

- Select a more powerful model, with more parameters.
- Feed better features to the learning algorithm (feature engineering).
- Reduce the constraints on the model (e.g., reduce the regularization hyperpara‐meter).

### 1.2.7. Summary

Machine Learning is about making machines get better at some task by learning from data, instead of having to explicitly code rules.

- There are many different types of ML systems: supervised or not, batch or online, instance-based or model-based.
- In an ML project you gather data in a training set, and you feed the training set to a learning algorithm. If the algorithm is model-based, it tunes some parameters to fit the model to the training set (i.e., to make good predictions on the training set itself), and then hopefully it will be able to make good predictions on new cases as well. If the algorithm is instance-based, it just learns the examples by heart and generalizes to new instances by using a similarity measure to compare them to the learned instances.
- The system will not perform well if your training set is too small, or if the data is not representative, is noisy, or is polluted with irrelevant features (garbage in, garbage out). Lastly, your model needs to be neither too simple (in which case it will underfit) nor too complex (in which case it will overfit).

### 1.2.8. Testing and Validating

The only way to know how well a model will generalize to new cases is to actually try it out on new cases. One way to do that is to put your model in production and moni‐tor how well it performs. This works well, but if your model is horribly bad, your users will complain—not the best idea.
A better option is to split your data into two sets: the training set and the test set. As these names imply, you train your model using the training set, and you test it using the test set. The error rate on new cases is called the generalization error (or out-ofsample error), and by evaluating your model on the test set, you get an estimate of this error. This value tells you how well your model will perform on instances it has never seen before.

### 1.2.9. Hyperparameter Tuning and Model Selection

Evaluating a model is simple enough: just use a test set. But suppose you are hesitat‐ing between two types of models (say, a linear model and a polynomial model): how can you decide between them? One option is to train both and compare how well they generalize using the test set.
Now suppose that the linear model generalizes better, but you want to apply some regularization to avoid overfitting. The question is, how do you choose the value of the regularization hyperparameter? One option is to train 100 different models using 100 different values for this hyperparameter. Suppose you find the best hyperparame‐ter value that produces a model with the lowest generalization error—say, just 5% error. You launch this model into production, but unfortunately it does not perform as well as expected and produces 15% errors. What just happened? The problem is that you measured the generalization error multiple times on the test set, and you adapted the model and hyperparameters to produce the best model for that particular set. This means that the model is unlikely to perform as well on new data.
A common solution to this problem is called holdout validation: you simply hold out part of the training set to evaluate several candidate models and select the best one.
The new held-out set is called the validation set (or sometimes the development set, or dev set). More specifically, you train multiple models with various hyperparameters on the reduced training set (i.e., the full training set minus the validation set), and you select the model that performs best on the validation set. After this holdout vali‐dation process, you train the best model on the full training set (including the valida‐tion set), and this gives you the final model. Lastly, you evaluate this final model on the test set to get an estimate of the generalization error.

This solution usually works quite well. However, if the validation set is too small, then model evaluations will be imprecise: you may end up selecting a suboptimal model by mistake. Conversely, if the validation set is too large, then the remaining training set will be much smaller than the full training set. Why is this bad? Well, since the final model will be trained on the full training set, it is not ideal to compare candidate models trained on a much smaller training set. It would be like selecting the fastest sprinter to participate in a marathon. One way to solve this problem is to perform repeated cross-validation, using many small validation sets. Each model is evaluated once per validation set after it is trained on the rest of the data. By averaging out all.the evaluations of a model, you get a much more accurate measure of its perfor‐mance. There is a drawback, however: the training time is multiplied by the number of validation sets.

### 1.2.10. Data Mismatch

In some cases, it’s easy to get a large amount of data for training, but this data proba‐bly won’t be perfectly representative of the data that will be used in production. For example, suppose you want to create a mobile app to take pictures of flowers and automatically determine their species. You can easily download millions of pictures of flowers on the web, but they won’t be perfectly representative of the pictures that will actually be taken using the app on a mobile device. Perhaps you only have 10,000 rep‐resentative pictures (i.e., actually taken with the app). In this case, the most important rule to remember is that the validation set and the test set must be as representative as possible of the data you expect to use in production, so they should be composed exclusively of representative pictures: you can shuffle them and put half in the valida‐tion set and half in the test set (making sure that no duplicates or near-duplicates end up in both sets). But after training your model on the web pictures, if you observe that the performance of the model on the validation set is disappointing, you will not know whether this is because your model has overfit the training set, or whether this is just due to the mismatch between the web pictures and the mobile app pictures.
One solution is to hold out some of the training pictures (from the web) in yet another set that Andrew Ng calls the train-dev set. After the model is trained (on the training set, not on the train-dev set), you can evaluate it on the train-dev set. If it performs well, then the model is not overfitting the training set. If it performs poorly on the validation set, the problem must be coming from the data mismatch. You can try to tackle this problem by preprocessing the web images to make them look more like the pictures that will be taken by the mobile app, and then retraining the model.
Conversely, if the model performs poorly on the train-dev set, then it must have over‐fit the training set, so you should try to simplify or regularize the model, get more training data, and clean up the training data.
