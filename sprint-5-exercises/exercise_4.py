# Save the above code to a file, and run it through mypy.
# Read the error, and make sure you understand what it’s telling you.

class Person:
    def __init__(self, name: str, age: int, preferred_operating_system: str):
        self.name = name
        self.age = age
        self.preferred_operating_system = preferred_operating_system

imran = Person("Imran", 22, "Ubuntu")
print(imran.name)
print(imran.address)

eliza = Person("Eliza", 34, "Arch Linux")
print(eliza.name)
print(eliza.address)

# ANSWER: The error says 'Person" has no attribute "address"'. We wanted to print imran.address and eliza.address but we don't have address attribute, hence the error.