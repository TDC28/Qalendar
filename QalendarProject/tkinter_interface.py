import tkinter as tk
from tkinter import messagebox
from tkinter import ttk
import requests

BASE_URL = 'http://127.0.0.1:8000/events/'

class CalendarApp(tk.Tk):
    '''
    Builds a GUI for adding events to the calendar
    '''
    def __init__(self):
        super().__init__()

        self.title("Qalendar")
        self.geometry("400x200")
        self.configure(bg="#f0f0f0")

        self.style = ttk.Style(self)
        self.style.configure('TLabel', background='#f0f0f0', font=('Helvetica', 12))
        self.style.configure('TButton', font=('Helvetica', 12))
        self.style.configure('TEntry', font=('Helvetica', 12))
        self.create_widgets()

    def create_widgets(self):
        frame = ttk.Frame(self, padding="20 20 20 20")
        frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        self.title_label = ttk.Label(frame, text="Event Title")
        self.title_label.grid(row=0, column=0, sticky=tk.W, pady=5)

        self.title_entry = ttk.Entry(frame, width=30)
        self.title_entry.grid(row=0, column=1, pady=5)

        self.day_label = ttk.Label(self, text="Event day")
        self.day_label.grid(row=1, column=0, sticky=tk.W, pady=5)

        self.day_entry = ttk.Entry(self)
        self.day_entry.grid(row=1, column=1, pady=5)

        self.start_time_label = ttk.Label(self, text="Event Start Time")
        self.start_time_label.grid(row=2, column=0, sticky=tk.W, pady=5)

        self.start_time_entry = ttk.Entry(self)
        self.start_time_entry.grid(row=2, column=1, pady=5)

        self.end_label = ttk.Label(self, text="Event End Time")
        self.end_label.grid(row=3, column=0, sticky=tk.W, pady=5)

        self.end_entry = ttk.Entry(self)
        self.end_entry.grid(row=3, column=1, pady=5)

        self.add_button = ttk.Button(self, text="Add Event", command=self.add_event)
        self.add_button.grid(row=4, column=0, columnspan=2, pady=5)

    def add_event(self):
        title = self.title_entry.get()
        day = self.day_entry.get()
        start_time = self.start_time_entry.get()
        end_time = self.end_entry.get()

        if not title or not day or not start_time or not end_time:
            messagebox.showerror("Error", "All fields are required!")
            return


        event_data = {
            'title': title,
            'day': day, 
            'start_time': start_time,
            'end_time': end_time
        }

        response = requests.post(BASE_URL, json=event_data)

        if response.status_code == 201:
            messagebox.showinfo("Success", "Event added successfully!")
            self.title_entry.delete(0, tk.END)
            self.day_entry.delete(0, tk.END)
            self.start_time_entry.delete(0, tk.END)
            self.end_entry.delete(0, tk.END)
        else:
            messagebox.showerror("Error", "Failed to add event")

if __name__ == "__main__":
    app = CalendarApp()
    app.mainloop()