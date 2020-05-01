---
layout: post
title: Programming an RPS Bot - Part 3 - Iocaine Powder
tags: sciencementors2019 python
---
## What is Iocaine Powder?
Iocaine Powder is a program that was originally developed by Dan Egnor in 1999 to participate in the First International RoShamBo Programming Competition. It managed to win in all categories and beat all of it's opponents. Iocaine Powder utilises a predictive meta-strategy to defeat its opponents.

<!--more-->

The meta-strategy is used to determine which of its predictive algorithms (strategies) to utilise (of which there are three, but more on that later). Once a strategy has been picked using the meta-strategy, that strategy is then split into 6 different strategies. These strategies are essentially used to counter second-guessing and third-guessing by the opponent.

<hr>

To explain this, let's assume that the algorithm that the first meta-strategy picked is named **P**. This algorithm contains six different mini-strategies:
- **P<sup>0</sup>** naive application:

	P<sup>0</sup> assumes that the opponent is vulnerable to a basic initial prediction. Quite simple really. If the program predicts that the opponent will pick Rock, play Paper.


- **P<sup>1</sup>** second-guessing:

	P<sup>1</sup> assumes that the opponent has predicted that you will use P<sup>0</sup>. If P<sup>0</sup> predicts that the opponent will play Rock, P<sup>1</sup> assumes that they have guessed that you will play Paper and that they will play Scissors. P<sup>1</sup> counters with Rock.


- **P<sup>2</sup>** third-guessing:

	P<sup>2</sup> assumes that the opponent has predicted that you will use P<sup>1</sup>. If P<sup>0</sup> predicts that the opponent will play Rock, P<sup>1</sup> assumes that they have guessed that you will play Paper and that they will play Scissors. P<sup>1</sup> counters with Rock. Assume that the opponent has figured out that you will play Rock and plays Paper to counter it. Using P<sup>2</sup>, the program plays scissors.


- **'P<sup>0</sup>** assume that the opponent uses P<sup>0</sup>:

	'P<sup>0</sup> assumes that the opponent will use P<sup>0</sup> and plays to counter it. So if P<sup>0</sup> predicts that you will play Rock, then your opponent's P<sup>0</sup> would play Paper. 'P<sup>0</sup> would then play Scissors.


- **'P<sup>1</sup>** assume that the opponent uses P<sup>0</sup>:

	'P<sup>1</sup> assumes that the opponent will use P<sup>1</sup> and plays to counter it. So if P<sup>1</sup> predicts that you will play Paper, then your opponent's P<sup>1</sup> would play Scissors. 'P<sup>1</sup> would then play Rock.


- **'P<sup>2</sup>** assume that the opponent uses P<sup>0</sup>:

	'P<sup>2</sup> assumes that the opponent will use P<sup>2</sup> and plays to counter it. So if P<sup>2</sup> predicts that you will play Scissors, then your opponent's P<sup>2</sup> would play Rock. 'P<sup>2</sup> would then play Paper.

<hr>

Iocaine Powder makes the assumption that an opponent will use the same strategy until they start losing consistently. At the end of each round, Iocaine Powder will calculate the scores for each strategy and predictive algorithm, depending on whether it would have won or lost depending on the opponent's input. If the strategy would have won, it's score is incremented by 1. If a strategy would've lost, it's score is reduced by 1 and if a strategy would've drawn, it is given 0 points. When it needs to pick a strategy, Iocaine Powder just picks the strategy with the highest score.

<hr>

Iocaine Powder has three main predictive algorithms:
- **Random Guess:**
This is mainly used if the program is on a losing streak. Random guessing is used to counteract the possibility that another bot has been able to consistently predict the moves of this program.

- **Frequency Analysis:**
Check out [this](http://emmanuelmenon.github.io/2019/06/03/frequency-analysis-in-rock-paper-scissors/) article which was written by me!

- **History Matching:**
This predictor uses the history of the opponents moves and looks for a pattern in the last *x* moves by comparing it to more recent results. If a similar pattern is found, this function returns the move the opponent made afterwards previously.

Iocaine Powder uses different variations of these three predictors, using the same scoring system detailed above for each variation.

<hr>

## Code behind Iocaine Powder

I am not going to explain each line of code, like I did in my previous two "Programming an RPS Bot"'s. This is because there are about 362 lines of code and also because I feel really embarrassed about the inefficiency of most of the code. Many, many stupid decisions were made and no amount of therapy will help.

However, I will add a [link](https://github.com/emmanuelmenon/RoShamBots/blob/master/IocainePowder.py) to the code so that you can marvel at my stupidity.

You can play against Iocaine Powder [here](http://www.rpscontest.com/human/5758490110853120?).
