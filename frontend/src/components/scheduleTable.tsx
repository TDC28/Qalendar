'use client'

import React, { useEffect, useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import GenerateButton from './generateButton'; // Import the GenerateButton component

interface Row {
    time: string;
    [day: string]: string;
}

const ScheduleTable: React.FC = () => {
    const [scheduleData, setScheduleData] = useState<{ [day: string]: string[] }>({
        MON: [],
        TUE: [],
        WED: [],
        THU: [],
        FRI: [],
        SAT: [],
        SUN: [],
    });

    const fetchScheduleData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/generate-schedule/');
            const data = await response.json();

            console.log('Fetched Schedule Data:', data.schedule); // Log the fetched data
            setScheduleData(data.schedule);
        } catch (error) {
            console.error('Error fetching schedule data:', error);
        }
    };

    useEffect(() => {
        fetchScheduleData(); // Fetch initial schedule data on component mount
    }, []);

    const generateTimeSlots = () => {
        const slots = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 4; j++) {
                const hour = i.toString().padStart(2, '0');
                const minutes = (j * 15).toString().padStart(2, '0');
                slots.push(`${hour}:${minutes}`);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    // Calculate max length to handle cases where days might have different lengths of activities
    const maxLength = Math.max(...Object.values(scheduleData).map(day => day.length));

    // Updated logic for creating the rows
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const rows: Row[] = Array.from({ length: maxLength }, (_, index) => {
        const row: Row = { time: timeSlots[index] };

        // Replace 'Empty' with an empty string
        days.forEach(day => {
            const activity = scheduleData[day][index];
            row[day] = activity === 'Empty' ? '' : activity || '';
        });

        return row;
    });

    return (
        <>
            <GenerateButton onGenerate={fetchScheduleData} /> {/* Pass fetchScheduleData as the onGenerate prop */}
            <Table aria-label="Schedule Table">
                <TableHeader>
                    <TableColumn>Time Slot</TableColumn>
                    <TableColumn>Monday</TableColumn>
                    <TableColumn>Tuesday</TableColumn>
                    <TableColumn>Wednesday</TableColumn>
                    <TableColumn>Thursday</TableColumn>
                    <TableColumn>Friday</TableColumn>
                    <TableColumn>Saturday</TableColumn>
                    <TableColumn>Sunday</TableColumn>
                </TableHeader>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.MON}</TableCell>
                            <TableCell>{row.TUE}</TableCell>
                            <TableCell>{row.WED}</TableCell>
                            <TableCell>{row.THU}</TableCell>
                            <TableCell>{row.FRI}</TableCell>
                            <TableCell>{row.SAT}</TableCell>
                            <TableCell>{row.SUN}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default ScheduleTable;