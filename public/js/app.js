
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
    $('.column p').text(workSliderValue + ' minutes');
  }
  // else if defalut vale is 5 we a listening to the break interval slider
  else {
    // so adjust time under break interval slider
    breakSliderValue = thisInput.val();
    $('.column2 p').text(breakSliderValue + ' minutes');
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
    // knows to start a new timer with the new slider values
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

    // progress bar ====================================
    // start progress bar at 0
    let progressCounter = 0;
    // this is the amount to increment the progress bar each second, so that it
    // is proportional to the countdown timer.
    let progressIncrementer = 100/seconds;
    // =================================================

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
        $('title').text(minutesRemaining + ':' + secondsRemaining);
        seconds--;


        // progress bar ====================================
        // prevent value for width of progress bar from being rounded above 100
        if (progressCounter > 99)
          progressCounter = 100;
        else
          progressCounter += progressIncrementer;

        console.log(progressCounter);
        $('.progressBar').width(progressCounter+'%');
        // =================================================
      }
      else {
        if (whichTimer == 'Work') {
          clearInterval(countdown);
          // make sure progress bar is at 0 when switching to break interval
          // before changing color
          $('.progressBar').width('0%');
          // change progress bar color to red for break interval
          $('.progressBar').css('background-color', 'red');
          timerFunction(breakSliderValue, 'Break');
        }
        else {
          clearInterval(countdown);
          // make sure progress bar is at 0 when switching to work interval
          // before changing color
          $('.progressBar').width('0%');
          // change progress bar color to green for work interval
          $('.progressBar').css('background-color', 'green');
          timerFunction(workSliderValue, 'Work');
        }
      }

    }, 200); // set to 1000 when done testing
  }

}());
