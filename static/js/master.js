const $CASE_SLIDER = $('section.case .presentation .images');
const $ROOM_SLIDER = $('section.rooms .room-info .room-slider');

$CASE_SLIDER.slick({
    infinite: false,
    slidesToShow: 1,
    // slidesToScroll: 1,
    prevArrow: $('.presentation .controls .slider-nav .prev'),
    nextArrow: $('.presentation .controls .slider-nav .next'),
    variableWidth: true,
    centerMode: false,
    // slidesToShow: 3,
    // responsive: [
    //     {
    //         breakpoint: 769,
    //         settings: {
    //             slidesToShow: 2,
    //             variableWidth: true,
    //         }
    //     },
    //     {
    //         breakpoint: 480,
    //         settings: {
    //             slidesToShow: 2,
    //             variableWidth: false,
    //         }
    //     }
    // ]
});

let $status = $('.room-info .text .counter .active');
let $status_2 = $('.room-info .text .counter .all');
$ROOM_SLIDER.on('init', function (event, slick) {
    $status_2.text(slick.slideCount);
});
$ROOM_SLIDER.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('section.rooms .slider-nav .prev'),
    nextArrow: $('section.rooms .slider-nav .next'),
    variableWidth: false,
    centerMode: false,
    TouchMove: false,
    draggable: false
    // slidesToShow: 3,
    // responsive: [
    //     {
    //         breakpoint: 769,
    //         settings: {
    //             slidesToShow: 2,
    //             variableWidth: true,
    //         }
    //     },
    //     {
    //         breakpoint: 480,
    //         settings: {
    //             slidesToShow: 2,
    //             variableWidth: false,
    //         }
    //     }
    // ]
});
let some = true;
$ROOM_SLIDER.on('init reInit afterChange', function (event, slick, currentSlide) {
    let i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i);

    let text = 's';
    if (some == true) {
         text = 'Пример';
    } else{
        text = 'Функционала';
    }
    //alert(text);
    $('.room-info .text .room-title').text(text);
    some = !some;
});


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
$('.call form a').click(function (e) {
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


$('.category .items a').click(function (e) {
    e.preventDefault();
    $(' .category .items a.active').removeClass('active');
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

function setProgress(index) {
    const calc = ((index + 4) / ($slider.slick('getSlick').slideCount)) * 120;

    $progressBar
        .css('background-size', `${calc}% 100%`)
        .attr('aria-valuenow', calc);

    $progressBarLabel.text(`${calc.toFixed(2)}% completed`);
}

const $slider = $('.portfolio-cards');
const $progressBar = $('.progress');
const $progressBarLabel = $('.slider__label');

$slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setProgress(nextSlide);
});

//$('.progress').style.maxWidth = (window.innerWidth - $('.progress').offsetLeft);
$slider.slick({
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    mousewheel: true,

});
let el = document.querySelectorAll('.portfolio-cards .card');
for (var i = 1; i < el.length + 1; i++) {
    document.querySelector('.portfolio-cards .card:nth-child(' + i + ') num').innerHTML = i;
}
setProgress(0);
var scrollCount = null;
var scroll = null
$('.portfolio-cards').on('wheel', (function (e) {
    e.preventDefault();

    clearTimeout(scroll);
    scroll = setTimeout(function () {
        scrollCount = 0;
    }, 200);
    if (scrollCount) return 0;
    scrollCount = 1;

    if (e.originalEvent.deltaY < 0) {
        $(this).slick('slickNext');
    } else {
        $(this).slick('slickPrev');
    }
}));