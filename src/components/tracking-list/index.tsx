import Image from "next/image";
import trackinginfo from "../../../public/images/task.svg";
import archivedlist from "../../../public/images/archive-load.svg";
import { TrackingInfoDataTable } from "./tracking-table";

const TrackingListPage = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex sm:flex-row flex-col justify-between sm:items-center mb-6">
          <div className="flex items-center gap-2.5 sm:mb-0 mb-4">
            <Image src={trackinginfo} alt="" />
            <h3 className="text-primaryblack text-xl md:text-2xl font-semibold">
              Tracking List
            </h3>
          </div>
          <div className="flex justify-end items-center gap-2.5 cursor-pointer">
            <h4 className="text-primaryblue text-sm sm:text-base font-semibold">
              Archived Loads
            </h4>
            <Image src={archivedlist} alt="" />
          </div>
        </div>
        <div className="mb-20">
          <TrackingInfoDataTable />
        </div>
      </div>
    </section>
  );
};

export default TrackingListPage;
