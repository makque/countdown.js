/*
    Simple countdown timer script

    SOURCE: https://mindgrader.com/tutorials/1-how-to-create-a-simple-javascript-countdown-timer
    MODDED: January 10, 2014

    ORIGINAL SCRIPT/SNIPPET:
        // set the date we're counting down to
        var target_date = new Date("Aug 15, 2019").getTime();

        // variables for time units
        var days, hours, minutes, seconds;

        // get tag element
        var countdown = document.getElementById("countdown");

        // update the tag with id "countdown" every 1 second
        setInterval(function () {

            // find the amount of "seconds" between now and target
            var current_date = new Date().getTime();
            var seconds_left = (target_date - current_date) / 1000;

            // do some time calculations
            days = parseInt(seconds_left / 86400);
            seconds_left = seconds_left % 86400;

            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;

            minutes = parseInt(seconds_left / 60);
            seconds = parseInt(seconds_left % 60);

            // format countdown string + set tag value
            countdown.innerHTML = days + "d, " + hours + "h, "
            + minutes + "m, " + seconds + "s";

        }, 1000);

    USAGE:
        -- code --
        // variables
        var date = "2014-01-10 10:56:00"; // parsable datetime string 'Aug 15, 2019', '2014-01-10 10:56:00'
        var id = "myCountdown"; // id container
        var options = {template: true, autoStop: true, doubleDigit: true}; // all options default to false

        // create instance
        var countdown = new Countdown(date, id, options);
        // start the countdown
        countdown.start();

        -- html / no template --
        <div id="myCountdown"></div>
        -- output --
        363 : 21 : 54 : 10

        -- html / with template --
        <div id="myCountdown" style="display:inline-block;">
            <div style="text-align:center;">Remaining</div>
            <div style="display:inline-block; width:100px;">
                <div id="myCountdown-days">&nbsp;</div>
                <div>Days</div>
            </div>
            <div style="display:inline-block; width:100px;">
                <div id="myCountdown-hours">&nbsp;</div>
                <div>Hours</div>
            </div>
            <div style="display:inline-block; width:100px;">
                <div id="myCountdown-minutes">&nbsp;</div>
                <div>Minutes</div>
            </div>
            <div style="display:inline-block; width:100px;">
                <div id="myCountdown-seconds">&nbsp;</div>
                <div>Seconds</div>
            </div>
        </div>

        For options:
            - template: set true to enable templating
            - autoStop: set true to stop the timer after countdown, displays 00 : 00 : 00 : 00

        For templates:
            - format for days: {id}-days i.e., myCountdown-days
            - same format for the rest {id}-hours, {id}-minutes, {id}-seconds

*/
function Countdown(date, id, options) {
    // constructor
    this.date = date;
    this.id = id;
    this.options = options;
    this.intervalId = null;

    // options
    this.template = this.options ? ("template" in this.options ? this.options.template : false) : false;
    this.autoStop = this.options ? ("autoStop" in this.options ? this.options.autoStop : false) : false;
    this.doubleDigit = this.options ? ("doubleDigit" in this.options ? this.options.doubleDigit : false) : false;

    // methods
    this.start = function() {
        var self = this;
        // set the date we're counting down to
        var target_date = new Date(self.date).getTime();

        // variables for time units
        var days, hours, minutes, seconds;

        // get tag element
        var countdown = document.getElementById(self.id);

        // update the tag with id "countdown" every 1 second
        self.intervalId = setInterval(function () {
            // find the amount of "seconds" between now and target
            var current_date = new Date().getTime();
            var seconds_left = (target_date - current_date) / 1000;

            // do some time calculations
            days = parseInt(seconds_left / 86400);
            seconds_left = seconds_left % 86400;

            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;

            minutes = parseInt(seconds_left / 60);
            seconds = parseInt(seconds_left % 60);

            // option: autoStop
            if (self.autoStop && seconds_left < 0) {
                // if autoStop is enabled
                // negative values become '00'
                days = hours = minutes = seconds = 0;
            }
            // option: doubleDigit
            if (self.doubleDigit) {
                // get all absolute values for each
                daysAbs = Math.abs(days);
                hoursAbs = Math.abs(hours);
                minutesAbs = Math.abs(minutes);
                secondsAbs = Math.abs(seconds);

                // is negative?
                var neg = days < 0;
                days = daysAbs.toString().length == 1 ? (neg ? "-" : "") + "0" + daysAbs : days;

                var neg = hours < 0;
                hours = hoursAbs.toString().length == 1 ? (neg ? "-" : "") + "0" + hoursAbs : hours;

                var neg = minutes < 0;
                minutes = minutesAbs.toString().length == 1 ? (neg ? "-" : "") + "0" + minutesAbs : minutes;

                var neg = seconds < 0;
                seconds = secondsAbs.toString().length == 1 ? (neg ? "-" : "") + "0" + secondsAbs : seconds;
            }
            // option: template
            // if template
            if (self.template) {
                var containerDays = document.getElementById(self.id + "-days");
                var containerHours = document.getElementById(self.id + "-hours");
                var containerMinutes = document.getElementById(self.id + "-minutes");
                var containerSeconds = document.getElementById(self.id + "-seconds");

                if (containerDays) { containerDays.innerHTML = days; }
                if (containerHours) { containerHours.innerHTML = hours; }
                if (containerMinutes) { containerMinutes.innerHTML = minutes; }
                if (containerSeconds) { containerSeconds.innerHTML = seconds; }
            // else format countdown string + set tag value i.e., 10 : 10 : 10 : 10
            } else {
                countdown.innerHTML = days + " : " + hours + " : " + minutes + " : " + seconds;
            }

            // option: autoStop
            // if autoStop is enabled, stop if countdown is over
            if (self.autoStop && seconds_left < 0) {
                clearInterval(self.intervalId);
            }

        }, 1000);
    }
}

