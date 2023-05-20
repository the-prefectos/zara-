import mongoose, { Document } from "mongoose";

export interface KidsDocument extends Document {
    image: string;
    name: string;
    gen: string;
    price: string;
    desc : string ;
}

const kidsSchema = new mongoose.Schema<KidsDocument>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    gen: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Kids = mongoose.model<KidsDocument>("kids", kidsSchema);
export default Kids;
