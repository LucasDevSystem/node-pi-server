import { spawn, ChildProcess } from "child_process";

class VlcSingleton {
  private static instance: VlcSingleton;
  private vlc: ChildProcess;
  private isMediaStarted = false;

  private constructor() {
    this.vlc = spawn("vlc");

    this.vlc?.stdout?.on("data", (data) => {
      console.log(`Saída do VLC: ${data}`);
    });

    this.vlc.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  static getInstance(): VlcSingleton {
    if (!VlcSingleton.instance) {
      VlcSingleton.instance = new VlcSingleton();
    }
    return VlcSingleton.instance;
  }
  
  isPlayingMedia() {
    return this.isMediaStarted;
  }

  write(command: string) {
    console.log("comand");
    this.vlc?.stdin?.write(command);
  }
}

module.exports = { VlcSingleton };
