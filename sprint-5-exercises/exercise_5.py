# Add the is_adult code to the file you saved earlier.
# Run it through mypy - notice that no errors are reported - mypy understands that Person has a property named age so is happy with the function.
# Write a new function in the file that accepts a Person as a parameter and tries to access a property that doesn’t exist. Run it through mypy and check that it does report an error.

class Person:
    def __init__(self, name: str, age: int, preferred_operating_system: str):
        self.name = name
        self.age = age
        self.preferred_operating_system = preferred_operating_system

imran = Person("Imran", 22, "Ubuntu")
print(imran.name)
#print(imran.address)

eliza = Person("Eliza", 34, "Arch Linux")
print(eliza.name)
#print(eliza.address)

def is_adult(person: Person) -> bool:
    return person.age >= 18

print(is_adult(imran))

def get_address(person: Person) -> str: # This will report an error.
    return person.address

print(get_address(imran))