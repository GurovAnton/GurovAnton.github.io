

$( document ).ready(function() {
    'use strict';
    $.support.cors = true;
    var browser = navigator.userAgent;
var IEversion = 99; //Give a default value for non-IE browsers
var api;
if (browser.indexOf("MSIE") > 1) { //Detects if IE
    IEversion = parseInt(browser.substr(browser.indexOf("MSIE")+5, 5));

}
if (IEversion < 10) {
    xdr = new XDomainRequest();   // Creates a new XDR object.
    $('.browser').html(xdr);
    xdr.open("GET", api); // Creates a cross-domain connection with our target server using GET method.
    xdr.send(); //Send string data to server
    xdr.onload = function () { //After load, parse data returned by xdr.responseText
        loadImages($.parseJSON(xdr.responseText));
    };
} else {
    $.getJSON(url, function(data) {
        loadImages(data);
    });
}

function loadImages(data) {
       //console.log(data);
       //Your main cross domain function here.
}
    getImage();
    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        slideshow: false,
    });
    $('.flex-prev').html('');
    $('.flex-next').html('');

    var $container = $('.grid').masonry();
    $container.imagesLoaded( function() {
      $container.masonry({
          itemSelector: '.grid-item',
          gutter: 20
      });
    });

    $('.discover__btn').on('click', function(e) {
        e.preventDefault();
        getImage();
    });

    function getImage() {
        var phrase = encodeURIComponent($('.discover__input').val());
        if (!phrase) {
            phrase = 'travelling';
        }
         api = 'https://api.gettyimages.com/v3/search/images/?sort_order=best&phrase=' + phrase;
        var apiKey = 'pj25pazjgbw8wz9ppyegbpbb';
        $.ajax({
            type: 'GET',
            url: api,
            dataType: 'json',
            data: {
              prestige_content_only: true,
              fields: 'detail_set'
            },

            beforeSend: function(request) {
                request.setRequestHeader("Api-Key", apiKey);
            },
            success: loadImages

        });

    }

    function loadImages(data) {
        $('.grid-item').each(function(i) {
            var background = data.images[i].display_sizes[0].uri;

            var describe = data.images[i].title;
            $(this).css('background', '#1a1915 url("' + background + '") 50% / cover');
            $(this).children().html(describe);
        });
    }

});
