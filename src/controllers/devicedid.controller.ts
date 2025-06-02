import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DeviceDid } from "../entities/DeviceDid";
// Repository for User entity
import EzrahCredsSdk from "@coincord/ezrah-creds-sdk";

import { faker } from "@faker-js/faker";

const didRepository = AppDataSource.getRepository(DeviceDid);
// const ezrahCredsSdk = EzrahCredsSdk
const ezrahCredsSdk = new EzrahCredsSdk();

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
    const { did, public_key, device_meta } = req.body;

    // Create new user instance
    const devicedid = new DeviceDid();
    devicedid.did = did;
    devicedid.public = public_key;
    devicedid.metadata = JSON.stringify(device_meta);

    // Save to database
    const didResult = await didRepository.save(devicedid);

    const fakeSSN = faker.helpers.replaceSymbols("###-##-####");
    const claims: Record<string, unknown> = {
      credential_type: "auth_credential",
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      sex: faker.person.sex(),
      passport_id: fakeSSN,
      sub: did,
      role: ["customer"],
    };

    const disclosures: string[] = <string[]>[
      "first_name",
      "last_name",
      "sex",
      "passport_id",
      "role",
    ];

    // issue a credential for this sdk
    await ezrahCredsSdk.issueEncryptedSDJWT(claims, disclosures, public_key);

    res.status(201).json({
      ...didResult,
      credential_created: true,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating device did", error: error.message });
  }
};
