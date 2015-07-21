var React = require('react');
var tets = <p></p>;

var fullScreenVideo = fullScreenVideo || {};

fullScreenVideo = {
  name: 'fullScreenVideo',
  backgroundvideo: 'r8k5d36tri',
  backgroundvideoDiv: '#wistia_r8k5d36tri',

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
    $("#video_container").css("width", width).css("height", (height * .75));
    $("#main-image").css("width", width).css("height", height);
    $("#text").css("left", (width/2) - (textWidth/2)).css("top", (height/3) - (textHeight/2.5));
  }

}

var main = function() {
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 457) {
      $(".header-background").css("opacity", "1");
    } else {
      $(".header-background").css("opacity", "0");
    }
  });
}

$(document).ready(main);

$(document).ready(function() {
  fullScreenVideo.fixTextPosition();
  $("#text").delay(200).animate({ opacity: 1 }, 650);
});

$(window).resize(fullScreenVideo.fixTextPosition);

fullScreenVideo.embedVideo();
