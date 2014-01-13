Simple countdown timer script

SOURCE: https://mindgrader.com/tutorials/1-how-to-create-a-simple-javascript-countdown-timer
MODDED: January 10, 2014

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