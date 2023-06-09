import { Request, Response } from "express";
const { VlcSingleton } = require("../services/MediaPlayerService");

const post = async (req: Request, res: Response) => {
  try {
    const commandData = req.body;
    console.log(commandData.command);

    //start media
    const vlc = VlcSingleton.getInstance();

    if (!vlc.isServiceStarted()) {
      vlc.start();
    }
    
    console.log(vlc.isServiceStarted());

    vlc.sendCommand(commandData.command);

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
};

module.exports = { post };
