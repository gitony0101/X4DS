# Chapter 03 Classification

## Stochastic Gradient Descent

梯度下降-最速下降




带有SGD训练的线性分类器(SVM，逻辑回归等)
该估计器通过随机梯度下降(SGD)学习实现正则化线性模型:
一次估计每个样本的损失梯度，并随着强度进度表(即学习率)的降低而更新模型。SGD允许进行小批量学习
为了使用默认学习率计划获得最佳结果，数据应具有零均值和单位方差
下面使用SGDClassifier进行训练

        class sklearn.linear model.SGDClassifier
        class sklearn.linear_model.SGDClassifier(loss='hinge', penalty='l2', alpha=0.0001,l1_ratio=0.15,fit intercept=True,max_iter=1000,tol=0.001, shuffle=True, verbose=0, epsilon=0.1,n_jobs=None,random_state=None,
        learning_ rate='optimal', eta0=0.0, power_t=0.5, early_stopping=False,validation fraction=0.1, n_iter_no_ change=5,class_ weight=None, warm start=False, average=False
        
        
        

