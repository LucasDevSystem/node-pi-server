const { VlcSingleton } = require("./MediaPlayerService");

/**
 * mediaplayer socket communication
 * all clients will  be updated with same events
 * @param socket
 * @param io
 */
const mediaPlayerComm = (socket: any, io: any) => {
  try {
    let mediaPlayer = {
      currentTime: 0,
      title: "",
      id: undefined,
    };

    const vlc = VlcSingleton.getInstance();
    
    if(!vlc.isServiceStarted()){
      vlc.start();
    }
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
    console.log("disconnected");
    console.log(error);
  }
};

module.exports = { mediaPlayerComm };
