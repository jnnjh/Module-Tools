# Think of the advantages of using methods instead of free functions. Write them down in your notebook.

# ANSWER: Related code stays together, Methods can directly access the object's data, it has better encapsulation and manages it's own behaviour than relying on external functions.

# Change the Person class to take a date of birth (using the standard library’s datetime.date class) and store it in a field instead of age.

# Update the is_adult method to act the same as before.

from datetime import date


class Person:
    def __init__(
        self,
        name: str,
        date_of_birth: date,
        preferred_operating_system: str,
    ):
        self.name = name
        self.date_of_birth = date_of_birth
        self.preferred_operating_system = preferred_operating_system

    def is_adult(self):
        today = date.today()

        age = today.year - self.date_of_birth.year

        if (
            today.month,
            today.day,
        ) < (
            self.date_of_birth.month,
            self.date_of_birth.day,
        ):
            age -= 1

        return age >= 18


imran = Person(
    "Imran",
    date(2004, 5, 20),
    "Ubuntu",
)

print(imran.is_adult())