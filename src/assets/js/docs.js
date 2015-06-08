/*!

Documentation middleware.
Created by Zach Supalla.
(c) 2014 Spark Labs, Inc. MIT licensed.

Derived from Flatdoc (http://ricostacruz.com/flatdoc)
(c) 2013 Rico Sta. Cruz. MIT licensed.

*/

(function($) {
  var exports = this;

  /**
   * Basic Docs module.
   */

  var Docs = exports.Docs = {};

  Docs.transform = function() {
    this.tagImages();
    this.buttonize();
    this.prettifyCode();
  };

  /**
   * Tags paragraphs that include images.
   */

  Docs.tagImages = function() {
    $('.content').find('p:has(img)').each(function() {
      var $el = $(this);
      $el.addClass('img');
    });
  };

  /**
   * Changes "button >" text to buttons.
   */

  Docs.buttonize = function() {
    $('.content').find('a').each(function() {
      var $a = $(this);

      var m = $a.text().match(/^(.*) >$/);
      if (m) $a.text(m[1]).addClass('button');
    });
  };

  /**
   * Make code prettier
   */

  Docs.prettifyCode = function() {
    $('.content').find('pre code').each(function() {
      $(this).addClass("prettyprint");
    });
  };

  // Ok, then let's do it!
  Docs.transform();
  prettyPrint();

})(jQuery);

// function bodyLoad() {
//   console.log(document.title);
//   var d = document.getElementById(document.title.split("|")[1].trim());
//   d.className = d.className + " active";
// }

$(document).ready(function(){
  var title = document.title.split("|")[1].trim().split(" ").join("-");
  if (title === 'Getting-Started') {
    $("#getting-started-control").removeClass("hidden");
  }
  $("#"+title).addClass("active");

  $('.img > a.img-popup').magnificPopup({
    type:'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });
});

// Handle langauge switching
$(function() {
  var LANGUAGES = ['objective-c', 'swift', 'java', 'unity'];

  function toggleLanguage(language) {
    showCodeBlocksForLanguage(language);
    hideCodeBlocksNotOfLanguage(language);
    changeEditLinkUrls(language);
  }

  function showCodeBlocksForLanguage(language) {
    $('pre .language-' + language).parent().css('display', 'block');
    $('pre code').not('.language-' + language).parent().css('display', 'none');
  }

  // Show divs with .language-only.{language-name}, hide other .language-only divs
  function hideCodeBlocksNotOfLanguage(language) {
    $('.language-only').not('.' + language).css('display', 'none');
    $('.language-only.' + language).css('display', 'block');
  }

  // Change this language's github edit links to correct language
  function changeEditLinkUrls(language) {
    var links = $('.language-only.' + language + ' .edit-link');
    links.each(function(i, linkNode) {
      var url = $(linkNode).attr('href');
      var correctedUrl;
      var oldLanguage;
      for (var i = 0; i < LANGUAGES.length; i++) {
        if (url.indexOf(LANGUAGES[i]) !== -1) {
          oldLanguage = new RegExp(LANGUAGES[i], 'g');
        }
      }
      if (!!oldLanguage) {
        correctedUrl = url.replace(oldLanguage, language);
        $(linkNode).attr('href', correctedUrl);
      }
    });
  }

  function toggleLink(node) {
    $('li.language a').removeClass('active');
    $(node).addClass('active');
  }

  // Set the default language selection to objective-c
  if ($('.language-picker').length > 0) {
    var link = $('li.language a[href="#objective-c"]');
    toggleLink(link);
    toggleLanguage('objective-c');
  }

  $('li.language a').on('click', function(e) {
    e.preventDefault();
    var language = $(this).data('language');
    toggleLink(this);
    toggleLanguage(language);
  });
});

