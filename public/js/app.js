
// get current value of work interval slider
var workSliderValue = $('.column input').val();
// put that value into the p element under than slider
$('.column p').text(workSliderValue + ' minutes');

// get current value of break interval slider
var breakSliderValue = $('.column2 input').val();
// put that value into the p element under than slider
$('.column2 p').text(breakSliderValue + ' minutes');

// listen for change and mousemove on both sliders
$('input').on('change mousemove', function() {
  // assign value on change to thisInput
  const thisInput = $(this);
  // if defalut vale is 25 we a listening to the work interval slider
  if (thisInput.prop('defaultValue') == 25) {
    // so adjust time under work interval slider
    workSliderValue = thisInput.val(); // make assignment to use later in timer
    let workMinutes = (workSliderValue == 1) ? ' minute' : ' minutes';
    $('.column p').text(workSliderValue + workMinutes);
  }
  // else if defalut vale is 5 we a listening to the break interval slider
  else {
    // so adjust time under break interval slider
    breakSliderValue = thisInput.val();
    let breakMinutes = (breakSliderValue == 1) ? ' minute' : ' minutes';
    $('.column2 p').text(breakSliderValue + breakMinutes);
  }

});

(function() {
  // need to declare countdown outside of timerFunction so that the input change
  // event, and the buttonContainer click event have access to it for clearing
  // the timer when the user wants to stop the timer and make adjustments.
  var countdown;
  // pause controls whether or not the timer will be in a running state
  var pause = true;
  // lets the start/stop click action know whether or not to start a new timer
  // or just pause/unpause the current timer
  let newSliderValues = true;

  $('input').change(() => {
    // if slider(s) are changed while timer is paused, re-initialize
    // timer, and set flag newSliderValues so buttonContainer click event
    // knows to start a new timer with the new slider values.
    // And reset progress bar to green to be started over in work session
    $('.progressBar').css('background-color', '#1e8449');
    clearInterval(countdown);
    newSliderValues = true;
  });

  $('.buttonContainer').on('click', () => {
    // on first run pause is set to true above, this sets it to false on first
    // button click so that the timer runs. subsequent clicks toggle the run
    // state of the timer.
    pause = pause ? false : true;


    // if new slider values have been entered, then call the timerFunction with
    // the new parameters
    if (newSliderValues) {
      newSliderValues = false;
      timerFunction(workSliderValue, 'Work');
    }

    // Make the sliders inactive when timer is running and vice versa
    // get boolean value of disabled property of sliders
    let sliderState = $('input').prop('disabled');
    // toggle that value, so that sliders are enabled when timer is paused
    $('input').prop('disabled', !sliderState);

  });

  // timer implemented from javascript
  function timerFunction(timeInMinutes, whichTimer) {
    let seconds = timeInMinutes * 60;

    /*
     * Progress Bar
     *
     * if countdown time is only 1 minute set progressCounter to -1 so bar does
     * not go to 101 percent.
     *
     * progressIncrementer is the amount to increment the progress bar on every
     * tick of the countdown. This is proportional to the countdown timer.
     */
    let progressCounter = (seconds == 60) ? -1 : 0;
    let progressIncrementer = 100/seconds;

    countdown = setInterval(() => {
      /**
       * if pause is false, run as usual. if pause is true all of the state below
       * here is kept the same, while the logic does not run, but rather
       * continues to return. when pause becomes false again the timer pics up
       * where it left off.
       */
      if (pause)
        return;
      if (seconds >= 0) {
        // tenary checks if secondsRemaining in the current minute is less than
        // 10. If it is, then append a 0 and, if not do nothing
        let secondsRemaining = ((seconds % 60) < 10) ? '0' + (seconds % 60) : (seconds % 60);
        let minutesRemaining = Math.floor(seconds/60);
        $('.timer').text(minutesRemaining + ':' + secondsRemaining);
        $('.session').text(whichTimer);
        $('title').text('Pomodoro (' + minutesRemaining + ':' + secondsRemaining + ')');
        seconds--;

        // increment progressCounter
        progressCounter += progressIncrementer;

        // Truncate progressCounter value and use it to advance the progress
        // bar accros the screen
        $('.progressBar').width(Math.trunc(progressCounter)+'%');
      }
      else {
        if (whichTimer == 'Work') {
          clearInterval(countdown);
          // make sure progress bar is at 0 when switching to break interval
          // before changing color
          $('.progressBar').width('0%');
          // change progress bar color to red for break interval
          $('.progressBar').css('background-color', '#c0392b');
          timerFunction(breakSliderValue, 'Break');
        }
        else {
          clearInterval(countdown);
          // make sure progress bar is at 0 when switching to work interval
          // before changing color
          $('.progressBar').width('0%');
          // change progress bar color to green for work interval
          $('.progressBar').css('background-color', '#1e8449');
          timerFunction(workSliderValue, 'Work');
        }
      }

    }, 1000); // set to 1000 when done testing
  }

}());
