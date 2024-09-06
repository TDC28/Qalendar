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
        <div className="space-y-6">
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
          <div>
            <p>Home page continues...</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
