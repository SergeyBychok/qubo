var body = $('body');

$(document).ready(function () {

    $(window).on('scroll', function () {
        if (window.scrollY > 100) {
            $('header').addClass('bg');
        } else {
            $('header').removeClass('bg');
        }
    });

    $('.animate').addClass('hidden').viewportChecker({
        classToAdd: 'showBlock',
        offset: 230
    });

// modal
    body.on('click', '.main__video-link', function () {
        $('body').addClass('open-modal');
        return false
    })

    $('body').click(function (e) {
        if ($(e.target).hasClass('video')) {
            return false;
        }
        $('body').removeClass('open-modal');
    })

    $('select').niceSelect();
})

