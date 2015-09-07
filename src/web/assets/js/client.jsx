// var React = require('react');
// var tets = <p></p>;

$(document).ready(function () {
    $('a[href^="/#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var t = $(this.hash).offset().top - 50;
        $('html, body').stop().animate({
        scrollTop: t,
      }, 300, function () {
            window.location.hash = target;
        });
    });

    // proposals page - randomize index card rotation
    $('.post').each(function() {
        var rotate = Math.random();
        rotate *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        $(this).css('transform', 'rotate(' + rotate + 'deg)');
    });
});
