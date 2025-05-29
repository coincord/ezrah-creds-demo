import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DeviceDid } from "../entities/DeviceDid";
// Repository for User entity

const didRepository = AppDataSource.getRepository(DeviceDid);

// Get all users
export const getAllDevicedids = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deviceDids = await didRepository.find();
    res.status(200).json(deviceDids);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get user by ID
export const getDeviceIdByDid = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.did;
    const did = await didRepository.findOneBy({ did: id });

    if (!did) {
      res.status(404).json({ message: "Did not found" });
      return;
    }

    res.status(200).json(did);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Create a new user
export const createDeviceDids = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { did, public_key } = req.body;

    // Create new user instance
    const devicedid = new DeviceDid();
    devicedid.did = did;
    devicedid.public = public_key;

    // Save to database
    const didResult = await didRepository.save(devicedid);
    res.status(201).json(didResult);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating device did", error: error.message });
  }
};
