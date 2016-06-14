$( document ).ready(function() {
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
        var phrase = '&q=' +  encodeURIComponent($('.discover__input').val());
        if (phrase === '&q=') {
            phrase = '&q=' + 'holiday';
        }
        var api = 'https://pixabay.com/api/?key=2654122-2e7cfe65e4216a71a55f9c97a&image_type=photo' + phrase;

        // var apiKey = 'pj25pazjgbw8wz9ppyegbpbb';
        $.ajax({
            type: 'GET',
            url: api,
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            // data: {
            //   prestige_content_only: true,
            //   fields: 'detail_set'
            // },

            // beforeSend: function(request) {
            //     request.setRequestHeader("Api-Key", apiKey);

            // },
            success: loadImages

        });

    }

    function loadImages(data) {
        $('.grid-item').each(function(i) {
            var background = data.hits[i].webformatURL;
            var describe = data.hits[i].tags;
            $(this).css('background', '#1a1915 url("' + background + '") 50% / cover');
            $(this).children().html(describe);
        });
    }
    getImage();
});
