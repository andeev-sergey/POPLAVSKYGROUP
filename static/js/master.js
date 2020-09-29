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
$('.call form a').click(function (e){
    e.preventDefault();
    $('.call form').submit();
});




function modal(flag, modal) {
    let modal_name = (modal === 'all') ? '' : '#' + modal;
    if (flag) {
        $('.overlay').addClass('active');
        $('.modal' + modal_name).addClass('active').animate({
            opacity: 1,
            top: 150
        }, 300, function () {
        });
        $('body, html').addClass('fixed');
    } else {
        $('.modal' + modal_name).animate({
            opacity: 0,
            top: 150
        }, 300, function () {
            $(this).css('top', '50px').removeClass('active');
        });
        $('.overlay').removeClass('active');
        $('body, html').removeClass('fixed');
    }
};
//
// function close_all() {
//     overlay(false);
//     modal(false, 'all');
// // };
// $('.overlay').click(function () {
//     close_all();
// })
$("a.open-modal").click(function (e) {
    e.preventDefault();
    let modal_name = $(this).data('link');
    //overlay(true);
    modal(true, modal_name);
});
$('.overlay').click(function () {
    modal(false, 'all');
});







$('section.portfolio .category .items a').click(function (e) {
    e.preventDefault();
    $('section.portfolio .category .items a.active').removeClass('active');
    $(this).addClass('active');
});


$(`.prices .cards .card`).hover(function () {

    if (window.innerWidth >= 768) {
        $('.prices .cards .card.active').removeClass('active');
        $(this).addClass('active');
    }
});

if (window.innerWidth >= 769) {

} else {

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
        variableWidth: false,
    });
    $('.portfolio .images-grid .slide').css('height', $('.images-grid .slick-slide').height());
    $('.prices .cards').slick({
        dots: true,
        customPaging: function (slider, i) {
            return '<a href="#"><span class="list"></span><span class="list active"></span></a>';
        },
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        rows: 1,
    });
    $('.prices .cards .card.active').removeClass('active');
}

window.onresize = function (event) {

    if (window.innerWidth >= 768) {

    } else {

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

