var React = require('react');
var tets = <p></p>;

var fullScreenVideo = fullScreenVideo || {};

fullScreenVideo = {
  name: 'fullScreenVideo',
  backgroundvideo: '9q2mvpusg8',
  backgroundvideoDiv: '#wistia_9q2mvpusg8',

  embedVideo: function() {
    var videoOptions = {};

    Wistia.obj.merge(videoOptions, {
      plugin: {
        cropFill: {
          src: "//fast.wistia.com/labs/crop-fill/plugin.js"
        }
      }
    });

    wistiaEmbed = Wistia.embed(fullScreenVideo.backgroundvideo, videoOptions);

    wistiaEmbed.bind("play", function() {
      wistiaEmbed.pause();
      wistiaEmbed.time(0);
      $(fullScreenVideo.backgroundvideoDiv).css('visibility', 'visible');
      wistiaEmbed.play();
      return this.unbind;
    });
  },

  fixTextPosition: function()
  {
    var width = $( window ).width();
    var height = $( window ).height();
    textWidth = $("#text").width();
    textHeight = $("#text").height();
    if (width <= 768) {
      $("#video_container").css("width", width).css("height", (height));
      $("#text").css("left", (width/2) - (textWidth/1.95)).css("top", (height/2) - (textHeight/2.5));
    } else {
      $("#video_container").css("width", width).css("height", (height * .75));
      $("#text").css("left", (width/2) - (textWidth/1.97)).css("top", (height/3) - (textHeight/2.5));
    }
    $("#main-image").css("width", width).css("height", height);
  }

}

var main = function() {
  var scroll = $(window).scrollTop();
  var scrollHeight = $(".jumbotron").height();
  var showBackground = function() {
    $(".navbar-background").css("opacity", "1");
  }
  var hideBackground = function() {
    $(".navbar-background").css("opacity", "0");
  }
  var open;
  $('#navbar-collapse-1').on('show.bs.collapse', function () {
    showBackground();
    return open = true;
  });
  $('#navbar-collapse-1').on('hidden.bs.collapse', function () {
    hideBackground();
    return open = false;
  });
  console.log(open);
  // If the scroll goes past the jumbotron's height, show the background, otherwise hide it
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    console.log(open);
    if (scroll >= (scrollHeight - 100)) {
      showBackground();
      $('#navbar-collapse-1').on('hidden.bs.collapse', function () {
        showBackground();
        return open = false;
      });
    } else if ((scroll < (scrollHeight - 100)) && open == false) {
      hideBackground();
      $('#navbar-collapse-1').on('hidden.bs.collapse', function () {
        hideBackground();
        return open = false;
      });
    }
  });

  // If the scroll is between the top and the bottom of the jumbotron and the menu is opened, show the background.
}

$(document).ready(main);

$(document).ready(function() {
  fullScreenVideo.fixTextPosition();
  $("#text").delay(200).animate({ opacity: 1 }, 650);
});

$(window).resize(fullScreenVideo.fixTextPosition);

fullScreenVideo.embedVideo();
