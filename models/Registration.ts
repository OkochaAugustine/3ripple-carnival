import mongoose, { Schema, Document } from "mongoose";

export interface IRegistration extends Document {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  registrationCode: string;
  registeredAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    registrationCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Registration || mongoose.model<IRegistration>("Registration", RegistrationSchema);
