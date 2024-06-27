# Qalendar

A calendar that is optimized using DWave's quantum systems.

# Installation

cd into your desired folder then run the following into your terminal.

```bash
git clone https://github.com/TDC28/Qalendar.git
git checkout test
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Authenticate your dwave account using `dwave setup --auth`.

# How to use
The file `main.py` contains an example code that you can run with the following lines from the terminal:

```bash
python src/main.py > output.txt
```

This will create a text file containing the output.

# Future features
- A frontend with a graphical calendar.
- Option to download the output for Google/Apple Calendar. 
- Sessions where regular 
- Configurable max duration of an activity (i.e. no more than 3 consecutive hours of X activity).
