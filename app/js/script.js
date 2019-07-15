// JavaScript Document
var rwdMedia = {
    bs4_xs: function() {
        return document.getElementsByClassName("bs4-xs")[0].offsetParent ? !null : null;
    },
    bs4_sm: function() {
        return document.getElementsByClassName("bs4-sm")[0].offsetParent ? !null : null;
    },
    bs4_md: function() {
        return document.getElementsByClassName("bs4-md")[0].offsetParent ? !null : null;
    },
    bs4_lg: function() {
        return document.getElementsByClassName("bs4-lg")[0].offsetParent ? !null : null;
    },
    bs4_xl: function() {
        return document.getElementsByClassName("bs4-xl")[0].offsetParent ? !null : null;
    },
    bs4_xxl: function() {
        return document.getElementsByClassName("bs4-xxl")[0].offsetParent ? !null : null;
    }
};

$(document).ready(function(e) {

    var testimonials = new Swiper ('.testimonials .swiper-container', {
        loop: true,
        // Navigation arrows
        navigation: {
            nextEl: '.testimonials .swiper-button-next',
            prevEl: '.testimonials .swiper-button-prev',
        },

        pagination: {
            el: '.testimonials .swiper-pagination',
        },
    });

    $('.jumbotron').flurry({
        character: "❅❆",
        height: 700,
        small: 18,
        large: 88,
        speed: 8000,
        frequency: 800,
        zIndex: 3
    });

});


// JQ extras

(function($) {

// jQuery plugin to scroll to an element on the page
// Usage: $('.callBack').scrollTo();
//    or: $('.callBack').scrollTo(750);

    var $window = $(window),
        $document = $(document),
        $documentWrapper = $('body, html');

    $.fn.scrollTo = function ( speed ) {
        if ( speed === undefined ) speed = 300;

        $documentWrapper.animate({
            scrollTop: Math.min( this.offset().top - 10, $document.height() - $window.height() )
        }, speed);

        return this;
    };

    $.fn.hasAttr = function(name) {
        return this.attr(name) !== undefined;
    };

}(jQuery));
