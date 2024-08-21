"use client";

import { useToast } from "@/components/ui/use-toast";
import { Icon } from "@/icons";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import trackingdetails from "../../../public/images/gps-tracking-details.svg";
import ETA from "./eta";
import Lastknownlocation from "./last-location";
import Timeline from "./timeline";

const options = [
  { key: "under_process", label: "Under Process" },
  { key: "left_warehouse", label: "Left Warehouse" },
  { key: "shipped_to_delivery_city", label: "Shipped to Delivery City" },
  { key: "delivered", label: "Delivered" },
];
const Trackingdetails = () => {
  const { toast } = useToast();
  const trackingID = "https//:www.testing.com/track/202428490234";

  const copyTrackingIDToClipboard = () => {
    navigator.clipboard.writeText(trackingID).then(() => {
      toast({
        title: "Tracking ID copied to clipboard",
      });
    });
  };

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row justify-start md:justify-between space-y-7 md:items-center mb-10">
        <div className="flex items-center gap-2.5">
          <Image src={trackingdetails} alt="" />
          <h3 className="text-primaryblack text-2xl font-semibold">
            Tracking Info
          </h3>
        </div>
        <div>
          <Select
            items={options}
            placeholder="Status"
            className="w-full sm:w-[400px]"
            size="lg"
            onSelectionChange={(key) => console.log(key)}
          >
            {options?.map((option, i) => (
              <SelectItem key={i} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="mb-10">
        <Lastknownlocation />
        <Timeline />
        <ETA />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3.5 mb-6">
        <div className="lg:col-span-2">
          <div
            className="border border-[#F0F0F1] bg-[#FBFBFB] rounded-[14px] px-5 py-[13px] flex items-center justify-between cursor-pointer"
            onClick={copyTrackingIDToClipboard}
          >
            <div className="flex gap-4">
              <p className="text-sm text-[#65666C]">Tracking URL:</p>
              <p className="text-primaryblue text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px] sm:max-w-max">
                {trackingID}
              </p>
            </div>
            <span>
              <Icon name="copy" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trackingdetails;
