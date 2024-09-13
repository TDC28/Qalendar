import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";

interface Row {
  time: string;
  [day: string]: string;
}

interface Block {
  name: string;
  startRow: number;
  rowSpan: number;
}

export default function TablePage() {
  const timeslots: string[] = [];
  const [startIndeces, setStartIndeces] = useState<number[]>([]);
  const [scheduleData, setScheduleData] = useState({
    MON: Array(96)
      .fill("Empty")
      .fill("Sleep", 0, 32)
      .fill("Breakfast", 32, 36)
      .fill("Lunch", 48, 52)
      .fill("Dinner", 72, 76),
  });
  const [blocks, setBlocks] = useState<Block[]>([]);

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 4; j++) {
      const hour = i.toString().padStart(2, "0");
      const minutes = (j * 15).toString().padStart(2, "0");
      timeslots.push(`${hour}:${minutes}`);
    }
  }

  const rows: Row[] = timeslots.map((timeslot) => ({
    time: timeslot,
  }));

  const loadTable = () => {
    if (!scheduleData) return;
    console.log();

    const tempBlocks: Block[] = [];
    let start = 0;
    let last = scheduleData["MON"][0];
    let newStartIndeces = [];

    for (let i = 1; i <= scheduleData["MON"].length; i++) {
      if (i === scheduleData["MON"].length || scheduleData["MON"][i] !== last) {
        newStartIndeces.push(start);
        tempBlocks.push({
          name: last,
          startRow: start,
          rowSpan: i - start,
        });

        start = i;
        last = scheduleData["MON"][i];
      }
    }
    setStartIndeces(newStartIndeces);
    setBlocks(tempBlocks);
    console.log(newStartIndeces);
  };

  const rowIndexTo24Time = (rowIndex: number) => {
    const totalMinutes = rowIndex * 15;

    const hours = Math.floor(totalMinutes / 60);
    let hoursStr = "";
    const minutes = totalMinutes - hours * 60;
    let minutesStr = "";

    if (hours < 10) {
      hoursStr = "0" + String(hours);
    } else {
      hoursStr = String(hours);
    }

    if (minutes < 10) {
      minutesStr = "0" + String(minutes);
    } else {
      minutesStr = String(minutes);
    }

    return hoursStr + ":" + minutesStr;
  };

  const getDataEntry = (rowIndex: number, day: string) => {
    for (var block of blocks) {
      if (block.startRow == rowIndex) {
        return (
          <>
            <td
              className="bg-blue-400/90 rounded-lg align-top"
              rowSpan={block.rowSpan}
            >
              <div className="pl-1 pt-1 text-white text-sm font-bold">
                {block.name}
              </div>
              <div className="p-1 text-white text-sm">
                {rowIndexTo24Time(block.startRow)} -{" "}
                {rowIndexTo24Time(block.startRow + block.rowSpan)}
              </div>
            </td>
          </>
        );
      }
    }
  };

  return (
    <DefaultLayout>
      <div>
        <h1 className="text-6xl pb-9">Table Testing</h1>
        <button onClick={loadTable}>Press me</button>
        <div className="p-4 flex flex-col shadow-small rounded-xl">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="table-header rounded-l-lg">Time</th>
                <th className="table-header">Monday</th>
                <th className="table-header">Tuesday</th>
                <th className="table-header">Wednesday</th>
                <th className="table-header">Thursday</th>
                <th className="table-header">Friday</th>
                <th className="table-header">Saturday</th>
                <th className="table-header rounded-r-lg">Sunday</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="py-1 text-sm">{row.time}</td>
                  {startIndeces.includes(rowIndex) &&
                    scheduleData["MON"][rowIndex] != "Empty" &&
                    getDataEntry(rowIndex, "MON")}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}
