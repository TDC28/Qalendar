# Qalendar

A calendar application that is optimized using DWave's quantum annealers.

## Installation

```bash
git clone https://github.com/TDC28/Qalendar.git
```

> [!NOTE]
> To try Qalendar from the terminal, change the branch from 'main' to 'test'.

## Using Qalendar

Using Qalendar requires you to run the backend and the frontend locally, since the project is not hosted (and never will be).

- Frontend
```bash
cd frontend
npm install
npm run dev
```

- Backend

> [!WARNING]
> You should use a virtual environment for this project.

```bash
cd QalendarProject
pip install -r requirements.txt
```

Setup D-Wave Ocean (a D-Wave account is required).
```bash
dwave setup --auth
dwave auth login
```

Run the backend
```bash
python manage.py runserver
```

## How it works (In progress)

We divide one week into 672 15 minute time slots, each one of which can be assigned what we call events or activities.

- Events are user defined appointments in the calendar with specific start and end times (i.e. Math class on Monday from 8:30 to 9:30).
  When the user specifies events, the timeslots corresponding to the time range will be marked as taken by the activity.
- Activities are user-defined routines or tasks that the user wants to allocate time for throughout the week, without fixed start and end times (i.e. Work on math homework for 6 hours this week).

When the user specifies events, the timeslots corresponding to the time range will be marked as taken by the activity.

The next step is to create binary variables for each timeslot-activity pair possible.
If the user defines $n$ activities and there are $m <= 672$ free timeslots, there are $nm$ such pairs.
