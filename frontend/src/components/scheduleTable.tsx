'use client'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

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

// Generate the rows for the table
const rows = Array.from({ length: maxLength }, (_, index) => {
  const row: Record<string, string> = { key: index.toString() };
  days.forEach(day => {
    row[day] = scheduleData[day][index] || 'Empty';
  });
  return row;
});

// Generate the columns for the table
const columns = days.map(day => ({ key: day, label: day.toUpperCase() }));

export default function ScheduleTable() {
  return (
    <Table aria-label="Schedule table with dynamic content">
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
