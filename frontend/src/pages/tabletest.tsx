import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";

interface Row {
  time: string;
  [day: string]: string;
}

interface Block {
  day: string;
  contents: {
    name: string;
    startRow: number;
    rowSpan: number;
  };
}

interface TableData {
  MON: string[];
  TUE: string[];
}

interface StartIndeces {
  MON: number[];
  TUE: number[];
}

export default function TablePage() {
  const timeslots: string[] = [];
  const [startIndeces, setStartIndeces] = useState<StartIndeces>({
    MON: [],
    TUE: [],
  });
  const [scheduleData, setScheduleData] = useState<TableData>({
    MON: Array(96)
      .fill("Empty")
      .fill("Sleep", 0, 32)
      .fill("Breakfast", 32, 36)
      .fill("Lunch", 48, 52)
      .fill("Dinner", 72, 76),
    TUE: Array(96)
      .fill("Empty")
      .fill("Sleep2", 0, 32)
      .fill("Breakfast2", 32, 36)
      .fill("Lunch2", 48, 52)
      .fill("leetcode", 72, 76),
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

    const tempBlocks: Block[] = [];
    let newStartIndeces: { MON: number[]; TUE: number[] } = {
      MON: [],
      TUE: [],
    };

    for (const day of ["MON", "TUE"] as Array<keyof TableData>) {
      let start = 0;
      let last = scheduleData[day][0];

      for (let i = 1; i <= scheduleData[day].length; i++) {
        if (i === scheduleData[day].length || scheduleData[day][i] !== last) {
          newStartIndeces[day].push(start);
          tempBlocks.push({
            day: day,
            contents: { name: last, startRow: start, rowSpan: i - start },
          });
          start = i;
          last = scheduleData[day][i];
        }
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
      if (
        block.day === day &&
        block.contents.name === "Empty" &&
        block.contents.startRow == rowIndex
      ) {
        return <td></td>;
      }
      if (block.day === day && block.contents.startRow == rowIndex) {
        return (
          <>
            <td
              className="bg-blue-400/90 rounded-lg align-top"
              rowSpan={block.contents.rowSpan}
            >
              <div className="pl-1 pt-1 text-white text-sm font-bold">
                {block.contents.name}
              </div>
              <div className="p-1 text-white text-sm">
                {rowIndexTo24Time(block.contents.startRow)} -{" "}
                {rowIndexTo24Time(
                  block.contents.startRow + block.contents.rowSpan,
                )}
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
                  <td className="py-1 text-sm text-center">{row.time}</td>
                  {startIndeces["MON"].includes(rowIndex) &&
                    getDataEntry(rowIndex, "MON")}
                  {startIndeces["TUE"].includes(rowIndex) &&
                    getDataEntry(rowIndex, "TUE")}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}
