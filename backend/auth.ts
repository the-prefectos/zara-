import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { SECRET_KEY } = process.env;

interface DecodedToken {
  user: {
    _id: string;
    is_admin: boolean;
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

  req.user = decoded.user._id;
  req.isAdmin = decoded.user.is_admin;

  return next();
};

const authorizeAdmin = async (
  req: any,
  res: any,
  next: any
): Promise<any> => {
  if (!req.isAdmin) {
    return res.status(403).send({
      message: "Unauthorized access",
      status: false,
    });
  }

  return next();
};

export { authenticate, authorizeAdmin };
