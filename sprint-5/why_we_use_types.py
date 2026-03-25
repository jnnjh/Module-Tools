#=================================================================================
# Exercise 1: Predict what double("22") will do. Then run the code and check.
# Did it do what you expected? Why did it return the value it did?
#=================================================================================
def double(value):
    return value * 2

# Prediction:
# double("22") will return "2222" because when you multiply a string by
#  an integer in Python, it concatenates the string that many times.
#  So "22" * 2 will result in "22" + "22", which is "2222".

print("Exercise 1: double('22') =", double("22"))

# Actual output: double('22') = 2222

#=================================================================================
# Identify the bug in double()
#=================================================================================
def double_bug(number):
    # Bug: This function is called "double" but multiplies the input by 3 instead of 2.
    # This is a logic error, not a type error
    return number * 3

print("Exercise 2:", double_bug(10))

#=================================================================================
# About half(), double(), second()
#=================================================================================
def half(value):
    return value / 2 

def double(value):
    return value * 2 

def second(value):
    return value[1]
# Prediction and explanation:

# half(22) --> 11.0
# half("hello") --> TypeError, because you cannot divide a string by a number.
# half("22") --> TypeError, because you cannot divide a string by a number.

# double_correct(22) --> 44
# double_correct("hello") --> "hellohello", because multiplying a string by an integer concatenates it.
# double_correct("22") --> "2222"

# second(22) --> TypeError, because you cannot index an integer.
# second(0 x 16) --> TypeError, because you cannot index an integer.
# second("hello") --> "e", because it returns the second character of the string.
# second("22") --> "2", because it returns the second character of the string.

