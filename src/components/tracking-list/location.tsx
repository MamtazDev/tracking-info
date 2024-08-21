"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/icons";
import { Location } from "@/interface";
import { CalendarDate, DateValue, Time } from "@internationalized/date";
import { DateInput, TimeInput } from "@nextui-org/react";
import React, { useState } from "react";
import SearchLocation from "../ui/SearchLocation";

const formatDate = (date: DateValue) => {
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  const year = String(date.year).slice(-2);
  return `${month}/${day}/${year}`;
};

const formatTime = (time: Time) => {
  const hours = String(time.hour).padStart(2, "0");
  const minutes = String(time.minute).padStart(2, "0");
  return `${hours}:${minutes}`;
};

type Props = {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
};

const getDate = (date: DateValue | null) => {
  return date ? new CalendarDate(date.year, date.month, date.day) : null;
};

const getTime = (time: Time | null) => {
  return time
    ? new Time(time.hour, time.minute, time.second, time.millisecond)
    : null;
};

export default function LocationComp({ locations, setLocations }: Props) {
  const initial: Omit<Location, "id"> = {
    // location: "",
    // startDate: new CalendarDate(2024, 4, 21),
    // endDate: new CalendarDate(2024, 4, 23),
    // startTime: new Time(12, 0),
    // endTime: new Time(13, 0),
    // actualDate: new CalendarDate(2024, 4, 21),
    // actualTime: new Time(12, 0),
    location: null,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    actualDate: null,
    actualTime: null,
    isCompleted: false,
  };

  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [newLocation, setNewLocation] = useState<Omit<Location, "id">>(initial);

  const addLocation = () => {
    if (editingLocation) {
      setLocations(
        locations.map((loc) =>
          loc.id === editingLocation.id
            ? { ...editingLocation, ...newLocation }
            : loc
        )
      );
      setEditingLocation(null);
    } else {
      setLocations([
        ...locations,
        {
          id: locations.length + 1,
          ...newLocation,
        },
      ]);
    }
    setNewLocation(initial);
  };

  const handleCheckboxChange = (id: number) => {
    setLocations(
      locations.map((loc) =>
        loc.id === id ? { ...loc, isCompleted: !loc.isCompleted } : loc
      )
    );
  };

  const removeLocation = (id: number) => {
    setLocations(locations.filter((location) => location.id !== id));
  };

  const startEditing = (location: Location) => {
    const result: Location = {
      ...location,
      startDate: getDate(location.startDate),
      endDate: getDate(location.endDate),
      actualDate: getDate(location.actualDate),
      startTime: getTime(location.startTime),
      endTime: getTime(location.endTime),
      actualTime: getTime(location.actualTime),
    };

    setEditingLocation(result);
    setNewLocation(result);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<Location, "id" | "startDate" | "endDate" | "actualDate">
  ) => {
    setNewLocation({ ...newLocation, [field]: e.target.value });
  };

  const handleDateChange = (
    date: DateValue,
    field: "startDate" | "endDate" | "actualDate"
  ) => {
    setNewLocation({ ...newLocation, [field]: date });
  };

  const handleTimeChange = (
    time: Time,
    field: "startTime" | "endTime" | "actualTime"
  ) => {
    setNewLocation({ ...newLocation, [field]: time });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addLocation();
    }
  };

  const updateActualDateTime = (
    id: number,
    field: "actualDate" | "actualTime",
    value: DateValue | Time
  ) => {
    setLocations(
      locations.map((loc) => (loc.id === id ? { ...loc, [field]: value } : loc))
    );
  };

  return (
    <div className="pt-4">
      <div className="grid grid-cols-1 gap-4 px-4 py-3 mb-4 rounded-xl border border-[rgba(64, 106, 236, 0.2)] bg-[#F5F8FE]">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">
            <Icon name="location" />
          </span>
          <div className="relative w-full">
            {/* <Input
              placeholder="Add Stop - Enter Address"
              className="bg-white p-4 border-transparent flex-1"
              defaultValue={newLocation.location?.formatted}
              debounceTime={500}
              onChange={(e) => handleInputChange(e, "location")}
              onKeyDown={handleKeyPress}
            /> */}
            <SearchLocation
              selectedValue={newLocation}
              changeHandler={setNewLocation}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-5 sm:flex-row sm:space-x-10 sm:items-center md:justify-between">
          <div className="flex w-full flex-col md:flex-row  md:items-center gap-5">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center w-full space-x-4">
                <span className="text-gray-500">
                  <Icon name="calendar" />
                </span>
                <div className="w-full">
                  <DateInput
                    value={newLocation.startDate}
                    onChange={(date) => handleDateChange(date, "startDate")}
                    classNames={{
                      base: "!pb-0 w-full",
                      input:
                        "bg-white w-[117px]l md:w-[124px] px-4 h-10 data-[error=true]:text-red-100  rounded-lg shadow-none border-transparent focus:border-transparent",
                      inputWrapper:
                        "bg-transparent px-0 shadow-none border-transparent hover:bg-transparent focus:bg-transparent",
                      errorMessage: "text-red-400",
                    }}
                    errorMessage="Invalid date."
                  />
                </div>
              </div>
              <span className="text-gray-400 font-medium block mx-4">-</span>
              <div className="flex items-center w-full">
                <DateInput
                  value={newLocation.endDate}
                  onChange={(date) => handleDateChange(date, "endDate")}
                  classNames={{
                    base: "!pb-0",
                    input:
                      "bg-white w-[117px] md:w-[124px] px-4 h-10 rounded-lg shadow-none border-transparent focus:border-transparent",
                    inputWrapper:
                      "bg-transparent px-0 shadow-none border-transparent hover:bg-transparent focus:bg-transparent",
                    errorMessage: "text-red-400",
                  }}
                  errorMessage="invalid date."
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center space-x-4">
                <span className="text-gray-500">
                  <Icon name="clock" />
                </span>
                <TimeInput
                  value={newLocation.startTime}
                  onChange={(time) =>
                    handleTimeChange(time as Time, "startTime")
                  }
                  classNames={{
                    input:
                      "bg-white w-[117px] md:w-auto px-4 h-10 rounded-lg shadow-transparent border-transparent focus:border-transparent",
                    inputWrapper:
                      "bg-transparent px-0 shadow-transparent border-transparent hover:bg-transparent",
                  }}
                  hourCycle={24}
                />
              </div>
              <span className="text-gray-400 font-medium block mx-4">-</span>
              <div className="flex items-center w-full">
                <TimeInput
                  value={newLocation.endTime}
                  onChange={(time) => handleTimeChange(time as Time, "endTime")}
                  classNames={{
                    input:
                      "bg-white w-[117px] md:w-auto px-4 h-10 rounded-lg shadow-transparent border-transparent focus:border-transparent",
                    inputWrapper:
                      "bg-transparent px-0 shadow-transparent border-transparent hover:bg-transparent",
                  }}
                  hourCycle={24}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center sm:justify-end w-full ">
            <Button
              type="button"
              onClick={addLocation}
              disabled={
                !newLocation.location?.formatted ||
                !newLocation.startTime ||
                !newLocation.endTime ||
                !newLocation.startDate ||
                !newLocation.endDate
              }
              className={`${
                editingLocation ? "bg-[#64bf36]" : "bg-[#406AEC]"
              }  h-[30px] w-full sm:w-auto px-1 hover:bg-[#406AEC] hover:opacity-80 transition-all`}
            >
              <span>
                <Icon name={editingLocation ? "check" : "plus"} />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {locations.map((location, index) => (
          <div
            key={location.id}
            className={`flex justify-between items-center space-x-[18px]`}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 w-full gap-4 lg:items-center px-4 py-2 border border-[rgba(36, 38, 46, 0.05)] rounded-xl shadow-sm
            ${location.isCompleted ? "bg-[#F5F8FE]" : ""}
            `}
            >
              <div className="col-span-1 lg:col-span-5 w-full flex flex-col gap-4 lg:flex-row lg:space-x-5 lg:items-center">
                <div className="flex justify-between items-center w-full sm:w-5">
                  <div className="flex items-center space-x-3">
                    <div>
                      <Badge>{index + 1}</Badge>
                    </div>
                    <div>
                      <p className="text-[#64748B] text-left max-w-[300px]  w-full whitespace-nowrap overflow-hidden text-ellipsis">
                        {location.location?.formatted}
                      </p>
                    </div>
                  </div>
                  <div className="flex md:hidden items-center">
                    <Input
                      type="checkbox"
                      checked={location.isCompleted}
                      onChange={() => handleCheckboxChange(location.id)}
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 gap-4 flex sm:items-center flex-col sm:flex-row  lg:justify-center justify-start sm:justify-between sm:space-x-6">
                <div className="flex sm:items-center justify-between sm:justify-start lg:justify-center sm:space-x-6">
                  <div className="px-1 sm:px-8 py-1 -space-y-1 rounded-xl">
                    <div className="flex items-center">
                      <span className="mr-2">
                        <Icon name="calendar" width={10} height={10} />
                      </span>
                      <span className="text-xs">
                        {location.startDate
                          ? formatDate(location.startDate)
                          : ""}
                      </span>
                      <span className="mx-2">-</span>
                      <span className="text-xs">
                        {location.endDate ? formatDate(location.endDate) : ""}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">
                        <Icon name="clock" width={10} height={10} />
                      </span>
                      <span className="text-xs">
                        {location.startTime
                          ? formatTime(location.startTime)
                          : ""}
                      </span>
                      <span className="mx-2">-</span>
                      <span className="text-xs">
                        {location.endTime ? formatTime(location.endTime) : ""}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#F7FAFC] px-8 py-3 space-y-2 rounded-xl">
                    <div className="flex items-center">
                      <span>
                        <Icon name="calendar" width={10} height={10} />
                      </span>
                      {/* {console.log(location.actualDate)} */}
                      <DateInput
                        value={
                          location.actualDate
                            ? new CalendarDate(
                                location.actualDate.year,
                                location.actualDate.month,
                                location.actualDate.day
                              )
                            : null
                        }
                        onChange={(date) =>
                          updateActualDateTime(location.id, "actualDate", date)
                        }
                        classNames={{
                          input:
                            "bg-white pl-1 w-[88px] text-xs rounded-lg shadow-transparent border-transparent focus:border-transparent",
                          inputWrapper:
                            "bg-white px-0 shadow-transparent border-transparent hover:bg-white h-0 min-h-0",
                        }}
                        isInvalid={false}
                        size="sm"
                      />
                    </div>

                    <div className="flex items-center">
                      <span>
                        <Icon name="clock" width={10} height={10} />
                      </span>
                      <TimeInput
                        value={
                          location.actualTime
                            ? new Time(
                                location.actualTime.hour,
                                location.actualTime.minute,
                                location.actualTime.second,
                                location.actualTime.millisecond
                              )
                            : null
                        }
                        onChange={(time) =>
                          updateActualDateTime(location.id, "actualTime", time)
                        }
                        classNames={{
                          input:
                            "bg-white px-2 text-xs rounded-lg shadow-transparent border-transparent focus:border-transparent",
                          inputWrapper:
                            "bg-white px-0 shadow-transparent border-transparent hover:bg-white h-0 min-h-0",
                        }}
                        size="sm"
                        hourCycle={24}
                      />
                    </div>
                  </div>
                  <div className="hidden md:flex items-center mt-2">
                    <Input
                      type="checkbox"
                      checked={location.isCompleted}
                      onChange={() => handleCheckboxChange(location.id)}
                      className=""
                    />
                  </div>
                </div>
                <div className="flex sm:items-center space-x-2">
                  <div className="block lg:hidden w-full">
                    <Button
                      variant="ghost"
                      className="w-full bg-accent"
                      onClick={() => startEditing(location)}
                    >
                      <Icon name="pen" />
                    </Button>
                  </div>
                  <div className="block lg:hidden w-full">
                    <Button
                      variant="ghost"
                      onClick={() => removeLocation(location.id)}
                      className="bg-[#FEF5F7] sm:p-2 w-full"
                    >
                      <Icon name="cross" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 items-center justify-end hidden lg:flex">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => startEditing(location)}
                >
                  <Icon name="pen" />
                </Button>
              </div>
            </div>
            <div className=" hidden lg:block">
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeLocation(location.id)}
                className="bg-[#FEF5F7] p-2"
              >
                <Icon name="cross" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
