import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { SECRET_KEY } = process.env;

interface DecodedToken {
  user: {
    _id: string;
  };
}

const verifyToken = (token: string): Promise<DecodedToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY as Secret, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded as DecodedToken);
    });
  });
};

const authenticate = async (
  req: any,
  res: any,
  next: any
): Promise<any> => {
  if (!req.headers.authorization)
    return res.status(400).send({
      message: "Authorization token not found or incorrect",
      status: false,
    });

  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({
      message: "Authorization token not found or incorrect",
      status: false,
    });

  const token = req.headers.authorization.trim().split(" ")[1];

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "Authorization token not found or incorrect",
      status: false,
    });
  }

  console.log(decoded);

  req.user = decoded.user._id;

  return next();
};

export default authenticate;
