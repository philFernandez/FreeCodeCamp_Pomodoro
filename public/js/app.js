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


//$('.timer').timer({
//format: '%H:%M:%S',
//countdown: true,
//duration: ui.value + 'm0s',
//callback: function() {
//alert('Time Up');
//}
//});



// worktime slider ======================================
$(".worktime-slider").slider({
  min: 1,
  max: 25,
  step: 1,
  orientation: 'vertical'
});

$(".worktime-slider").on('slide', function(e, ui) {
  $(".worktime-readout")[0].innerHTML = ui.value + ' min';
  //console.log($('.worktime'));
});
// ======================================================


// breaktime slider =====================================
$('.breaktime-slider').slider({
  min: 1,
  max: 25,
  step: 1,
  orientation: 'vertical'
});

$(".breaktime-slider").on('slide', function(e, ui) {
  $(".breaktime-readout")[0].innerHTML = ui.value + ' min';

});
// ======================================================
