"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
  spacer,
  Spacer,
} from "@nextui-org/react";
import GenerateButton from "./generateButton";

interface Row {
  time: string;
  [day: string]: string;
}

const ScheduleTable: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<{ [day: string]: string[] }>(
    {
      MON: [],
      TUE: [],
      WED: [],
      THU: [],
      FRI: [],
      SAT: [],
      SUN: [],
    },
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchScheduleData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/generate-schedule/",
      );
      // Check if the response status is not OK (i.e., not 200)
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched Schedule Data:", data.schedule);

      setScheduleData(data.schedule);
      console.log(data.schedule);
    } catch (error) {
      console.error("Error fetching schedule data:", error);

      // Set an error message in the state to display to the user
      setErrorMessage("Failed to load the schedule. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     fetchScheduleData(); // Optional: Fetch initial schedule data on component mount
  //   }, []);

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 4; j++) {
        const hour = i.toString().padStart(2, "0");
        const minutes = (j * 15).toString().padStart(2, "0");
        slots.push(`${hour}:${minutes}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const rows: Row[] = timeSlots.map((timeSlot, index) => {
    const row: Row = { time: timeSlot };
    Object.keys(scheduleData).forEach((day) => {
      const activity = scheduleData[day][index];
      row[day] = activity === "Empty" ? "" : activity;
    });
    return row;
  });

  return (
    <>
      <div style={{ marginBottom: "5px" }}>
        {" "}
        {/* Spacing between Button and Table */}
        <GenerateButton onGenerate={fetchScheduleData} />{" "}
        {/* Pass fetchScheduleData as the onGenerate prop */}
      </div>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "20px" }}>{errorMessage}</div>
      )}

      {loading ? (
        <Progress
          aria-label="Loading schedule..."
          size="md"
          isIndeterminate // Indeterminate progress bar
          color="primary"
          className="max-w-md"
        />
      ) : (
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
      )}
    </>
  );
};

export default ScheduleTable;

