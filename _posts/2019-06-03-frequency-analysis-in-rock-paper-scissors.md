---
layout: post
title: Programming an RPS Bot - Part 1 - Frequency Analysis and Randomness
tags: sciencementors2019 python
---
### Random Choice
I began with creating the simplest bot I could think of. A bot which picks randomly every time. Here's the code:

<!--more-->

```python
import random
output = random.choice(["R", "P", "S"])
```

Although this code is extremely simple, I have made a rule for myself that in these posts, I will explain what each portion of the code does, no matter how simple.
1. `import random`: Imports a python module named RANDOM. The [random module](https://docs.python.org/3/library/random.html) is used to pick from a list in the next line
2. `output`: Output is the global variable that is read by [RPSContest.com](http://www.rpscontest.com) when playing against/with the bot
3. `random.choice()`: Takes a list as an argument and returns a value that is picked randomly
4. `["R", "P", "S"]`: Represents rock, paper and scissors

You can play against the random choice bot [here](http://www.rpscontest.com/human/5706164826275840?).

***

### Frequency Analysis
Since both of these bots aren't too complex, I decided to just chuck both my explanations in a single post.

This bot essentially returns a move that counters the user's preferred input.

```python
import random
import operator

pickCounter = {"R": 0, "P": 0, "S": 0}
winningMoves = {"R": "P", "P": "S", "S": "R"}

def getDictMax(dictionary):
    return max(dictionary.items(), key=operator.itemgetter(1))[0]

if input is "":
    output = random.choice(["R", "P", "S"])
else:
    pickCounter[input] += 1
    output = winningMoves[getDictMax(pickCounter)]
```

1. `import random`: Imports a python module named RANDOM. The [random module](https://docs.python.org/3/library/random.html) is used to pick from a list in the next line
2. `import operator`: Imports a python module named OPERATOR. The [operator module](https://docs.python.org/3/library/operator.html) contains a set of functions that does the same thing as python operators such as `+`, `-`, `/` and `*`. In my code, it is used for it's `itemgetter()` function
3. `pickCounter`: Dictionary that maps each of the possible outputs to the number of times that it has been played. A dictionary has been used here to save me from having to create 3 separate variables
4. `winningMoves`: This is another dictionary that maps possible picks to the value that beats that pick. For example, paper beats rock, so in the dictionary, it appears as `"R": "P"`
5. `def getDictMax(dictionary)`: This is a function that will return the key with the largest value in the provided dictionary.
6. `max()`: The `max()` function compares a bunch of values and returns the largest
7. `dictionary.items()`: Returns a list of all the items in the dictionary specified in the function argument
8. `key=`: Specifies whether to find the max by the key or the value
9. `operator.itemgetter(1)`: Returns the second element in a provided list (lists in Python are zero-indexed)
10. `[0]`: Just returns first value in the tuple. Without `[0]`, calling getDictMax(dictionary) would return `("pick", value)`
11. `if input is ""`: On [RPSContest.com](rpscontest.com), input does not actually get user input (as it would normally). Input is actually a global variable that contains the opponents previous move. If nothing has been played(e.g. this is the first round), the variable would be empty. If the variable is empty, I will not be able to use frequency analysis to determine what to play
12. `output`: Output is the global variable that is read by [RPSContest.com](http://www.rpscontest.com) when playing against/with the bot
13. `random.choice()`: : Takes a list as an argument and returns a value that is picked randomly
14. `pickCounter[input] += 1`: Increment the relevant variable in the dictionary by 1, signifying that it has been played one more time
15. `winningMoves[]`: Will return the move that beats the provided one
16. `getDictMax(pickCounter)`: Calls getDictMax on the pickCounter dictionary. Will return the opponent's predicted move

That's a lot of explanation for 11 lines of code (*damn, my fingers are cramping up*), so I might have to break the next segment (Markov Chains) into muliple parts. if you wish to do so, you can play against the frequency analysis bot [here](http://www.rpscontest.com/human/5118816036061184?).
