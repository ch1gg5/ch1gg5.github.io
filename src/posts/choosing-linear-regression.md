---
title: "Why Linear Regression Beat Gradient Boosting"
date: 2026-08-19
description: "Comparing four regression models to predict student exam scores, and finding that the simplest one, not the most complex, generalised best."
tags: ["posts", "machine-learning"]
---
The instinct with a regression problem is to reach for the fanciest model available and let it sort out the relationships in the data. I built the Student Performance Predictor specifically to test that instinct against a dataset it might not deserve: 13 numerical and categorical features (hours studied, attendance, parental involvement, motivation level, teacher quality, and so on) predicting a single exam score between 55 and 100.

## Four models, one dataset

I compared four regressors head to head: Linear Regression as the baseline, a Decision Tree, Random Forest, and Gradient Boosting, evaluated on MAE, RMSE, R², and 5-fold cross-validation so the comparison wasn't resting on a single lucky train/test split.

Linear Regression won, and not narrowly:

| Model | MAE | RMSE | R² |
|---|---|---|---|
| Linear Regression | 0.415 | 1.521 | 0.825 |
| Decision Tree (depth 5) | 1.576 | 2.391 | 0.568 |
| Random Forest | n/a | n/a | did not surpass Linear Regression |
| Gradient Boosting | n/a | n/a | did not surpass Linear Regression |

An unrestricted decision tree overfit badly; even after tuning depth, it stayed well below the linear baseline. Random Forest and Gradient Boosting, tuned across learning rates and estimator counts, never closed the gap either.

## Why the simple model won

The exploratory analysis pointed at the answer before any model was fit. Attendance and previous scores showed a strong, close-to-linear relationship with the final exam score, and the other features (parental involvement, access to resources, motivation) contributed smaller, fairly additive effects. When the true relationship in the data is mostly linear, a linear model doesn't just match tree-based ensembles: it beats them, because it isn't spending capacity fitting noise that a tree-based method will happily carve decision boundaries around.

Linear Regression held a strong correlation (r ≈ 0.909) between predicted and actual scores across cross-validation folds, which is what actually earns the "generalises well" claim rather than a single good test split.

## Where it still fails

The model isn't perfect, and the residuals say exactly where. Predictions compress toward the mean: the predicted range came out around 55.5–78.2 against an actual range of 55–98, meaning the model consistently under-predicts unusually high-scoring students. That's a real limitation, not a rounding error, and it's the kind of thing cross-validation metrics alone won't surface; it took looking at the residual plot directly.

The honest conclusion isn't "linear regression is always right." It's narrower and more useful than that: the remaining error here looks like variance the available 13 features simply don't explain, not a gap that a more complex model could close. Reaching for Gradient Boosting by default would have added complexity without buying back any of that error. Worth checking before assuming the fancier tool is the better one.
