from dataclasses import dataclass
from datetime import date
# exercise
# Write a Person class using @datatype which uses a datetime.date for date of birth, rather than an int for age.
# Re-add the is_adult method to it.


@dataclass(frozen=True)
class Person:
    name: str
    date_of_birth: date
    preferred_operating_system: str

    def is_adult(self) -> bool:
        today = date.today()
        age = today.year - self.date_of_birth.year

        if(today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day):
            age -= 1    
        return age >= 18

imran = Person("Imran", date(2000, 1, 1), "Ubuntu")
imran2 = Person("Imran", date(2000, 1, 1), "Ubuntu")
print(imran.is_adult())
print(imran == imran2) # True, because dataclasses automatically generate an __eq__ method that compares the fields of the dataclass.