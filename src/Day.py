class Day:
    """
    Represents a single day divided into timeslots.
    """

    def __init__(self, time_step: int) -> None:
        self._timeslots = {}
        self._time_step = time_step

        for i in range(int(24 * (60 / time_step))):
            hour = ((i * time_step) // 60) * 100
            minutes = (i * time_step) % 60
            time = hour + minutes  # Time of form HHMM. Example 13:27 will be 1327
            self._timeslots[time] = "Empty"

    def __repr__(self) -> str:
        print_msg = ""
        prev_activity = None
        start_time = None

        sorted_times = sorted(self._timeslots.keys())
        for time in sorted_times:
            current_activity = self._timeslots[time]
            if current_activity != prev_activity:
                if prev_activity and prev_activity != "Empty":
                    print_msg += f"{self.format_time(start_time)} - {self.format_time(prev_time + self._time_step)} ---> {prev_activity}\n"

                if current_activity != "Empty":
                    start_time = time
            prev_activity = current_activity
            prev_time = time

        if prev_activity and prev_activity != "Empty":
            print_msg += f"{self.format_time(start_time)} - {self.format_time(prev_time + self._time_step)} ---> {prev_activity}\n"

        return print_msg

    def format_time(self, time: int):
        minutes = time % 100
        hour = time // 100
            
        if minutes >= 60:
            minutes -= 60
            hour += 1

        minutes_str = str(minutes).zfill(2)
        hour_str = str(hour).zfill(2)
        return f"{hour_str}:{minutes_str}"


    def book_timeslot(self, activity: str, timeslot: int) -> None:
        """
        Books calendar at time 'time_slot' for the given activity.

        Requires: timeslot is a valid timeslot in the calendar.
        """
        self._timeslots[timeslot] = activity
        return None

    def add_activity(self, activity: str, start: int, end: int) -> None:
        """
        Books an activity on multiple timeslots in self from start to end.
        """
        for time in self._timeslots:
            if start <= time < end:
                self._timeslots[time] = activity

        return None

    def get_available_timeslots(self) -> set[int]:
        """
        Produces all the timeslots where no activity is currently booked.
        """
        timeslots = self._timeslots.keys()
        available_timeslots = set()

        for timeslot in timeslots:
            if self._timeslots[timeslot] == "Empty":
                available_timeslots.add(timeslot)

        return available_timeslots

    def get_timeslots(self):
        """
        Produces all the valid timeslots in the day.
        """
        return self._timeslots.keys()

    def get_activity(self, time: int):
        """
        Produces the activity at a given timeslot.

        Requires: time is a valid timeslot.
        """
        return self._timeslots[time]
