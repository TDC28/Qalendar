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
  const [scheduleData, setScheduleData] = useState({
    MON: Array(96)
      .fill("Empty")
      .fill("Sleep", 0, 32)
      .fill("Breakfast", 32, 36)
      .fill("Lunch", 48, 52)
      .fill("Dinner", 72, 76),
  });
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [startIndeces, setStartIndeces] = useState<number[]>([]);

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

    for (let i = 1; i <= scheduleData["MON"].length; i++) {
      if (i === scheduleData["MON"].length || scheduleData["MON"][i] !== last) {
        console.log("Found");
        setStartIndeces((prevStartIndeces) => {
          const newStartIndeces = [...prevStartIndeces, start];
          return newStartIndeces;
        });

        tempBlocks.push({
          name: last,
          startRow: start,
          rowSpan: i - start,
        });
        start = i;
        last = scheduleData["MON"][i];
      }
    }
    setBlocks(tempBlocks);
    console.log(startIndeces);
  };

  const getDataEntry = (rowIndex: number, day: string) => {
    for (var block of blocks) {
      if (block.startRow == rowIndex) {
        return (
          <td className="bg-blue-400 rounded-lg" rowSpan={block.rowSpan}>
            {block.name}
          </td>
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
                  <td className="text-center py-1 text-sm">{row.time}</td>
                  {startIndeces.includes(rowIndex) &&
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
