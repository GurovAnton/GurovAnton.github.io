$(function (){
var positionRight =  ($(window).width() - $('.container').width())/2;

  $('.button').on('click', function () {
    $(this).toggleClass('active');
    if ($('.button').hasClass('active')){
      $('.menu').animate({
        right: positionRight + 'px'
      }, 300);
    }else {
      $('.menu').animate({
        right: '-290px'
      }, 300);
    }
});
  $(window).resize(function () {
    positionRight =  ($(window).width() - $('.container').width())/2;
  if($(window).width()>= 1024) {
    $('.button').removeClass('active');
      $('.menu').css('right', '-290px');
  }
  if ($('.button').hasClass('active')) {
    $('.menu').css('right', positionRight + 'px');
  }
  });
});
