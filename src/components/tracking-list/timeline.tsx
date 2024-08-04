"use client";
import React, { useState } from "react";
import Image from "next/image";
import boxblue from "../../../public/images/box-blue.svg";
import boxgreen from "../../../public/images/box-green.svg";
import bluetruck from "../../../public/images/blue-truck.svg";
import greentruck from "../../../public/images/green-truck.svg";
import deliveredblue from "../../../public/images/tick-circle.svg";
import deliveredgreen from "../../../public/images/tick-circle-green.svg";
import locationblue from "../../../public/images/location-blue.svg";
import locationgreen from "../../../public/images/location-green.svg";
import check from "../../../public/images/Check.svg";
import { Progress } from "@/components/ui/progress";

const Timeline = () => {
  const [currentStatus, setCurrentStatus] = useState(2); // Assuming 0 is 'Pickup', 1 is 'Dispatched', 2 is 'Stop 1', 3 is 'Stop 2', 4 is 'Delivered'
  const progressStep = 100 / 4; // 100% divided by the number of steps - 1

  const progress = currentStatus * progressStep;

  const timelinedata = [
    {
      image: currentStatus > 0 ? boxgreen : boxblue,
      title: "Stop 1",
      location: "Dallas, TX",
      date: "21 Feb",
      time: "11:34 AM",
      status: currentStatus >= 0,
    },
    {
      image: currentStatus > 1 ? greentruck : bluetruck,
      title: "Stop 2",
      location: "Dallas, TX",
      date: "21 Feb",
      time: "11:34 AM",
      status: currentStatus >= 1,
    },
    {
      image: currentStatus > 2 ? locationgreen : locationblue,
      title: "Stop 3",
      location: "Dallas, TX",
      date: "21 Feb",
      time: "11:34 AM",
      status: currentStatus >= 2,
    },
    {
      image: currentStatus > 3 ? locationgreen : locationblue,
      title: "Stop 4",
      location: "Dallas, TX",
      date: "21 Feb",
      time: "11:34 AM",
      status: currentStatus >= 3,
    },
    {
      image: currentStatus > 4 ? deliveredgreen : deliveredblue,
      title: "Delivered",
      location: "Dallas, TX",
      date: "21 Feb",
      time: "11:34 AM",
      status: currentStatus >= 4,
    },
  ];

  return (
    <div className="py-10 relative">
      <div className="container mx-auto px-4 overflow-x-auto hide-scrollbar">
        <div className="relative w-[1200px] mx-auto">
          <Progress value={progress} className="w-full absolute top-[11px] left-0 right-0 z-[-10]" />
        </div>
        <div className="grid grid-cols-5 gap-4 z-40 w-[1200px] mx-auto">
          {timelinedata.map((item, index) => {
            const isCrossed = currentStatus > index;
            const isInProgress = currentStatus === index;
            return (
              <div key={index} className="flex flex-col justify-center items-center">
                <div
                  className={`p-1 rounded-full mb-3 border-4 ${
                    isCrossed
                      ? "bg-primaryblue border-white"
                      : isInProgress
                      ? "bg-primaryblue border-primaryblue"
                      : "bg-transparent border-primaryblue opacity-50"
                  }`}
                >
                  {isCrossed && <Image src={check} alt="" className="z-40" />}
                </div>
              
                <h3 className={`${isCrossed ? "text-[#25AE79]" : "text-primaryblue"} text-sm mb-1 font-semibold`}>
                  {item.title}
                </h3>
                <p className="text-gray text-xs mb-1">
                  {item.date} at {item.time}
                </p>
                <p className="text-secondaryblack text-sm">{item.location}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
