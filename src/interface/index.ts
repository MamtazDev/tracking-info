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
    location: {
      type: "Point";
      formatted: string;
      coordinates: [number, number];
    };
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
  isArchived: boolean;
}

export interface Location {
  id: number;
  location: {
    type: "Point";
    formatted: string;
    coordinates: [number, number];
  } | null;
  startDate: DateValue | null;
  endDate: DateValue | null;
  startTime: Time | null;
  endTime: Time | null;
  actualDate: DateValue | null;
  actualTime: Time | null;
  isCompleted: boolean;
}
