---
title: "Why Linear Regression Beat Gradient Boosting"
date: 2026-09-01
description: "Comparing regression models to predict student exam scores, and discovering that the simplest model generalized best on this dataset."
draft: false
tags: ["posts", "machine-learning"]
---
When people first get into machine learning, there's a temptation to assume that the more sophisticated model will automatically perform better.

I wanted to test that assumption with my first machine learning project: a **Student Performance Predictor** built using Scikit-learn.

The goal was simple. Given information about a student's study habits, attendance, previous scores, sleep, motivation, parental involvement and other academic, social and demographic factors, could a model predict their upcoming exam score?

The dataset contained **18 predictor features** and one target variable: `Exam_Score`, ranging from **55 to 100**.

## Four models, one dataset

Rather than choosing a single algorithm immediately, I compared several regression approaches:

- Linear Regression
- Decision Tree Regressor
- Random Forest Regressor
- Gradient Boosting Regressor

Each model was evaluated using **MAE**, **RMSE**, **R²**, and cross-validation to compare how well they generalized beyond a single train/test split.

The results were surprising.

| Model | MAE | RMSE | R² |
|---|---:|---:|---:|
| Linear Regression | **0.415** | **1.521** | **0.825** |
| Decision Tree (depth 5) | 1.576 | 2.391 | 0.568 |
| Random Forest | Did not outperform Linear Regression | — | — |
| Gradient Boosting | Did not outperform Linear Regression | — | — |

The simplest model consistently performed best on this dataset.

That doesn't mean Linear Regression is universally better than ensemble methods. It simply means that **for this particular problem and dataset**, adding complexity didn't improve predictive performance.

## What the exploratory analysis suggested

Before training any models, I spent time exploring the data.

Two variables stood out immediately:

- **Attendance**
- **Previous Scores**

Both showed clear relationships with final exam performance, while other variables such as parental involvement, motivation and access to resources appeared to contribute smaller differences.

This was also my first real lesson in exploratory data analysis: understanding the dataset often matters just as much as choosing the model.

A model is only as useful as the information it receives.

## Feature engineering is where the real thinking happens

One of the biggest things I learned from this project came from reading Pedro Domingos' paper *A Few Useful Things to Know About Machine Learning*.

His point that **feature engineering is the key** really resonated with me.

Machine learning isn't simply:

1. Collect data
2. Train model
3. Done

Instead, it's an iterative process.

You analyse the results, rethink the representation of the data, experiment with new features or transformations, adjust the learner, and repeat.

That was probably the most interesting part of the project because it showed me that improving a model often involves improving the **data representation**, not just swapping algorithms.

## Correlation does not imply causation

Another lesson from both the project and Domingos' paper was one of the most important principles in data science:

> **Correlation ≠ causation**

Just because attendance correlates strongly with exam score doesn't mean attendance alone causes higher grades.

There could be many other factors involved, including study habits, previous academic ability or environmental influences.

The opposite is also worth remembering.

A feature with little correlation on its own isn't automatically useless. Sometimes variables become valuable **in combination** with others, which is one reason feature engineering and model experimentation are so important.

Machine learning is excellent at identifying predictive relationships, but predictive relationships should never automatically be interpreted as causal ones.

## Where the model still struggled

Despite the strong performance, the model wasn't perfect.

Looking beyond the evaluation metrics revealed an important limitation.

The predicted scores were compressed towards the middle of the range, producing predictions of roughly **55.5–78.2**, while the actual scores ranged from **55–98**.

In practice, this meant the model tended to **under-predict unusually high-performing students**.

That was a valuable lesson because it showed why metrics alone aren't enough. Residual plots and predicted-vs-actual visualizations often reveal behaviours that a single R² value cannot.

## Final takeaway

The biggest conclusion from this project wasn't that Linear Regression is better than Gradient Boosting.

It was that **the best model is the one that generalizes best for the problem you're solving**.

For this dataset, Linear Regression achieved the strongest results, while more complex tree-based and ensemble models added complexity without improving performance. The experiment reinforced something I think I'll carry into future ML projects: start with a solid baseline, understand the data deeply, and let the results guide model selection rather than assuming the fanciest algorithm will win.

This was my first machine learning project, but definitely not my last. I'm looking forward to exploring more datasets, experimenting with better feature engineering, and applying these lessons to increasingly challenging problems.
