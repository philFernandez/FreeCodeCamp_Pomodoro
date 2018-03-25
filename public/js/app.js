/**
 * User Stories
 *
 * I can start a 25 minute pomodoro, and the timer will go off once 25 minutes
 * has ellapsed.
 *
 * I can reset the clock for my next pomodoro.
 *
 * I can customize the length of each pomodoro.
 *
 */



//countdown timer
$('#timerDiv').timer({
  format: '%H:%M:%S',
  countdown: true,
  duration: '0m10s',
  callback: function() {
    alert('Time Up');
  }
});



