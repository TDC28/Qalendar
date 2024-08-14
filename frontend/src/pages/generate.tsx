import DefaultLayout from "@/layouts/default"
import ScheduleTable from "@/components/scheduleTable"

export default function GeneratePage() {
   return (
      <DefaultLayout>
         <h1>This is the calendar generation page</h1>
         <ScheduleTable />
      </DefaultLayout>
   )
}
