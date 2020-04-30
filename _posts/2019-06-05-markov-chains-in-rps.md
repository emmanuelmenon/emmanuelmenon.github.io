---
layout: post
title: Programming an RPS Bot - Part 2 - Markov Chains
tags: sciencementors2019 python
---
### What are Markov Chains?
Markov Chains are stochastic models that demonstrate the probability of transition from one state to another. For example, imagine that every single day, I have two options. I can either go for a run, or not go for a run. The probability of me **not** going for a run today is 65%, which means that the probability of me going for a run today has to be 35%. However, if I decided to go for a run yesterday, the chances of me going for run today might be higher (let's say about 70%), which means that there is a lower chance of me not running today. But if I decided not to go for a run yesterday, I probably won't go for a run today either (let's assume that the chances of me not running today after I didn't run yesterday is about 55%). So how would I represent this using a Markov Chain model?

<!--more-->

Well, first let's just write down the probabilities of transitition from each state:
- **Probability of running today after running yesterday**: 70%
- **Probability of *not* running today after running yesterday**: 30%
- **Probability of running today after *not* running yesterday**: 45%
- **Probability of *not* running today after *not* running yesterday**: 55%

Next, we can draw out the model.
![Running Model Image](https://i.lensdump.com/i/Wnr5U0.jpg)

But what if there were three states? Or four states? Or five state? It gets painful to draw out one of these everytime we want to use the Markov model. That's where a transition matrix come in.

A transition matrix is used to show the possibility of each transition within a table. Every state is used once as a row and as a column and each cell shows the probabilty of transitioning from one state to another. A transition matrix for the running model would look like this (P is shorthand for probability).

| | Running | Not Running |
| Running | P(Running -> Running): *70%* | P(Running -> Not Running): *30%*
| Not Running | P(Not Running -> Running): *45%* | P(Not Running -> Not Running): *55%*

This introduction to Markov Chains was extremely simple, as I just wanted to introduce the concept before explaining my code. Markov Chains can be used for a lot of other things and I recommend you do your own research as well. Some useful links:
- <http://setosa.io/blog/2014/07/26/markov-chains/index.html>
- <https://en.wikipedia.org/wiki/PageRank>
- <https://en.wikipedia.org/wiki/Markov_chain>
- <https://brilliant.org/wiki/markov-chains/>

***

### Using Markov Chains to make an RPS bot
Creating a bot which utilises Markov Chains to make a pick is extremely simple. I began by importing two modules.
```python
import random
from decimal import Decimal
```
- `import random`: Imports the random module. Will be used to pick randomly for the first move, as well as to pick randomly from the percentage list that is generated later.
- `from decimal import Decimal`: Imports the Decimal type from the decimal module. It will be used to generate the percentage list.

Next, we declare our main variables.
```python
transitionTable = {"R": {"S": 0, "P": 0, "R": 0}, "S": {"S": 0, "P": 0, "R": 0}, "P": {"S": 0, "P": 0, "R": 0}}

playCount = {"R": 0, "P": 0, "S": 0}
choices = ["R", "P", "S"]
winningMoves = {"R": "P", "P": "S", "S": "R"}
oppMoveHistory = []
```
- `transitionTable`: This variable stores our transition matrix as a set of nested dictionaries. The keys that store the dictionaries are the picks that are being transitioned **from** while the values inside the nested dictionary will contain the picks that are being transitioned **to**.
    - For example, the left-most `R` is the value that is being transitioned from, while the `{"S": 0, "P": 0, "R": 0}` dictionary that it is paired to will hold the values that are being transitioned to as keys and the probabilty of that transition occuring as values.
- `playCount`: This variable is assigned to the number of times that each pick has been played throughout the program's life
- `choices`: This is a list of possible picks.
- `winningMoves`: This is a dictionary where each key is paired to the value that beats it.
- `oppMoveHistory`: This will store the opponent's every move.

I then decided to write a function that updates the transition matrix.
```python
def updater():
    playCount[oppMoveHistory[-1]] += 1

    if len(oppMoveHistory) > 1:
        editDict = transitionTable[oppMoveHistory[-2]]
        editDict[oppMoveHistory[-1]] += 1
```
- `def updater()`: Defines a function that takes no arguments.
- `playCount[oppMoveHistory[-1]] += 1`: Increments the number of times the number of times that the last move has been played by one.
- `if len(oppMoveHistory) > 1:`: This essentially checks whether there is more than two things to update in the dictionary. Because if there is only one thing in the move history, there is nothing to update.
- `editDict = transitionTable[oppMoveHistory[-2]]`: Takes the second last move, grabs the relevant dictionary from the transition table, and updates it.
- `editDict[oppMoveHistory[-1]] += 1`: Takes the last move, increments the relevant pick within the nested dict.

After that, I wrote a function that would populate a list based on values from the transition matrix, pick randomly from that list, and beat the value that was picked from that list.
```python
def pickMaker():
    percentageTable = {"R": 0, "P": 0, "S:" 0}
    percentageList = []
    editDict = transitionTable[oppMoveHistory[-1]]

    for key, value in editDict.items():
        percentageTable[key] = int(Decimal((value / (playCount[oppMoveHistory[-1]]- 1))*100))
        for count in range(percentageTable[key])
            percentageList.append(key)

    oppPick = percentageList[random.randint(0, len(percentageList) - 1)]

    return winningMoves[oppPick]
```
- `def pickMaker():`: Defines a function called pickMaker that takes no arguments.
- `percentageTable`: percentageTable starts off empty each time the function runs. Later, in the for loop, it will be updated with percentage values from editDict.
- `percentageList`: Similar to percentageTable, starts off empty. It will be populated with possible picks based on the percentage values.
- `editDict = transitionTable[oppMoveHistory[-1]]`: Stores the portion of the dictionary that contains the values for the current state.
- `for key, value in editDict.items():`: Essentially iterates through editDict storing the key and value.
- `percentageTable[key] = int(Decimal((value / (playCount[oppMoveHistory[-1]]- 1))*100))`: There is a lot to unpack here so I'll go through it step-by-step:
    - `percentageTable[key] = `: This is the part of the dictionary that we will update with our percentage.
    - `int()`: The `int()` function just converts the value within the brackets to an integer. Also has the benefit of rounding.
    - `Decimal()` The `Decimal()` function also converts the value within the brackets to a decimal.
    - `(value / (playCount[oppMoveHistory[-1]]- 1))*100`: Takes the value in editDict, divides it by the number of times that the value it is transitioning from has been played and multiplies it by 100, making it a percentage.
- `for count in range(percentageTable[key]):`: Runs up to the specified number of times.
- `percentageList.append(key)`: Appends the current key to the percentage list.
- `oppPick = percentageList[random.randint(0, len(percentageList) - 1)]`: This is another one that I will have to unpack:
    - `oppPick`: The pick that we predict the opponent will make.
    - `percentageList[random.randint(0, len(percentageList) - 1)]]`: Selects a random value within the percentageList.
- `return winningMoves[oppPick]`: Return the move that beats `oppPick`.

We are almost done! All we have to do now is add in the basic stuff.
```python
if input is not "":
    oppMoveHistory.append()
    updater()
    output = picker()
else:
    output = random.choice(choices)
```
- `if input is not "":`: `input` is a global variable provided by (RPSContest.com)[RPSContest.com]. It stores the previous input made by the bot's opponent. If it is empty, that means that this is the first round.
- `oppMoveHistory.append()`: Adds the latest move to the move history
- `updater()`: Updates the transition table
- `output = pickMaker()`: `output` is the global variable that RPSContest.com reads. `pickMaker()` makes a pick that it thinks will win.
- `else:`: If the conditions of the if statement are not fulfilled, the code below is run
- `output = random.choice(choices)`: Picks randomly from the choice list.

And we are done! If you would like to play against this bot, click [here](http://www.rpscontest.com/human/5678786255257600?).

Although my mentor and I chose to create two separate versions of this program. One of them, the one you see here, picks from a percentage populated list, while the other assumes that the opponent will pick the one with the highest value. This code could easily be adapted to do that and I encourage you to try to.

### Full Code:
```python
import random
from decimal import Decimal

transitionTable = {"R": {"S": 0, "P": 0, "R": 0}, "S": {"S": 0, "P": 0, "R": 0}, "P": {"S": 0, "P": 0, "R": 0}}
playCount = {"R": 0, "P": 0, "S": 0}
choices = ["R", "P", "S"]
winningMoves = {"R": "P", "P": "S", "S": "R"}
oppMoveHistory = []

def updater():
    playCount[oppMoveHistory[-1]] += 1

    if len(oppMoveHistory) > 1:
        editDict = transitionTable[oppMoveHistory[-2]]
        editDict[oppMoveHistory[-1]] += 1

def pickMaker():
    percentageTable = {"R": 0, "P": 0, "S:" 0}
    percentageList = []
    editDict = transitionTable[oppMoveHistory[-1]]

    for key, value in editDict.items():
        percentageTable[key] = int(Decimal((value / (playCount[oppMoveHistory[-1]]- 1))*100))
        for count in range(percentageTable[key])
            percentageList.append(key)

    oppPick = percentageList[random.randint(0, len(percentageList) - 1)]

    return winningMoves[oppPick]

if input is not "":
    oppMoveHistory.append()
    updater()
    output = picker()
else:
    output = random.choice(choices)
```
