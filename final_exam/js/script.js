$( document ).ready(function() {


  // Only continue if we're on IE8/IE9 with jQuery 1.5+ (contains the ajaxTransport function)
  if (!$.support.cors || $.ajaxTransport || window.XDomainRequest) {

    var httpRegEx = /^(https?:)?\/\//i;
    var getOrPostRegEx = /^get|post$/i;
    var sameSchemeRegEx = new RegExp('^(\/\/|' + location.protocol + ')', 'i');

    // ajaxTransport exists in jQuery 1.5+
    $.ajaxTransport('* text html xml json', function(options, userOptions, jqXHR) {

      // Only continue if the request is: asynchronous, uses GET or POST method, has HTTP or HTTPS protocol, and has the same scheme as the calling page
      if (!options.crossDomain || !options.async || !getOrPostRegEx.test(options.type) || !httpRegEx.test(options.url) || !sameSchemeRegEx.test(options.url)) {
        return;
      }

      var xdr = null;

      return {
        send: function(headers, complete) {
          var postData = '';
          var userType = (userOptions.dataType || '').toLowerCase();

          xdr = new XDomainRequest();
          if (/^\d+$/.test(userOptions.timeout)) {
            xdr.timeout = userOptions.timeout;
          }

          xdr.ontimeout = function() {
            complete(500, 'timeout');
          };

          xdr.onload = function() {
            var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
            var status = {
              code: 200,
              message: 'success'
            };
            var responses = {
              text: xdr.responseText
            };
            try {
              if (userType === 'html' || /text\/html/i.test(xdr.contentType)) {
                responses.html = xdr.responseText;
              } else if (userType === 'json' || (userType !== 'text' && /\/json/i.test(xdr.contentType))) {
                try {
                  responses.json = $.parseJSON(xdr.responseText);
                } catch(e) {
                  status.code = 500;
                  status.message = 'parseerror';
                  //throw 'Invalid JSON: ' + xdr.responseText;
                }
              } else if (userType === 'xml' || (userType !== 'text' && /\/xml/i.test(xdr.contentType))) {
                var doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = false;
                try {
                  doc.loadXML(xdr.responseText);
                } catch(e) {
                  doc = undefined;
                }
                if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
                  status.code = 500;
                  status.message = 'parseerror';
                  throw 'Invalid XML: ' + xdr.responseText;
                }
                responses.xml = doc;
              }
            } catch(parseMessage) {
              throw parseMessage;
            } finally {
              complete(status.code, status.message, responses, allResponseHeaders);
            }
          };

          // set an empty handler for 'onprogress' so requests don't get aborted
          xdr.onprogress = function(){};
          xdr.onerror = function() {
            complete(500, 'error', {
              text: xdr.responseText
            });
          };

          if (userOptions.data) {
            postData = ($.type(userOptions.data) === 'string') ? userOptions.data : $.param(userOptions.data);
          }
          xdr.open(options.type, options.url);
          xdr.send(postData);
        },
        abort: function() {
          if (xdr) {
            xdr.abort();
          }
        }
      };
    });


  }




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
        var api = 'https://api.gettyimages.com/v3/search/images/?sort_order=best&phrase=' + phrase;
        var apiKey = 'pj25pazjgbw8wz9ppyegbpbb';
        $.ajax({
            type: 'GET',
            url: api,
            dataType: 'json',
            contentType: 'text/plain',
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
    getImage();
});
