import DefaultLayout from "@/layouts/default";
import { CircularProgress } from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";

export default function ContactPage() {
   return (
      <DefaultLayout>

         <h1>This is the contact us page</h1>
         <Spacer x={10} /> 
         <CircularProgress
            aria-label="Loading..."
            size="lg"
            color="warning"
            showValueLabel={true}
         />

      <div />
      </DefaultLayout>
   )
}

