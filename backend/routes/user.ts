import { Request, Response } from "express";
import User, { UserDocument } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { SECRET_KEY } = process.env;

const generateToken = (user: UserDocument): string => {
  return jwt.sign({ user }, SECRET_KEY || "");
};

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { fname, lname, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .send({ message: "Email already exists", status: false });
    }

    user = await User.create({ fname, lname, email, password });

    const token = generateToken(user);
    return res.status(200).send({ user, token, status: true });
  } catch (err : any) {
    return res.status(400).send({ message: err.message });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "Wrong Email or Password", status: false });
    }

    const match = user.checkPassword(password);

    if (!match) {
      return res.status(400).send({ message: "Wrong Email or Password", status: false });
    }

    const token = generateToken(user);

    return res.status(200).send({ user, token, status: true });
  } catch (err :any) {
    return res.status(400).send({ message: err.message });
  }
};


export { register, login };