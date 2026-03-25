from datetime import date
# Exercise 1:
# Advantages of methods over free functions:
# 1- Methods keep related data and behavior together

# 2- Methods make code easier to read (person.is_adult() is clearer than is_adult(person))

# 3- Methods reduce the number of parameters (because self already contains the data)

# 4- Methods help mypy catch more errors (because they belong to a specific class)

# 5- Methods make the code more object‑oriented and easier to extend


#Exercise 2 — Change Person to use date of birth

class Person:
    def __init__(self, name: str, date_of_birth: date, preferred_operating_system: str):
        self.name = name
        self.date_of_birth = date_of_birth
        self.preferred_operating_system = preferred_operating_system


    def is_adult(self):
        today = date.today()
        age = today.year - self.date_of_birth.year

        has_had_birthday_this_year = (
            (today.month, today.day) >= (self.date_of_birth.month, self.date_of_birth.day)
        )
        if not has_had_birthday_this_year:
            age -= 1
        return age >= 18

imran = Person("Imran", date(2000, 1, 1), "Ubuntu")
print(imran.is_adult())