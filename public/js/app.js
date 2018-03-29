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

// right now can only activate this once, look at DOCs for other options.
// maybe add another class to the button here, and make another listener
// for it that reloads the page, or something like that?
$('.buttonContainer').one('click', () => {
  $('input').prop('disabled', true);
  timerFunction(workSliderValue);
});

// timer implemented from javascript
function timerFunction(timeInMinutes) {
  let seconds = timeInMinutes * 60;
  var countdown = setInterval(() => {
    if (seconds >= 0) {
      // tenary checks if secondsRemaining in the current minute is less than
      // 10. If it is, then append a 0 and, if not do nothing
      let secondsRemaining = ((seconds % 60) < 10) ? (seconds % 60) + '0' : (seconds % 60);
      let minutesRemaining = Math.floor(seconds/60);
      $('.timer').text(minutesRemaining + ':' + secondsRemaining);
      seconds--;
    }
    else {
      alert('Done');
      clearInterval(countdown);
    }

  }, 10);
}





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
