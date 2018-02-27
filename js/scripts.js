var body = $('body');

$(document).ready(function () {



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

