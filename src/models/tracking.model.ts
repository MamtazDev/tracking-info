import { ITracking } from "@/interface";
import { Time, DateValue } from "@internationalized/date";
import mongoose, { Document, Model, ObjectId } from "mongoose";

const dateSchema = new mongoose.Schema<DateValue>(
  {
    calendar: {
      identifier: { type: String, trim: true, required: true },
    },
    era: { type: String, trim: true, required: true },
    year: { type: Number, required: true },
    day: { type: Number, required: true },
    month: { type: Number, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const timeSchema = new mongoose.Schema<Time>(
  {
    hour: { type: Number, required: true },
    minute: { type: Number, required: true },
    second: { type: Number, required: true },
    millisecond: { type: Number, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

export interface ITrackingDocument extends Omit<ITracking, "_id">, Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema<ITrackingDocument>(
  {
    loadId: { type: String, trim: true, required: true },
    loadStatus: { type: String, trim: true, required: true },
    driverName: { type: String, trim: true, required: true },
    driverPhone: { type: String, trim: true, required: true },
    carrierName: { type: String, trim: true, required: true },
    carrierPhone: { type: String, trim: true, required: true },
    notificationEmail: { type: String, trim: true, required: true },
    notificationPhone: { type: String, trim: true, required: true },
    note: { type: String, trim: true, required: true },
    locations: [
      {
        id: { type: Number, required: true },
        location: { type: String, trim: true, required: true },
        isCompleted: { type: Boolean, default: false },
        actualDate: dateSchema,
        actualTime: timeSchema,
        startDate: dateSchema,
        startTime: timeSchema,
        endDate: dateSchema,
        endTime: timeSchema,
      },
    ],
    status: { type: String, trim: true, required: true },
    isPublished: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Tracking: Model<ITrackingDocument> =
  mongoose.models.Tracking || mongoose.model("Tracking", schema);

export default Tracking;
