import mongoose, { Document } from "mongoose";

export interface WomenDocument extends Document {
  image: string;
  name: string;
  gen: string;
  price: string;
  desc : string ;
}

const womenSchema = new mongoose.Schema<WomenDocument>(
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

const Women = mongoose.model<WomenDocument>("women", womenSchema);
export default Women;
