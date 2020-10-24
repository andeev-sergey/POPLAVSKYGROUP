const $CASE_SLIDER = $('section.case .presentation .images');
const $ROOM_SLIDER = $('section.rooms .room-info .room-slider');
let $status = $('.room-info .text .counter .active');
let $status_2 = $('.room-info .text .counter .all');
const $portfolioSlider = $('.portfolio-cards');
const $progressBar = $('.progress');
const $progressBarLabel = $('.slider__label');
let roomSliderFlag = true;
const token = $('input[name=csrfmiddlewaretoken]').val();
const $REVIEW_SLIDER = $('.reviews .reviews-slider');
const $TEAM_SLIDER = $('.team .cards');
$('footer .policy #site').text(window.location.host);


$('.menu .lang span:not(.active)').click(function () {
    let lang_id = $(this).attr('data-lang');
    if (lang_id == "eng") {

        window.location.href = '/' + lang_id + window.location.pathname;
    } else {
        window.location.href = window.location.href.replace('eng/', '');

    }


});
$REVIEW_SLIDER.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    centerMode: false,
    adaptiveHeight: true,
    nextArrow: $('.reviews .controls .button-2'),
    responsive: [
        {
            breakpoint: 480,
            settings: {
                dots: true,
                arrows: false, adaptiveHeight: true
            }
        }
    ]

});


$CASE_SLIDER.slick({
    infinite: false,
    slidesToShow: 1,
    prevArrow: $('.presentation .controls .slider-nav .prev'),
    nextArrow: $('.presentation .controls .slider-nav .next'),
    variableWidth: true,
    centerMode: false,
    responsive: [
        {
            breakpoint: 400,
            settings: {
                adaptiveHeight: true
            }
        }
    ]

});

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
    draggable: false,
    adaptiveHeight: true
});
$portfolioSlider.slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    mousewheel: true,
    responsive: [
        {
            breakpoint: 400,
            settings: {
                slidesToScroll: 1,
            }
        }
    ]

});

$ROOM_SLIDER.on('init reInit afterChange', function (event, slick, currentSlide) {
    let i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i);
    let name = $('section.rooms .room-slider img:nth-child(' + i + ')').attr('data-name');
    let descr = $('section.rooms .room-slider img:nth-child(' + i + ')').attr('data-text');
    $('.room-info .text .room-title').text(name);
    $('.room-info .text p').text(descr);

});

// Открытие меню
$('header .menu-button').click(function () {
    $(this).toggleClass('active');
    let left_offset = $(this).offset();
    if (window.innerWidth >= 700) {
        $('header .menu').offset({left: left_offset.left - 40, /*top: left_offset.top + 55,*/}).toggleClass('active');
    } else {
        $('header .menu').toggleClass('active');
    }

});
// Меню li hover
if (window.innerWidth >= 480) {
    $('header .menu ul li').hover(function () {
        $('header .menu ul li').removeClass('active');
        $(this).addClass('active');

    });
} else {

    $('header .menu ul li').removeClass('active');
}

// Form Sumbit
$('.call form a').click(function (e) {
    e.preventDefault();
    $('.call form').submit();
});

// Функция открыия модалок
function modal(flag, modal) {
    let modal_name = (modal === 'all') ? '' : '#' + modal;
    let topPosition;
    switch (true) {
        case window.innerWidth >= 1366:
            topPosition = 150;
            break;
        case window.innerWidth >= 768:
            topPosition = 50;
            break;
        case window.innerWidth >= 480:
            topPosition = 0;
            break;
        default:
            topPosition = 0;
    }
    if (flag) {
        $('.overlay').addClass('active');
        $('.modal' + modal_name).addClass('active').animate({
            opacity: 1,
            top: topPosition
        }, 300, function () {
        });
        $('body, html').addClass('fixed');
    } else {
        $('.modal' + modal_name).animate({
            opacity: 0,
            top: topPosition
        }, 300, function () {
            $(this).css('top', '50px').removeClass('active');
        });
        $('.overlay').removeClass('active');
        $('body, html').removeClass('fixed');
    }
};

// Modal windows func
function close_all() {
    modal(false, 'all');
};
$('.overlay').click(function () {
    close_all();
})
$('#closeAll').click(function () {
    close_all();
})

$("a.open-modal").click(function (e) {
    $('header .menu').removeClass('active');
    $('header .menu-button').removeClass('active');

    e.preventDefault();
    let modal_name = $(this).data('link');
    modal(true, modal_name);
});
// Текст портфолио
$('.category .items a').click(function (e) {
    e.preventDefault();
    let data_attr = this.getAttribute('data-tab');
    $(' .category .items a.active').removeClass('active');
    $(this).addClass('active');
    $('.category .text ').removeClass('active');
    $('.category .text.data_' + data_attr).addClass('active');
});

// Главная страница карточки
$(`.prices .cards .card`).hover(function () {
    if (window.innerWidth >= 480) {
        $('.prices .cards .card.active').removeClass('active');
        $(this).addClass('active');
    }
});
// Мобильные скрипты
if (window.innerWidth >= 769) {
} else {
    const mainPageSlider = $('.portfolio .images-grid');
    $('.bg-services-mobile').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        rows: 1,
        slidesPerRow: 1,
        adaptiveHeight: false,
    });

    $('.bg-services-mobile').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        window.scrollTo(0, 0);
        window.scrollTo(0, 0);
    });
    $('.rooms .room-info .text .counter').prependTo('.rooms ');
    mainPageSlider.slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        variableWidth: true,
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
    if (window.innerWidth <= 480) {
        $TEAM_SLIDER.slick({
            dots: false,
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            rows: 1,
            slidesPerRow: 1,
            variableWidth: true,

        });

    }
}

window.onresize = function (event) {
    if (window.innerWidth >= 768) {
    } else {
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
    const calc = ((index + 4) / ($portfolioSlider.slick('getSlick').slideCount)) * 120;
    $progressBar
        .css('background-size', `${calc}% 100%`)
        .attr('aria-valuenow', calc);
    $progressBarLabel.text(`${calc.toFixed(2)}% completed`);
}

$portfolioSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setProgress(nextSlide);
});

// Counter
let el = document.querySelectorAll('.portfolio-cards .card');
for (var i = 1; i < el.length + 1; i++) {
    document.querySelector('.portfolio-cards .card:nth-child(' + i + ') num').innerHTML = i;
}
setProgress(0);
let scrollCount = null;
let scroll = null;
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

let svgPosition = () => {
    let expPos = $('.exp').offset().top + 100;
    $('svg.circle-backgound').css('top', expPos);
}


$('.bg-services .services .text a.read-more').click(function (e) {
    e.preventDefault();
    $('.bg-services .services .text .wrapper').toggleClass('closed');

    let alt = $(this).text();
    $(this).text($(this).attr('alt'));
    $(this).attr('alt', alt);
});


$('.bg-services section .text.block a.read-more').click(function (e) {
    e.preventDefault();

    $(this).siblings('.wrapper').toggleClass('closed');
    let alt = $(this).text();
    $(this).text($(this).attr('alt'));
    $(this).attr('alt', alt);

});
$('.bg-services-mobile .sq .text a.read-more').click(function (e) {
    e.preventDefault();
    //$('.bg-services-mobile').slick('init')
    $(this).siblings('.wrapper').toggleClass('closed');
    let alt = $(this).text();
    $(this).text($(this).attr('alt'));
    $(this).attr('alt', alt);


});
const footerForm = document.getElementById("footer-form");
footerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: 'http://' + window.location.host.toString() + "/request",
        data: {
            name: $('#footer-form input[name="name"]').val(),
            email: $('#footer-form input[type="email"]').val(),
            phone: $('#footer-form input[name="phone"]').val(),
            msg: $('#footer-form textarea').val(),
            from_page: window.location.pathname.toString(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (data) {

            $('#footer-form .form').hide();
            $('#footer-form .question').addClass('success');
            $('section.footer-form .question').addClass('success');
        }
    });
});

const modalCall = document.getElementById("request_call");
modalCall.addEventListener('submit', (e) => {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: 'http://' + window.location.host.toString() + "/request",
        data: {
            name: $('#request_call input[name="name"]').val(),
            phone: $('#request_call input[name="phone"]').val(),
            email: $('#request_call input[type="email"]').val(),
            msg: $('#request_call input[name="msg"]').val(),
            from_page: window.location.pathname.toString(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (data) {
            //let qust = $('section.footer-form .question');
            //$('#call .question').apapend(qust);
            $('#call').addClass('success')
            setTimeout(() => {
                close_all();
            }, 2000);

        }
    });
});


document.onload(svgPosition);

