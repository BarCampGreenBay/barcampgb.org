/* global $ */
$(document).ready(function() {
    $('a[href^="/#"]').on('click', function(e) {
        e.preventDefault();
        var target = this.hash;
        var t = $(this.hash).offset().top - 50;
        $('html, body').stop().animate({
            scrollTop: t
        }, 300, function() {
            window.location.hash = target;
        });
    });
});
