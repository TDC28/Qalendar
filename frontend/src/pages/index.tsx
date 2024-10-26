//import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import Decoration from "@/components/Decoration";
import { Button } from "@nextui-org/button";
import { ArrowRight } from "lucide-react";

export default function IndexPage() {
  return (
    <>
      <Decoration />
      <DefaultLayout>
        <div>
          <h1 className="text-6xl pb-4">
            Where quantum computing meets utility.
          </h1>
          <div className="space-y-24">
            <div>
              <p className="text-3xl font-thin">
                Qalendar is an innovative calendar application powered by
                quantum computation.
              </p>
              <p className="text-3xl font-thin">
                It is designed to help you optimize your schedule efficiently
                and effectively.
              </p>
            </div>
            <Button size="lg">
              <a href="/generate" className="flex items-center">
                Get started
                <ArrowRight
                  className="ml-2 h-4 w-4 sm:text-sm"
                  href="/generate"
                />
              </a>
            </Button>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
