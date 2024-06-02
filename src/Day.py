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
        for time in self._timeslots:
            minutes = time % 100
            minutes_str = str(minutes) if len(str(minutes)) == 2 else "0" + str(minutes)
            hour = time // 100
            hour_str = str(hour) if len(str(hour)) == 2 else "0" + str(hour)
            print_msg = (
                print_msg
                + hour_str
                + ":"
                + minutes_str
                + "  -  "
                + self._timeslots[time]
                + "\n"
                if self._timeslots[time] != "Empty" and self._timeslots[time] != "Sleep"
                else print_msg
            )

        return print_msg

    def book_timeslot(self, activity: str, timeslot: int) -> None:
        """
        book_time_slot(self, activity, timeslot) books calendar at time 'time_slot' for
            the given activity 'activity'.
        Requires: timeslot is a valid timeslot in the calendar
        """
        self._timeslots[timeslot] = activity
        return None

    def get_timeslots(self):
        """
        get_timeslots(self) produces all the valid timeslots in the day.
        """
        return self._timeslots.keys()

    def get_activity(self, time: int):
        """
        get_sctivity(self, time) produces the activity at time 'time'
        """
        return self._timeslots[time]

    def get_next_time(self, time):
        """
        blablabla docstring
        """
        hours = time // 100
        minutes = time % 100 + self._time_step

        if minutes >= 60:
            minutes -= 60
            hours += 1

        return (hours * 100 + minutes) % 2400


