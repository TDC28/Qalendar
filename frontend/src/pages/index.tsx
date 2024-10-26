//import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import Decoration from "@/components/Decoration";
import { Button } from "@nextui-org/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

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
                quantum annealing.
              </p>
              <p className="text-3xl font-thin">
                It is designed to help you optimize your schedule efficiently
                and effectively.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-around mt-16">
            <div className="self-center bg-gradient-to-r from-blue-400 to-purple-400 inline-block p-1 rounded-2xl">
              <Button
                className="bg-white shadow shadow-black"
                size="lg"
                onClick={() => navigate("/generate")}
              >
                Get started
                <ArrowRight className="ml-2 h-4 w-4 sm:text-sm" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-24">
          <a
            href="https://github.com/TDC28/Qalendar"
            target="_blank"
            className="bg-gray-300 w-1/3 rounded-xl bg-opacity-25 bg-blur border shadow hover:bg-gray-200 hover:bg-opacity-20 transition duration-200"
          >
            <div className="flex items-center justify-between">
              <p className="p-3 text-4xl">Open sourced</p>
            </div>
            <p className="p-3">
              Visit our GitHub repository. We are open to pull requests and
              contributions.
            </p>
          </a>
          <a
            href="/contact"
            className="bg-gray-300 w-1/3 rounded-xl bg-opacity-25 bg-blur border shadow hover:bg-gray-200 hover:bg-opacity-20 transition duration-200"
          >
            <div className="flex items-center justify-between">
              <p className="p-3 text-4xl">Contact us</p>
            </div>
            <p className="p-3">
              We would love to hear your feedback! We're always ready to improve
              Qalendar.
            </p>
          </a>
        </div>
      </DefaultLayout>
    </>
  );
}
