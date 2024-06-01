from Day import Day

class Week:
    """
    This class represents a week.
    """
    def __init__(self, time_step: int = 15) -> None:
        self._days = [Day(time_step=time_step) for _ in range(7)]

    def __getitem__(self, key):
        return self._days[key]

    def __repr__(self) -> str:
        print_msg = ""

        for i in range(7):
            print_msg += f"----  Day {i+1}  ---\n"
            print_msg += str(self[i]) + "\n"

        return print_msg



