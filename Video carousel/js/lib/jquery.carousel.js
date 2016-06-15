(function($) {
    $.fn.creatCarousel = function(obj) {
        var list = this.children('div'),
            self = this,
            firstItemClone = this.find('video').eq(0).clone(),
            //добавляем первый элемент в конец списка, для плавного перехода
            //задаем классы элементам управления
            leftArrow,
            rightArrow,
            arrows,
            arrowWidth,
            arrowHeight,
            carouselItems,
            countItem,
            counter = 0,
            width,
            height,
            options = {},
            defSettings = {
                autoplay: false,
                duration: 0,
                arrow: true
            },
            backSize;
        options = $.extend(defSettings, obj);

        list.append(firstItemClone);
        carouselItems = this.find('video');
        countItem = carouselItems.length - 2;
        $(window).ready(widthCorrector).resize(widthCorrector);

        function widthCorrector() {
            width = self.css('width');
            carouselItems.css('width', width);
            backSize = width.slice(0, width.length - 2) * countItem + 'px';
            list.css('left', '-' + counter * width.slice(0, width.length - 2) + 'px');
            height = carouselItems.css('height');

            $('.arrow').css('top', ((Number(height.slice(0, height.length - 2)))/2-12.5) +'px');
        }
        //текущий элемент
        if (options.arrow) {
            self.append('<a href="#"></a>');
            self.append('<a href="#"></a>');
            leftArrow = self.children('a').eq(0).addClass('arrow left');
            rightArrow = self.children('a').eq(1).addClass('arrow right');
            leftArrow.html('<');
            rightArrow.html('>');
            leftArrow.on('click', moveLeft);
            rightArrow.on('click', moveRight);
        }
        if (options.autoplay) {
            setInterval(moveRight, options.duration);
        }


        // функция листать влево
        function moveLeft() {
            if (counter === 0) {
                counter = carouselItems.length - 2;
                list.animate({
                    'left': '-' + backSize
                }, 600);
            } else {

                list.animate({
                    'left': '+=' + width
                }, 400);
                counter--;
            }
        }
        //функция листать вправо
        function moveRight() {
            list.animate({
                'left': '-=' + width
            }, 400, function() {
                if (counter === carouselItems.length - 2) {
                    list.css('left', 0);
                    counter = 0;
                } else {
                    counter++;
                }
            });
        }
        return this;
    };
})(jQuery);
