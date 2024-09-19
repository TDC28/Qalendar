import React, { useState, useEffect } from 'react';
import DefaultLayout from "@/layouts/default";
import { Input, Button } from "@nextui-org/react";
import { Tabs, Tab} from "@nextui-org/react";
import EventsTab from '../components/EventsTab';
import ActivitiesTab from '../components/ActivitiesTab';


// const [activeTab, setActiveTab] = useState("events");

// export default function EventManagerPage() {
//   const [eventName, setEventName] = useState('');
//   const [eventDay, setEventDay] = useState('');
//   const [eventStartTime, setEventStartTime] = useState('');
//   const [eventEndTime, setEventEndTime] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setSuccessMessage('');

//     // Construct the data to be sent
//     const eventData = {
//       name: eventName,
//       day: eventDay,
//       startTime: eventStartTime,
//       endTime: eventEndTime,  // Adjust fields as necessary
//     };

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/add-event/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(eventData),
//       });

//       if (response.ok) {
//         setSuccessMessage('Event added successfully!');
//         setEventName('');
//         setEventDay('');
//         setEventStartTime('');
//         setEventEndTime('');
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       setErrorMessage('Error submitting form.');
//     }
//   };

//   return (
//     <DefaultLayout>
//       <div>
//         <h1 className="text-6xl pb-9">Event Manager</h1>
        
//         {/* Form for adding new events */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <Input
//               label="Event Name"
//               placeholder="Enter event name"
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//               required
//             />
//              <div className="mb-4">
//             <Input
//               label="Event Day"
//               placeholder="Enter event date"
//               value={eventDay}
//               onChange={(e) => setEventDay(e.target.value)}
//               required
//             />
//           </div>
//           </div>
//           <div className="mb-4">
//             <Input
//               label="Event Start Time"
//               placeholder="Enter event time"
//               value={eventStartTime}
//               onChange={(e) => setEventStartTime(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <Input
//               label="Event End Time"
//               placeholder="Enter event end time"
//               value={eventEndTime}
//               onChange={(e) => setEventEndTime(e.target.value)}
//               required
//             />
//           </div>
//           <Button type="submit" color="primary">
//             Add Event
//           </Button>
//         </form>

//         {/* Success or error messages */}
//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       </div>
//     </DefaultLayout>
//   );
// }



export default function EventManagerPage() {
  const [activeTab, setActiveTab] = useState<string>("events");

  return (
    <DefaultLayout>
      <h1 className="text-6xl pb-9">Calendar Manager</h1>
      <div className="mb-4">
        <Tabs
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          <Tab key="events" title="Events">
            <EventsTab />
          </Tab>
          <Tab key="activities" title="Activities">
            <ActivitiesTab />
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
}

