import { Router } from "express";

import {
  getAllDevicedids,
  getDeviceIdByDid,
  createDeviceDids,
} from "../controllers/devicedid.controller";

import { authCheckRequest } from "../controllers/auth_request.controller";

const router = Router();

// auth request check
router.get("/auth", authCheckRequest);

// GET all users
router.get("/", getAllDevicedids);

// GET a single user by ID
router.get("/:did", getDeviceIdByDid);

// POST to create a new user
router.post("/", createDeviceDids);

export default router;
