import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface ITracking {
  loadId: string;
  status: string;
  driverName: string;
  driverPhone: string;
  carrierName: string;
  carrierPhone: string;
  notificationEmail: string;
  notificationPhone: string;
  note: string;
}

export interface ITrackingDocument extends ITracking, Document {
  _Id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema<ITrackingDocument>(
  {
    loadId: { type: String, trim: true, required: true },
    status: { type: String, trim: true, required: true },
    driverName: { type: String, trim: true, required: true },
    driverPhone: { type: String, trim: true, required: true },
    carrierName: { type: String, trim: true, required: true },
    carrierPhone: { type: String, trim: true, required: true },
    notificationEmail: { type: String, trim: true, required: true },
    notificationPhone: { type: String, trim: true, required: true },
    note: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Tracking: Model<ITrackingDocument> =
  mongoose.models.Tracking || mongoose.model("Tracking", schema);

export default Tracking;
