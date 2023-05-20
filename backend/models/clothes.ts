import mongoose, { Document } from "mongoose";

export interface ClothesDocument extends Document {
  image: string;
  name: string;
  desc: string;
  price: string;
}

const clothesSchema = new mongoose.Schema<ClothesDocument>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Clothes = mongoose.model<ClothesDocument>("clothes", clothesSchema);
export default Clothes;
