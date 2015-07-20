var React = require('react');
var tets = <p></p>;

var fullScreenVideo = fullScreenVideo || {};

fullScreenVideo = {
  name: 'fullScreenVideo',
  backgroundvideo: 'vp9ftrir6e',
  backgroundvideoDiv: '#wistia_vp9ftrir6e',

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

$(document).ready(function() {
  fullScreenVideo.fixTextPosition();
  $("#text").delay(200).animate({ opacity: 1 }, 650);
});

$(window).resize(fullScreenVideo.fixTextPosition);

fullScreenVideo.embedVideo();