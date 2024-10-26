import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import GenerateButton from "@/components/generateButton";
import { Progress } from "@nextui-org/react";

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
  WED: string[];
  THU: string[];
  FRI: string[];
  SAT: string[];
  SUN: string[];
}

interface StartIndeces {
  MON: number[];
  TUE: number[];
  WED: number[];
  THU: number[];
  FRI: number[];
  SAT: number[];
  SUN: number[];
}

const DAYS: Array<keyof TableData> = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];

const TIMESLOTS: string[] = [];

for (let i = 0; i < 24; i++) {
  for (let j = 0; j < 4; j++) {
    const hour = i.toString().padStart(2, "0");
    const minutes = (j * 15).toString().padStart(2, "0");
    TIMESLOTS.push(`${hour}:${minutes}`);
  }
}

export default function TablePage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scheduleData, setScheduleData] = useState<TableData | null>(null);
  const [startIndeces, setStartIndeces] = useState<StartIndeces>({
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: [],
    SUN: [],
  });
  const rows: Row[] = TIMESLOTS.map((timeslot) => ({
    time: timeslot,
  }));

  const fetchScheduleData = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/generate-schedule/",
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched Schedule Data:", data.schedule);

      setScheduleData(data.schedule);
    } catch (error) {
      console.error("Error fetching schedule data:", error);

      setErrorMessage("Failed to load the schedule. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTable();
  }, [scheduleData]);

  const loadTable = () => {
    console.log(scheduleData);
    if (!scheduleData) return;

    const tempBlocks: Block[] = [];
    const newStartIndeces: StartIndeces = {
      MON: [],
      TUE: [],
      WED: [],
      THU: [],
      FRI: [],
      SAT: [],
      SUN: [],
    };

    for (const day of DAYS) {
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

  const getDataCell = (rowIndex: number, day: keyof StartIndeces) => {
    for (const block of blocks) {
      if (
        block.day === day &&
        block.contents.name === "Empty" &&
        block.contents.startRow == rowIndex
      ) {
        return <td key={`${day}-${rowIndex}`}></td>;
      }
      if (block.day === day && block.contents.startRow == rowIndex) {
        return (
          <>
            <td
              className="table-data bg-primary rounded-lg align-top"
              rowSpan={block.contents.rowSpan}
              key={`${day}-${rowIndex}`}
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
      <h1 className="text-6xl pb-9">Generate calendar</h1>
      <div className="pb-4">
        <GenerateButton onGenerate={fetchScheduleData} />
      </div>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "20px" }}>{errorMessage}</div>
      )}

      {loading ? (
        <div className="shadow-small rounded-xl max-w-64 p-4">
          <Progress
            aria-label="Loading schedule..."
            size="md"
            isIndeterminate
            color="primary"
            className="max-w-md"
          />
        </div>
      ) : (
        <div className="p-4 flex flex-col shadow-small rounded-xl">
          <table className="table-fixed w-full">
            <thead>
              <tr key={"header"}>
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
                <tr key={`row-${rowIndex}`}>
                  <td
                    key={`time-${rowIndex}`}
                    className="py-1 text-sm text-center"
                  >
                    {row.time}
                  </td>
                  {DAYS.map(
                    (day: keyof StartIndeces) =>
                      startIndeces[day].includes(rowIndex) &&
                      getDataCell(rowIndex, day),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DefaultLayout>
  );
}
