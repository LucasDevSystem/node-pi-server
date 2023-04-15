import { Request, Response } from "express";

const systemInfo = require("./controllers/SystemStatusController");
const images = require("./controllers/ImageController");
const uploadImageMiddleware = require("./middlewares/UploadImageMiddleware");

const express = require("express");
const routes = express.Router();

// FRONTEND
routes.get("/", function (req: Request, res: Response) {
  res.sendFile(__dirname + "/view/home/index.html");
});

routes.get("/images", function (req: Request, res: Response) {
  res.sendFile(__dirname + "/view/images/index.html");
});

// BACKEND
routes.get("/api/systeminfo", systemInfo.get);

routes.get("/api/images", images.get);

routes.get("/api/image?:id", images.getOne);

routes.post(
  "/api/upload",
  uploadImageMiddleware.uploadSingleImg,
  function (req: any, res: Response) {
    res.json(req.file.filename);
  }
);

export { routes };
