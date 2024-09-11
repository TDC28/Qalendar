import DefaultLayout from "@/layouts/default";

interface Row {
  time: string;
  [day: string]: string;
}

export default function TablePage() {
  const timeslots = [];

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 4; j++) {
      const hour = i.toString().padStart(2, "0");
      const minutes = (j * 15).toString().padStart(2, "0");
      timeslots.push(`${hour}:${minutes}`);
    }
  }

  const rows: Row[] = timeslots.map((timeslot) => {
    return { time: timeslot };
  });

  return (
    <DefaultLayout>
      <div>
        <h1 className="text-6xl pb-9">Table Testing</h1>
        <div className="p-4 flex flex-col shadow-small rounded-lg">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="table-header rounded-l-lg">Time</th>
                <th className="table-header">Monday</th>
                <th className="table-header">Tuesday</th>
                <th className="table-header">Wednesday</th>
                <th className="table-header">Thurday</th>
                <th className="table-header">Friday</th>
                <th className="table-header">Saturday</th>
                <th className="table-header rounded-r-lg">Sunday</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="text-center py-1">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}
