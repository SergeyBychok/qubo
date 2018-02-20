$(document).ready(function () {


    var body = $('body');

//
// //animation
//     var displayWidth = $(document).width();
//     var displayHeight = $(document).height();
//     var currentMousePos = {x: -1, y: -1};
//     var rotateDeg = 0;
//
//     $(document).mousemove(function (event) {
//         currentMousePos.x = event.pageX / displayWidth;
//         currentMousePos.y = event.pageY / displayHeight;
//
//         parallax('.parallax__bul', 20, 59, 3, false, false, true, false);
//         parallax('.parallax__bg-color', 25, 0, 10, false, true, true, false);
//         parallax('.parallax__circle', 49, 8, 5, true, false);
//         parallax('.parallax__disc', 60, 81, 2);
//         parallax('.parallax__zoom', 14, 9, 5, false, false);
//
//         //parallax('.parallax__letter', 66, 76, 10, true, false);
//         parallax('.parallax__ruler', 56, 15, 10, true, false);
//
//         parallaxRotate('.parallax__letter', 5);
//         parallaxRotate('.parallax__gear', 5);
//         parallaxRotate('.parallax__gear-big', 5);
//
//     });
//
//     function parallax(el, posTop, posLeft, distance, disableX, disableY, invertX, invertY) {
//
//         var shiftX = currentMousePos.x * distance / 5;
//         var shiftY = currentMousePos.y * distance / 5;
//
//         if (!disableX) {
//             posLeft += (invertX) ? -shiftX : shiftX;
//         }
//
//         if (!disableY) {
//             posTop += (invertY) ? -shiftY : shiftY;
//         }
//
//         $(el).css({top: posTop + '%', left: posLeft + '%'})
//     }
//
//     function parallaxRotate(el, deg) {
//         if (!isInputFocus()) {
//
//             rotateDeg = (-currentMousePos.x + currentMousePos.y  ) * deg
//             deg = 'rotate(' + rotateDeg + 'deg)';
//             $(el).css({transform: deg})
//         }
//
//     }
//
//     function isInputFocus() {
//         return $(document.activeElement).is('input')
//     }
//
// //checkbox
//     body.on('click', '.auth__checkbox', function () {
//
//         var elements = $('.parallax__pen, .auth__checkbox-text')
//
//         if ($('input.auth__checkbox').is(':checked')) {
//             elements.addClass('animate')
//         } else {
//             elements.removeClass('animate')
//         }
//
//     })
//
// // return pencil to first position
//     $('input').on('focusout', function () {
//         setTimeout(function () {
//             if (!isInputFocus()) {
//                 $('.parallax__pencil').removeClass('animatePass animateEmail').addClass('startPos')
//             }
//         }, 0);
//     });
//
//
//     body.on('click', function () {
//         if (!$('.auth__form-input').is(':focus')) {
//             var elPencil = $('.parallax__pencil')
//
//             if (elPencil.hasClass('animatePass') || elPencil.hasClass('animateEmail')) {
//                 elPencil.removeClass('animatePass, animateEmail')
//                 setTimeout(function () {
//                     elPencil.addClass('startPos')
//                 }, 1);
//             }
//
//             //for login
//             $('.parallax__gear').removeClass('animate')
//             $('.parallax__gear-big').removeClass('animate')
//         }
//     })
//
//     body.on('focus', '.auth__form-input', function () {
//
//         $('.parallax__pencil').removeClass('startPos')
//
//         if ($(this).hasClass('auth__form-input--email')) {
//             setTimeout(function () {
//                 $('.parallax__pencil').removeClass('animatePass').addClass('animateEmail')
//             }, 20);
//         } else if ($(this).hasClass('auth__form-input--password')) {
//             setTimeout(function () {
//                 $('.parallax__pencil').removeClass('animateEmail').addClass('animatePass')
//             }, 20);
//         }
//
//     })
//
//
//     body.on('focus', '.auth__form-input', function () {
//
//         if ($('.parallax__gear').length) {
//             rotateDeg += 50
//             var deg = 'rotate(' + rotateDeg + 'deg)';
//             $('.parallax__gear, .parallax__gear-big').addClass('animate').css({transform: deg})
//         }
//
//     })
//
//
//     body.on('click', '.auth__show-pass', function () {
//
//         var input = $(this).siblings('.auth__form-input')
//
//         input.prop('type', (input.prop('type') == 'password') ? 'text ' : 'password')
//         return false
//     })


    // new js
    body.on('click', '.tabs__control--item', function () {
        var that = $(this)
        if (that.hasClass('first')) {
            that.parent().removeClass('second').addClass('first')
            $(".calculate__wrap").hide()
            $(".calculate__wrap--first").show()

        } else {
            that.parent().removeClass('first').addClass('second')
            $(".calculate__wrap").hide()
            $(".calculate__wrap--second").show()
        }
    })

    var container = $("#range-container");

    var values = [1, 6, 21, 36, 51, 67]
    var previus = [0, 0, 0, 0, 0, 0];
    var itemWidth = 10;

//append inputs
    values.forEach(function (value, i) {
        var id = "range" + i;
        var oninput = "rangeout_" + i + '.value = ' + id + '.value';
        var input = $('<input type="range" multiple></input>').clone();

        input.attr("max", 100)
        input.attr("id", id);
        input.attr("min", 0);
        input.attr("step", 0.01);
        input.attr("oninput", oninput);
        input.val(value)
        container.append(input);

        $(window).resize(function () {
            //$("#range" + i).change();
            input.change();
        })

    })

    /* $("input").change(function(){
       console.log($(this).val())
     })*/
    function getDirection(index, value) {
        if (previus[index] > value) {
            previus[index] = value;
            return 'left';
        }

        previus[index] = value;

        return 'right';
    }

    function checkIfHasMove(position, index, width) {
        var length = (values.length - 1) - index;


        if (position > width - itemWidth * length) {
            console.log('dont has move')
            return false;
        }

        return true;
    }


    $('input').each(function () {
        //console.log($(this).attr('id'))
        var id = $(this).attr('id');

        $(document).on('input change', "#" + id, function () {
            var value = $(this).val();
            var id = $(this).attr('id').split("range")[1];
            var width = $(this).width();
            var x = (width / 100) * value;
            var direction = getDirection(id, value);

            if (!checkIfHasMove(x, id, width)) {
                var length = (values.length - 1) - id;
                //var itemWidth = (30);
                //var nValue = ( (width - (width/100)*length) )/ (width/100);
                var nValue = (width - (itemWidth * length)) / (width / 100);

                console.log('checkIfHasMove', nValue)
                $(this).val(nValue)
            }

            // console.log('direction', direction, id)
            changeVal(id)
            if (direction == "right") {
                sinbling = $("#range" + (++id));
            } else {
                sinbling = $("#range" + (--id));
            }

            sValue = sinbling.val();
            sX = sValue * (width / 100);

            //console.log('x value' , x)
            //console.log('sX' , sX)

            if (direction == 'right' && x > sX - itemWidth) {
                var p = x + itemWidth; //new position
                var nValue = p / (width / 100) //new value
                //console.log(nValue)
                sinbling.val(nValue)
                sinbling.change();
            } else if (x < sX + itemWidth && direction == 'left') {
                //console.log('collision')
                var p = x - itemWidth; //new position
                var nValue = p / (width / 100) //new value
                //console.log(nValue)
                sinbling.val(nValue)
                sinbling.change();

            }
        });
    })
    $('#range-container').find('input').each(function (index) {
        changeVal(index)
    })
    $('select').niceSelect();

    $('.range-secondary').each(function () {
        var percent = this.value * 100 / (this.max - this.min)
        $(this).next('output').css({left: percent + '%'}).text(this.value)
    })

    $(document).on('input change', '.range-secondary', function () {
        var percent = this.value * 100 / (this.max - this.min)
        $(this).next('output').css({left: percent + '%'})
    })
    $(window).on('scroll', function() {
        console.log(window.scrollY);
        if(window.scrollY > 100){
            $('header').addClass('bg');
        } else {
            $('header').removeClass('bg');
        }
    });

    $('.animate').addClass("hidden").viewportChecker({
        classToAdd: 'showBlock',
        offset: 230
    });

    body.on('click', '.main__video-link', function () {
        $('.modal__video').show();
        return false
    })
})


function changeVal(id) {
    id = +id
    var that = $(".outWrap_" + id)
    var rangeVal = $("#range" + id).val()

    var beforeVal = +$("#range" + (id - 1)).val() || 0
    var nextVal = +$("#range" + (id + 1)).val() || 0

    $("#rangeout_" + (id + 1)).text(Math.round(nextVal - rangeVal))
    that.find('output').text(Math.round(rangeVal - beforeVal))
    that.css({left: rangeVal + "%"})
}

new Typed('.chat__text', {
    strings: ["Hello, how can I help you?", "Hello, how can I help you?"],
    typeSpeed: 30,
    startDelay: 500,
    showCursor: false
});
new Typed('.chat__item--user', {
    strings: ["I can not choose a supplier account.", "I can not choose a supplier account."],
    typeSpeed: 30,
    backDelay: 500,
    startDelay: 2500,
    showCursor: false
})

