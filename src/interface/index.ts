import { DateValue, Time } from "@internationalized/date";
import { ObjectId } from "mongoose";

export interface ITracking {
  _id: ObjectId;
  loadId: string;
  loadStatus: string;
  driverName: string;
  driverPhone: string;
  carrierName: string;
  carrierPhone: string;
  notificationEmail: string;
  notificationPhone: string;
  note: string;
  locations: {
    id: number;
    location: string;
    isCompleted: boolean;
    actualDate: DateValue;
    actualTime: Time;
    startDate: DateValue;
    startTime: Time;
    endDate: DateValue;
    endTime: Time;
  }[];
  status: string;
  isPublished: boolean;
}

export interface Location {
  id: number;
  location: string;
  startDate: DateValue;
  endDate: DateValue;
  startTime: Time;
  endTime: Time;
  actualDate: DateValue;
  actualTime: Time;
  isCompleted: boolean;
}
