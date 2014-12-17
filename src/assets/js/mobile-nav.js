(function($) {
  $(".menu-button").click(function(e) {
    $("#site-wrapper").toggleClass("show-nav");
    return false;
  });
  return $("#site-canvas").click(function() {
    if ($('#site-wrapper').hasClass("show-nav")) {
      return $("#site-wrapper").removeClass("show-nav");
    }
  });
})(jQuery);
