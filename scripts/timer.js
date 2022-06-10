class Timer {
  constructor() {
    this.startTime = null;
    this.endTime = null;
    this.running = false;
    this.duration = 0;
  }
  start = () => {
    if (this.running) throw new Error("Timer already started");

    this.running = true;

    this.startTime = new Date();

    // const start = Date.now();
    // this.running = true;
    // let myTimer = setInterval(() => {
    //   if (!timerStarted) {
    //     clearInterval(myTimer);
    //   }
    //   const delta = Date.now() - start;
    //   rounded = Math.floor(delta / 1000);
    //   // timer = delta / 1000;
    //   if (delta / 1000 - rounded < 0.5) {
    //     timer = rounded;
    //   } else {
    //     timer = rounded + 0.5;
    //   }
    // }, 500); // runs every half second
  };
  pause = () => {
    if (!this.running) throw new Error("Timer not started");

    this.running = false;
    this.endTime = new Date();

    const seconds = (this.endTime.getTime() - this.startTime.getTime()) / 1000;

    this.duration += seconds;
  };
  reset = () => {
    this.startTime = null;
    this.endTime = null;
    this.running = false;
    this.duration = 0;
  };
  stop = () => {
    this.pause();
    let d = this.duration;
    this.reset();
    return d;
  };
}
// const t1 = new Timer();
// t1.start();
