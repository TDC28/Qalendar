from Day import Day

class Week:
    def __init__(self) -> None:
        self.days = [Day(time_step=15) for _ in range(7)]
