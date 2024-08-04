"use client";
import Image from "next/image";
import reload from "../../../public/images/reload.svg";
import { Icon } from "@/icons";

const ETA = () => {
  return (
    <div className="border-b border-[#F4F4F5] pb-10">
      <div className="container border border-[#E3EAFC] rounded-[14px] bg-lightblue">
        <div className="py-6 px-0 lg:px-8">
          <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4">
            <div className="flex lg:flex-row flex-col lg:items-center gap-4 lg:gap-10">
              <h3 className="text-2xl lg:text-[30px] font-bold text-primaryblue">
                ETA
              </h3>
              <div>
                <h4 className="text-lg lg:text-xl font-medium text-secondaryblack mb-2">
                  (Departed from Warehouse)
                </h4>
                <p className="text-sm text-primaryblue">
                  10 min - 20 Miles Away
                </p>
              </div>
            </div>
            <div className="flex flex-row  justify-between lg:items-center gap-4 lg:gap-10">
              <div className="flex items-center gap-2.5 lg:order-last order-lafirstst">
                {/* <Image src={reload} alt="" /> */}
                <p className="text-secondaryblack text-xs">
                  <span className="text-[#66676D]">last updated</span>{" "}
                  15/04/2024 at 10:03 PM
                </p>
              </div>
              <div className="cursor-pointer ">
                <Icon name="refresh" />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETA;
