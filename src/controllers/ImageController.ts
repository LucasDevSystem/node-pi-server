import { Request, Response } from "express";
var fs = require("fs");

const path = require("path");

const post = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.sendStatus(400);
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "../uploads");
    var files = fs.readdirSync(filePath);

    return res.json(files);
  } catch (error) {
    return res.sendStatus(400);
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.query;

    const filePath = path.join(__dirname, "../uploads", id);
    res.setHeader("Content-Type", "image/jpeg");
    const fileStream = fs.createReadStream(filePath);

    fileStream.pipe(res);
  } catch (error) {
    return res.sendStatus(400);
  }
};

module.exports = { post, get, getOne };
