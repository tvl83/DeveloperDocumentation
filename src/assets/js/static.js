(function($) {
  $(".sphero-selector").hover(function() {
    $(".sphero.oval1, .sphero.oval2, .sphero.oval3").toggleClass("active");
  });

  // Disable Ollie docs for now...
  // $(".ollie-selector").hover(function() {
  //   $(".ollie.oval1, .ollie.oval2, .ollie.oval3").toggleClass("active");
  // });
})(jQuery);
