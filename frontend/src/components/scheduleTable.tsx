'use client'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

// // Define the type for a row in the table
interface Row {
    key: string;
    timeSlot: string;
    MON?: string;
    TUE?: string;
    WED?: string;
    THU?: string;
    FRI?: string;
    SAT?: string;
    SUN?: string;
  }

const scheduleData: Record<Day, string[]> = {
    'MON': ['Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Breakfast', 'Breakfast', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Gym', 'Gym', 'Gym', 'Gym', 'Empty', 'Empty', 'Empty', 'Lunch', 'Lunch', 'Lunch', 'Lunch', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Gym', 'Gym', 'Gym', 'Gym', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Dinner', 'Dinner', 'Dinner', 'Dinner', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'],
    'TUE': ['Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Breakfast', 'Breakfast', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Lunch', 'Lunch', 'Lunch', 'Lunch', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Dinner', 'Dinner', 'Dinner', 'Dinner', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'], 
    'WED': ['Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Breakfast', 'Breakfast', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Lunch', 'Lunch', 'Lunch', 'Lunch', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Dinner', 'Dinner', 'Dinner', 'Dinner', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'], 
    'THU': ['Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Breakfast', 'Breakfast', 'Math', 'Math', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Lunch', 'Lunch', 'Lunch', 'Lunch', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Dinner', 'Dinner', 'Dinner', 'Dinner', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Gym', 'Gym', 'Gym', 'Gym', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'], 
    'FRI': ['Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Breakfast', 'Breakfast', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Lunch', 'Lunch', 'Lunch', 'Lunch', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Dinner', 'Dinner', 'Dinner', 'Dinner', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Gym', 'Gym', 'Gym', 'Gym', 'Empty', 'Empty', 'Empty', 'Empty'], 
    'SAT': ['Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Breakfast', 'Breakfast', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Lunch', 'Lunch', 'Lunch', 'Lunch', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Gym', 'Gym', 'Gym', 'Gym', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Dinner', 'Dinner', 'Dinner', 'Dinner', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty'], 
    'SUN': ['Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Breakfast', 'Breakfast', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Lunch', 'Lunch', 'Lunch', 'Lunch', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'English', 'English', 'English', 'English', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Dinner', 'Dinner', 'Dinner', 'Dinner', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty', 'Empty']}


// Create the days array
const days: Day[] = Object.keys(scheduleData) as Day[];

// Calculate the maximum length of activities
const maxLength = Math.max(...days.map(day => scheduleData[day].length));


// Generate time slots (15-minute intervals starting from 0:00 AM)
const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < maxLength; i++) {
      const hours = Math.floor(i / 4);
      const minutes = (i % 4) * 15;
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}`;
      slots.push(time);
    }
    return slots;
  };


const timeSlots = generateTimeSlots();


const rows: Row[] = Array.from({ length: maxLength }, (_, index) => {
    const row: Row = { key: index.toString(), timeSlot: timeSlots[index] };
    
    // Replace 'Empty' with an empty string
    days.forEach(day => {
      const activity = scheduleData[day][index];
      row[day] = activity === 'Empty' ? '' : activity;
    });
  
    return row;
  });
  
const columns = [
{ key: 'timeSlot', label: 'Time Slot' }, // Add time slot column
...days.map(day => ({ key: day, label: day.toUpperCase() }))
];
  
export default function ScheduleTable() {
    return (
      <Table aria-label="Schedule table with time slots">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
