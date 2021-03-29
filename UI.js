class UI {
    timer;
    minutes;
    seconds;
    start;
    pause;
    reset;
    instructions;
    work;
    break;
    setWorkTime;
    setBreakTime;
    update;
    status;
    workTime;
    timerSet;
    alarm;
    audio;
    //refactor this UI class by creating a new updateDOM class that interacts with the DOM

    constructor(timer) {
        this.timer = timer;

        this.minutes = document.getElementById("minutes");
        this.minutes.innerHTML = this.timer.getMinutesString();

        this.seconds = document.getElementById("seconds");
        this.seconds.innerHTML = this.timer.getSecondsString();

        this.start = document.getElementById("start");
        this.pause = document.getElementById("pause");
        this.reset = document.getElementById("reset");
        this.instructions = document.getElementById("instructions");
        this.work = document.getElementById("work");
        this.break = document.getElementById("break");
        // this.setWorkTime = this.timer.getMinutes();
        this.setWorkTime = document.getElementById("setWorkTimeInput");
        this.setWorkTime.value = this.timer.getMinutes();
        // this.setBreakTime = this.timer.getMinutesPom();
        this.setBreakTime = document.getElementById("setBreakTimeInput");
        this.setBreakTime.value = this.timer.getMinutesPom();
        this.update = document.getElementById("update");

        this.status = document.getElementById("status");

        this.workTime = true;

        this.timerSet = null;

        this.alarm = null;
        this.audio = new Audio("beep.mp3");

        this.addEvents();
    }

    addEvents = () => {
        this.start.addEventListener("click", () => {
            this.startTimer();
        });

        this.pause.addEventListener("click", () => {
            this.pauseTimer();
        })

        this.reset.addEventListener("click", () => {
            this.resetTimer();
            this.pauseTimer();
        })

        this.instructions.addEventListener("click", () => {
            this.instructionsPopup();
        })

        this.work.addEventListener("click", () => {
            this.setWorkStatus();
            this.alarmOn(false);
        })

        this.break.addEventListener("click", () => {
            this.setBreakStatus();
            this.alarmOn(false);
        })

        this.update.addEventListener("click", () => {
            this.setNewTime();
            this.pauseTimer();
        })

        document.addEventListener("keydown", (e) => {
            if (e.key == 'a') console.log("a")
        });
    }

    startTimer = () => {
        this.alarmOn(false);
        if (!this.timerSet) {
            this.timerSet = setInterval(this.timerInterval, 1000);
        }
    }

    pauseTimer = () => {
        this.alarmOn(false);
        clearInterval(this.timerSet);
        this.timerSet = null;
    }

    resetTimer = () => {
        if (this.workTime) {
            this.timer.setWorkTime();
        } else {
            this.timer.setBreakTime();
        }
        this.updateTime();
    }

    instructionsPopup = () => {
        alert("start: starts/resumes timer\npause: pauses/stops the timer\nreset: resets the timer\ninsructions: displays instructions\nwork: sets timer for work time\nbreak: sets timer for break time\nupdate: set custom values for work and break times");
    }

    timerInterval = () => {
        this.timer.incrementTime();
        this.updateTime();
        if (this.workTime && this.timer.isEmpty()) {
            this.setBreakStatus();
        } else if (!this.workTime && this.timer.isEmpty()) {
            this.setWorkStatus();
        }
    }

    updateTime = () => {
        this.minutes.innerHTML = this.timer.getMinutesString();
        this.seconds.innerHTML = this.timer.getSecondsString();
    }

    setNewTime = () => {
        this.timer.updateTimes(Number(this.setWorkTime.value), Number(this.setBreakTime.value));
        this.resetTimer();
    }

    setWorkStatus = () => {
        clearInterval(this.timerSet);
        this.timerSet = null;
        this.workTime = true;
        this.status.innerHTML = "Work time!";
        document.getElementById("bod").style.backgroundColor = "green";
        this.timer.setWorkTime();
        this.updateTime();
        this.alarmOn(true);
    }

    setBreakStatus = () => {
        clearInterval(this.timerSet);
        this.timerSet = null;
        this.workTime = false;
        this.status.innerHTML = "Break time!";
        document.getElementById("bod").style.backgroundColor = "red";
        this.timer.setBreakTime();
        this.updateTime();
        this.alarmOn(true);
    }

    alarmOn = (bool) => {
        if (bool) {
            this.audio.loop = true;
            this.audio.play();
        } else {
            this.audio.pause(); 

        };
    }
}