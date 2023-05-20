import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  fname: string;
  lname : string;
  email: string;
  password: string;
  checkPassword(password: string): boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre<UserDocument>("save", function (next) {
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model<UserDocument>("user", userSchema);
export default User;
