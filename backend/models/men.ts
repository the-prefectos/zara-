import mongoose, { Document } from "mongoose";

export interface MenDocument extends Document {
  image: string;
  name: string;
  gen: string;
  price: string;
  desc : string ;
}

const menSchema = new mongoose.Schema<MenDocument>(
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

const Men = mongoose.model<MenDocument>("men", menSchema);
export default Men;
