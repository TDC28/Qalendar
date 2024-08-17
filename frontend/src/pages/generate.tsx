import DefaultLayout from "@/layouts/default"
import ScheduleTable from "@/components/scheduleTable"
import React from "react"
import { Spacer } from "@nextui-org/react"

export default function GeneratePage() {
   return (
      <DefaultLayout>
         <h1>This is the calendar generation page</h1>
         <Spacer y={5} />
         <ScheduleTable />
      </DefaultLayout>
   )
}
