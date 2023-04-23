import { Request, Response } from "express";
const { VlcSingleton } = require("../services/MediaPlayerService");

const post = async (req: Request, res: Response) => {
  try {
    //start media
    const vlc = VlcSingleton.getInstance();
    vlc.write("add Avatar7.1.mkv\n");

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
};

module.exports = { post };
