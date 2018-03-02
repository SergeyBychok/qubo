var body = $('body');

$(document).ready(function () {

    $(window).on('scroll', function () {
        addHeader()
    });
    addHeader()

    function addHeader() {
        if (window.scrollY > 100) {
            $('header').addClass('bg');
        } else {
            $('header').removeClass('bg');
        }
    }

    //
    // var offset = $(document).width() < 767 ? 30 : 230
    // $('.animate').viewportChecker({
    //     classToRemove: 'hidden',
    //     classToAdd: 'showBlock',
    //     offset: offset
    // });


// modal
//     body.on('click', function (e) {
//         if ($(e.target).hasClass('video')) {
//             return false;
//         }
//         body.removeClass('open-modal');
//     })
//
//     body.on('touchstart', function (e) {
//         if ($(e.target).hasClass('video')) {
//             return false;
//         }
//         body.removeClass('open-modal');
//     })
//
//     body.on('click', '.main__video-link, .mob__video-link', function () {
//         body.addClass('open-modal');
//         return false
//     })

    $('a[href^=\'#\']').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 60
        }, 1000);
    });

    if ($(window.location.hash).length > 1) {
        $('html, body').animate({
            scrollTop: $(window.location.hash).offset().top - 60
        }, 1000);
    }

    body.on('click', '.mob__open-menu--link', function () {
        body.toggleClass('open-menu')
        return false

    })

    body.on('click', '.menu__list', function () {
        body.removeClass('open-menu');
        return false
    })

    // new js
    body.on('click', '.tabs__control--item', function () {
        var that = $(this)
        if (that.hasClass('first')) {
            that.parent().removeClass('second').addClass('first')
            $('.calculate__wrap').hide()
            $('.calculate__wrap--first').show()

        } else {
            that.parent().removeClass('first').addClass('second')
            $('.calculate__wrap').hide()
            $('.calculate__wrap--second').show()
        }
    })
})

