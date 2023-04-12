import { Request, Response } from "express";
const {
  getStorageStatus,
  getSystemStatus,
} = require("../services/SystemStatusService");

const get = async (req: Request, res: Response) => {
  try {
    const storage = await getStorageStatus();
    const systemInfo = await getSystemStatus();

    return res.json({ storage: storage, system: systemInfo });
  } catch (error) {
    return res.sendStatus(400);
  }
};

module.exports = { get };
