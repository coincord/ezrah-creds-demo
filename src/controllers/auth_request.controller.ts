import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Get all users
export const authCheckRequest = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const accessKey = req.headers.authorization;
    if (!accessKey) {
      throw new Error("Unauthorized request");
    }
    const token = accessKey.split(" ")[1];

    const verify = jwt.verify(token, <string>process.env.OAUTH_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    if (verify) {
      res.status(200).json({
        payload: verify,
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
