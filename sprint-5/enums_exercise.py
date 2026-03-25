# exercise
# Write a program which:

# Already has a list of Laptops that a library has to lend out.
# Accepts user input to create a new Person - it should use the input function to read a person’s name,
# age, and preferred operating system.
# Tells the user how many laptops the library has that have that operating system.
# If there is an operating system that has more laptops available, tells the user that
# if they’re willing to accept that operating system they’re more likely to get a laptop.

from dataclasses import dataclass
from enum import Enum
from typing import List
import sys

class OperatingSystem(Enum):
    MACOS = "macOS"
    ARCH = "Arch Linux"
    UBUNTU = "Ubuntu"

@dataclass(frozen=True)
class Laptop:
    id: int
    manufacturer: str
    model: str
    screen_size_in_inches: float
    operating_system: OperatingSystem

laptops: List[Laptop] = [
    Laptop(id=1, manufacturer="Dell", model="XPS", screen_size_in_inches=13, operating_system=OperatingSystem.ARCH),
    Laptop(id=2, manufacturer="Dell", model="XPS", screen_size_in_inches=15, operating_system=OperatingSystem.UBUNTU),
    Laptop(id=3, manufacturer="Dell", model="XPS", screen_size_in_inches=15, operating_system=OperatingSystem.UBUNTU),
    Laptop(id=4, manufacturer="Apple", model="macBook", screen_size_in_inches=13, operating_system=OperatingSystem.MACOS),
]

def convert_os(user_input: str) -> OperatingSystem:
    for os_value in OperatingSystem:
        if user_input.lower() == os_value.value.lower():
            return os_value
        print(f"Error: '{user_input}' is not a valid operating system.", file=sys.stderr)
        sys.exit(1)

# Get user input
name = input("Enter your name: ").strip()
age_input = input("Enter your age: ").strip()
if not age_input.isdigit():
    print(f"Error: '{age_input}' age must be a number.", file=sys.stderr)
    sys.exit(1)
age = int(age_input)

os_input = input("Enter your preferred operating system (macOS, Arch Linux, Ubuntu): ").strip()
preferred_os = convert_os(os_input)

# Count laptops with the preferred operating system
matching_laptops = [laptop for laptop in laptops if laptop.operating_system == preferred_os]
print(f"\nHi {name}, there are {len(matching_laptops)} laptops available with {preferred_os.value}.")

# Check if there are better laptops with a different operating system
counts ={os: 0 for os in OperatingSystem}
for laptop in laptops:
    counts[laptop.operating_system] += 1

best_os = max(counts, key=counts.get)
if best_os != preferred_os:
    print(f"if you’re willing to accept {best_os.value} you’re more likely to get a laptop, as there are {counts[best_os]} available.")