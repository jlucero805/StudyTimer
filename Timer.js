class Timer {
    startSeconds;
    startMinutes;
    seconds;
    minutes;
    startSecondsPom;
    startMinutesPom;


    constructor(minutes, minutesPom) {
        this.startSeconds = 0;
        this.startMinutes = minutes;
        this.seconds = 0;
        this.minutes = minutes;
        this.startSecondsPom = 0;
        this.startMinutesPom = minutesPom;
    }

    getMinutes = () => {
        return this.startMinutes;
    }

    getMinutesPom = () => {
        return this.startMinutesPom;
    }

    incrementTime = (val = -1) => {
        if (this.seconds > 0) {
            this.seconds += val;
        } else if (this.seconds == 0 && this.minutes > 0) {
            this.minutes--;
            this.seconds = 59;
        } else if (this.seconds == 0 && this.mintues == 0) {
            //pass
        }
    }

    setWorkTime = () => {
        this.minutes = this.startMinutes;
        this.seconds = 0;
    }

    setBreakTime = () => {
        this.minutes = this.startMinutesPom;
        this.seconds = 0;
    }

    incrementPom = () => {
        ;
    }

    reset = () => {
        this.seconds = this.startSeconds;
        this.minutes = this.startMinutes;
    }

    //Return the seconds value as a string with two digits
    //none -> String
    getSecondsString = () => {
        if (this.seconds < 10) {
            return "0" + String(this.seconds);
        }
        return String(this.seconds);
    }

    getMinutesString = () => {
        if (this.minutes < 10) {
            return "0" + String(this.minutes);
        }
        return String(this.minutes);
    }

    isEmpty = () => {
        if (this.seconds == 0 && this.minutes == 0) {
            return true;
        }
        return false;
    }

    updateTimes(minutes, minutesPom) {
        this.startMinutes = minutes;
        this.startMinutesPom = minutesPom;
    }
}