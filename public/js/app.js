
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
// function(){} same as () =>{}


// need to declare countdown outside of timerFunction so that the input change
// event, and the buttonContainer click event have access to it for clearing
// the timer when the user wants to stop the timer and make adjustments.
var countdown;
// pause controls whether or not the timer will be in a running state
var pause = true;

$('input').change(() => { clearInterval(countdown) });

$('.buttonContainer').on('click', () => {
  // start with a fresh timer on first click, and refresh timer on subsequent
  // clicks
  clearInterval(countdown);
  // on first run pause is set to true above, this sets it to false on first
  // button click so that the timer runs. subsequent clicks toggle the run
  // state of the timer.
  pause = pause ? false : true;
  // get boolean value of disabled property of sliders
  let sliderState = $('input').prop('disabled');
  // toggle that value, so that sliders are enabled when timer is paused
  $('input').prop('disabled', !sliderState);

  timerFunction(workSliderValue, 'work');
});



// timer implemented from javascript
function timerFunction(timeInMinutes, whichTimer) {
  let seconds = timeInMinutes * 60;
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
    }
    else {
      if (whichTimer == 'work') {
        //alert('Break Time!');
        clearInterval(countdown);
        timerFunction(breakSliderValue, 'break');
      }
      else {
        //alert('Back To Work!');
        clearInterval(countdown);
        timerFunction(workSliderValue, 'work');
      }
    }

  }, 200); // set to 1000 when done testing
}

/**
 * listen for clicks on actual timer
 * to pause timer and unlock sliders
$('.timer').click(() => {

  // toggle boolean pause value for countdown timer
  pause = pause ? false : true;

  // get boolean value of disabled property of sliders
  let sliderState = $('input').prop('disabled');
  // toggle that value, so that sliders are enabled when timer is paused
  $('input').prop('disabled', !sliderState);

});


*/











































/*

// button press kicks off pomodoro loop
$('.buttonContainer').on('click', function() {

  // once timer is started lock both sliders
  $('input').prop('disabled', true);

  workTime();

});

function workTime() {
  $('.timer').timer('remove');

  $('.timer').timer({
    countdown: true,
    duration: workSliderValue + 's',
    callback: breakTime
  });
}

function breakTime() {

  $('.timer').timer('remove');

  $('.timer').timer({
    countdown: true,
    duration: breakSliderValue + 's',
    callback: workTime
  });
}

*/
