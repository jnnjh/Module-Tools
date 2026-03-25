# Exercise 1 — Save the above code to a file, and run it through mypy.
#Read the error, and make sure you understand what it’s telling you.

class Person:
    def __init__(self, name: str, age: int, preferred_operating_system: str):
        self.name = name
        self.age = age
        self.preferred_operating_system = preferred_operating_system

imran = Person("Imran", 22, "Ubuntu")
print(imran.name)
print(imran.address) # mypy error: "Person" has no attribute "address"

eliza = Person("Eliza", 34, "Arch Linux")
print(eliza.name)
print(eliza.address) # mypy error: "Person" has no attribute "address"

# Exercise 2 — Add the is_adult code to the file you saved earlier.

# Run it through mypy - notice that no errors are reported -
# mypy understands that Person has a property named age so is happy with the function.

# Write a new function in the file that accepts a Person as a 
# parameter and tries to access a property that doesn’t exist. Run it through mypy and check that it does report an error.
def is_adult(person: Person) -> bool:
    return person.age >= 18

print(is_adult(imran)) # True

def get_favorite_food(person: Person) -> str:
    return person.favorite_food # mypy error: "Person" has no attribute "favorite_food"

