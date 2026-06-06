# Write a program which:
# Already has a list of Laptops that a library has to lend out.
# Accepts user input to create a new Person - it should use the input function to read a person’s name, age, and preferred operating system.
# Tells the user how many laptops the library has that have that operating system.
# If there is an operating system that has more laptops available, tells the user that if they’re willing to accept that operating system they’re more likely to get a laptop.

from dataclasses import dataclass
from enum import Enum
from typing import List
import sys


class OperatingSystem(Enum):
    MACOS = "macOS"
    ARCH = "Arch Linux"
    UBUNTU = "Ubuntu"


@dataclass(frozen=True)
class Person:
    name: str
    age: int
    preferred_operating_system: OperatingSystem


@dataclass(frozen=True)
class Laptop:
    id: int
    manufacturer: str
    model: str
    operating_system: OperatingSystem


laptops: List[Laptop] = [
    Laptop(1, "Dell", "XPS", OperatingSystem.ARCH),
    Laptop(2, "Dell", "XPS", OperatingSystem.UBUNTU),
    Laptop(3, "Dell", "XPS", OperatingSystem.UBUNTU),
    Laptop(4, "Apple", "MacBook", OperatingSystem.MACOS),
]


def parse_operating_system(value: str) -> OperatingSystem:
    for operating_system in OperatingSystem:
        if value == operating_system.value:
            return operating_system

    print(
        f"Invalid operating system: {value}",
        file=sys.stderr,
    )
    sys.exit(1)


name = input("Name: ")

age_input = input("Age: ")
try:
    age = int(age_input)
except ValueError:
    print("Age must be a whole number.", file=sys.stderr)
    sys.exit(1)

print("Available operating systems:")
for operating_system in OperatingSystem:
    print(f"- {operating_system.value}")

os_input = input("Preferred operating system: ")
preferred_operating_system = parse_operating_system(os_input)

person = Person(
    name=name,
    age=age,
    preferred_operating_system=preferred_operating_system,
)

matching_laptops = [
    laptop
    for laptop in laptops
    if laptop.operating_system == person.preferred_operating_system
]

print(
    f"There are {len(matching_laptops)} laptops available "
    f"for {person.preferred_operating_system.value}."
)

counts = {}

for operating_system in OperatingSystem:
    counts[operating_system] = len(
        [
            laptop
            for laptop in laptops
            if laptop.operating_system == operating_system
        ]
    )

best_operating_system = max(
    counts,
    key=counts.get,
)

if best_operating_system != person.preferred_operating_system:
    print(
        f"If you're willing to use "
        f"{best_operating_system.value}, "
        f"there are {counts[best_operating_system]} "
        f"laptops available."
    )