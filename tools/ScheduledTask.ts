export const TIME_PERIOD = {
    ms: 1,
    sec: 1000,
    min: 60000,
    hour: 3600000
}

export class ScheduledTask {
    static instances: ScheduledTask[] = []

    static timer = {
        elapsed: 0,
        interval: TIME_PERIOD.sec, // default run each sec
        duration: TIME_PERIOD.hour, // default reset timer every hour
        ref: null   // interval object ref
    }
    interval = TIME_PERIOD.min;

    static startTimer(globalInterval = TIME_PERIOD.sec, maxDuration = TIME_PERIOD.hour) {
        if (!ScheduledTask.timer.ref) {
            console.info(`[Scheduler] Starting timer at ${globalInterval} ms rate`)
            ScheduledTask.timer.elapsed = 0
            ScheduledTask.timer.interval = globalInterval
            ScheduledTask.timer.duration = maxDuration
            ScheduledTask.timer.ref = setInterval(() => ScheduledTask.sendTick(), globalInterval);
        } else {
            console.warn("[Scheduler] timer already running")
        }
    }

    static stopTimer() {
        console.info("[WebSocketClientService] Stopping watch loop")
        clearInterval(ScheduledTask.timer.ref);
    }

    constructor(timeInterval = TIME_PERIOD.min) {
        ScheduledTask.instances.push(this)
        this.interval = timeInterval
        console.log(`[Scheduler] new task (${this.interval} ms rate) => total ${ScheduledTask.instances.length} tasks`)
    }

    // send tick to tasks instance
    static sendTick() {
        // increase timer
        if (ScheduledTask.timer.elapsed < ScheduledTask.timer.duration) {
            ScheduledTask.timer.elapsed += ScheduledTask.timer.interval
        } else {
            console.log("watch loop timer limit reached => reinit")
        }
        ScheduledTask.instances
            .filter(task => ScheduledTask.timer.elapsed % task.interval === 0)   // check periodicity is matching
            .forEach(task => task.onTick())
    }

    // to be implemented in instance
    onTick() {

    }
}