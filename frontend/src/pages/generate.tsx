import DefaultLayout from "@/layouts/default";
import ScheduleTable from "@/components/scheduleTable";
import { Spacer } from "@nextui-org/react";

export default function GeneratePage() {
  return (
    <DefaultLayout>
      <div>
        <h1 className="text-6xl pb-9">Generate calendar</h1>
        <Spacer y={5} />
        <ScheduleTable />
      </div>
    </DefaultLayout>
  );
}
