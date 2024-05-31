from functions import get_next_time

class Day:
    def __init__(self, time_step: int) -> None:
        time_step = 15 # For now
        self.time_slots = {}
        self.time_step = time_step

        for i in range(24 * (60 // time_step)):
            hour = ((i * time_step) // 60) * 100
            minutes = (i * time_step) % 60
            time = hour + minutes  # Time of form HHMM. Example 13:27 will be 1327
            self.time_slots[time] = "Emtpy"

    def __repr__(self) -> str:
        print_msg = ""
        for time in self.time_slots:
            minutes = (time % 100) % 60
            minutes_str = str(minutes) if len(str(minutes)) == 2 else "0" + str(minutes)
            hour = time // 100
            hour_str = str(hour) if len(str(hour)) == 2 else "0" + str(hour)
            print_msg += (hour_str + ":" + minutes_str + "  -  " + self.time_slots[time] + "\n")

        return print_msg


    def set_unavailable_hours(self, start: int, end: int) -> None:
        """
        set_unavailable_hours(self, start, end) removes time slots from self.time_slots where
            user specifies.
        """
        time = start

        while time < end:
            self.time_slots.pop(time)
            time = get_next_time(time) 

        return None



