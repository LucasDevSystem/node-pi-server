const { VlcSingleton } = require("./MediaPlayerService");

/**
 * mediaplayer socket communication
 * when a client trigger an action alll clients will receive
 * @param socket
 * @param io
 */
const mediaPlayerComm = (socket: any, io: any) => {
  try {
    // curr media stt
    let currentStatus = {
      elapsedTime: 20,
      title: "avatar",
    };
    const vlc = VlcSingleton.getInstance();
    // send to all clients diconnection
    vlc.disconnectionCb = () => io.emit("disconnection", "VLC_DISCONNECTED");

    // listeners
    socket.on("media-player-cmd", (cmd: string) => {
      console.log(cmd);
      vlc.sendCommand(cmd);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  } catch (error) {
    console.log('disconnected')
    console.log(error);
  }
};

module.exports = { mediaPlayerComm };

