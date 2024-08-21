import { ITracking } from "@/interface";
import { DateValue, Time } from "@internationalized/date";
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
    carrierName: { type: String, trim: true },
    carrierPhone: { type: String, trim: true },
    notificationEmail: { type: String, trim: true },
    notificationPhone: { type: String, trim: true },
    note: { type: String, trim: true },
    locations: [
      {
        id: { type: Number, required: true },
        location: {
          type: { type: String, enum: ["Point"], default: "Point" },
          formatted: { type: String, trim: true, required: true },
          coordinates: {
            type: [Number],
            required: true,
            validate: {
              validator: function (value: number[]) {
                return value.length === 2;
              },
              message: (props: Record<string, unknown>) =>
                `${props.value} is not a valid coordinate array!`,
            },
          }, // [longitude, latitude]
        },
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
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Tracking: Model<ITrackingDocument> =
  mongoose.models.Tracking || mongoose.model("Tracking", schema);

export default Tracking;
