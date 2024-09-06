# Qalendar

A calendar application that is optimized using DWave's quantum systems.

# Installation

```bash
git clone https://github.com/TDC28/Qalendar.git
```

> [!NOTE]
> The frontend for Qalendar is still a work in progress. To try Qalendar from the terminal, change the branch from 'main' to 'test'.

# Using Qalendar

Using Qalendar requires you to run the backend and the frontend locally, since the project is not hosted (and likely never will be).

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

Setup D-Wave Ocean
```bash
dwave setup --auth
dwave auth login
```

Run the backend
```bash
python manage.py runserver
```
