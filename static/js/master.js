$('header .menu-button').click(function () {
    $(this).toggleClass('active');
    let left_offset = $(this).offset();
    if (window.innerWidth >= 700) {
        $('header .menu').offset({left: left_offset.left - 40, /*top: left_offset.top + 55,*/}).toggleClass('active');
    } else {
        $('header .menu').toggleClass('active');
    }

});

$('header .menu ul li').hover(function () {
    $('header .menu ul li').removeClass('active');
    $(this).addClass('active');
});


$('section.portfolio .category .items a').click(function (e) {
    e.preventDefault();
    $('section.portfolio .category .items a.active').removeClass('active');
    $(this).addClass('active');
});


if (window.innerWidth >= 768) {

} else {
    $('.portfolio .images-grid').append('<span></span>');
    //let $slider = $('.portfolio .images-grid');
    // var $progressBar = $('.progress');
    // var $progressBarLabel = $( '.slider__label' );
    //
    // $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    //   var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
    //
    //   $progressBar
    //     .css('background-size', calc + '% 100%')
    //     .attr('aria-valuenow', calc );
    //
    //   $progressBarLabel.text( calc + '% completed' );
    // });

    $('.portfolio .images-grid').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        variableWidth: true,
    });
}

window.onresize = function (event) {

    if (window.innerWidth >= 768) {

    } else {
        $('.portfolio .images-grid').append('<span></span>');
        //let $slider = $('.portfolio .images-grid');
        // var $progressBar = $('.progress');
        // var $progressBarLabel = $( '.slider__label' );
        //
        // $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        //   var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
        //
        //   $progressBar
        //     .css('background-size', calc + '% 100%')
        //     .attr('aria-valuenow', calc );
        //
        //   $progressBarLabel.text( calc + '% completed' );
        // });

        $('.portfolio .images-grid').slick({
            dots: false,
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            variableWidth: true,
        });
    }
};