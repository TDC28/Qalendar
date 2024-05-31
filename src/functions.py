def get_next_time(time: int):
    hour = time // 100
    minutes = time % 100 + 15

    if minutes >= 60:
        minutes -= 60
        hour += 1

    return hour * 100 + minutes
