import { spawn, ChildProcess } from "child_process";

class VlcSingleton {
  private static instance: VlcSingleton;
  private vlc: ChildProcess;
  private isStarted = false;

  private constructor() {
    this.vlc = this.start();
    this.isStarted = true;
  }

  private start() {
    let vlc = spawn("vlc");

    vlc?.stdout?.on("data", (data) => {
      console.log(`Saída do VLC: ${data}`);
    });

    vlc.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      this.isStarted = false;
    });

    return vlc;
  }

  static getInstance(): VlcSingleton {
    if (!VlcSingleton.instance) {
      VlcSingleton.instance = new VlcSingleton();
    }
    return VlcSingleton.instance;
  }

  isServiceStarted(): boolean {
    return this.isStarted;
  }

  write(command: string) {
    console.log("comand");
    this.vlc?.stdin?.write(command);
  }
}

module.exports = { VlcSingleton };
