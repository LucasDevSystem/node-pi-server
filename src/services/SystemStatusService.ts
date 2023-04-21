const util = require("util");
const exec = util.promisify(require("child_process").exec);

// Raspberry OS commands
const MEMORY_FREE =
  "egrep --color 'MemAvailable' /proc/meminfo | egrep '[0-9.]{4,}' -o";
const MEMORY_TOTAL =
  "egrep --color 'MemTotal' /proc/meminfo | egrep '[0-9.]{4,}' -o";
const CURR_TEMP = "cat /sys/class/thermal/thermal_zone0/temp";
const STORAGE = "df -h";
const CPU = "top -d 0.5 -b -n2 | grep 'Cpu(s)'|tail -n 1 | awk '{print $2 + $4}'";

/**
 *  get used and avaliable storage
 * @returns {{used: number , avaliable:number}}
 */
async function getStorageStatus(): Promise<{
  used: number;
  avaliable: number;
}> {
  let stdout = await execCommand(STORAGE);
  // split in lines
  const lines = stdout.split("\n");

  // get root line info
  const storageInfo = lines[1].split(/\s+/);

  return {
    used: parseFloat(storageInfo[2]),
    avaliable: parseFloat(storageInfo[3]),
  };
}

/**
 * get system temperature and memory.
 * @returns {object}
 */
async function getSystemStatus(): Promise<{
  temp: number;
  memFree: number;
  memTotal: number;
  cpu: number;
}> {
  let memFree = await execCommand(MEMORY_FREE);
  memFree = parseInt(memFree) / 1000;

  let memTotal = await execCommand(MEMORY_TOTAL);
  memTotal = parseInt(memTotal) / 1000;

  let temp = await execCommand(CURR_TEMP);
  temp = parseFloat(temp) / 1000;

  let cpu = await execCommand(CPU);
  cpu = parseFloat(cpu);

  return {
    temp,
    memFree,
    memTotal,
    cpu
  };
}

// creates a new shell process and executes a command in that shell
async function execCommand(command = "") {
  try {
    const { stdout, stderr } = await exec(command);

    return stdout;
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).

    return "";
  }
}

module.exports = { getSystemStatus, getStorageStatus };
