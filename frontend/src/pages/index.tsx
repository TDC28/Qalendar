//import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  //const [animate, setAnimate] = useState(false);

  //useEffect(() => {
  //  setAnimate(true);
  //}, []);

  return (
    <DefaultLayout>
      <div>
        <h1 className="text-6xl pb-4">
          Where quantum computing meets utility.
        </h1>
        <div className="space-y-16">
          <div>
            <p className={`text-xl font-thin`}>
              Qalendar is an innovative calendar application powered by quantum
              computation.
            </p>
            <p className="text-xl font-thin">
              It is designed to help you optimize your schedule efficiently and
              effectively.
            </p>
          </div>
          <div className="flex flex-col m-auto rounded-xl shadow-small w-5/6 p-4">
            <p className="text-4xl text-center font-bold">
              Create the
              <span className="text-primary font-extrabold"> perfect </span>
              schedule for your week in no time.
            </p>
            <div className="flex flex-row items-center gap-4">
              <div className="bg-gray-100 shadow-small w-full h-full rounded-xl py-10 my-5">
                Visit setup page to get started.
              </div>
              <div className="bg-gray-100 shadow-small w-full h-full rounded-xl py-10 my-5">
                Have some feedback? Contact us!
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
