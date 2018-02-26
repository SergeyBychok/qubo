var body = $('body');

$(document).ready(function () {

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


    $(window).on('scroll', function () {
        if (window.scrollY > 100) {
            $('header').addClass('bg');
        } else {
            $('header').removeClass('bg');
        }
    });

    $('.animate').addClass("hidden").viewportChecker({
        classToAdd: 'showBlock',
        offset: 230
    });


// individual
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


    function formula() {
        var item = document.getElementById('industry').value
        var countryEl = document.getElementById('country')

        if (!industry[item] || countryEl.value.length !== 1) return false
        var obj = industry[item]
        var VALmanagement = Number(document.getElementById('range0').value)
        var VALexpiriance = Number(document.getElementById('range1').value)
        var VALinterface = Number(document.getElementById('range2').value)
        var VALcollect = Number(document.getElementById('range3').value)
        var VALprocess = Number(document.getElementById('range4').value)
        var res = ((VALmanagement) * obj.management * 30 + (VALexpiriance) * obj.expertise * 50 + (VALinterface) * obj.interface * 25 + (VALcollect) * obj.collect * 20 + (VALprocess) * obj.process * 30) * 0.000040
        if (countryEl.value.length == 1 && countryEl.value == 1) {
            res = 0.7 * res;
        }
        document.getElementById('result').innerHTML = Math.round(res * 10) / 10
    }

    function changeVal(id) {
        id = +id
        var that = $(".outWrap_" + id)
        var rangeVal = $("#range" + id).val()

        var beforeVal = +$("#range" + (id - 1)).val() || 0
        var nextVal = +$("#range" + (id + 1)).val() || 0

        $("#rangeout_" + (id + 1)).text(Math.round(nextVal - rangeVal))
        that.find('output').text(Math.round(rangeVal - beforeVal))
        that.css({left: rangeVal + "%"})
        formula()
    }


    body.on('change', 'select', function () {
        formula()
    })


// business

    var businessCalc = function () {
        var industryVal = document.getElementById('industry-business').value
        var salary = document.getElementById('salary').value
        var country = document.getElementById('country-business').value
        var employees = document.getElementById('employees').value
        if (!industryVal || !country) return false
        var resPess;
        if (country == 0) {
            resPess = salary * employees * industry[industryVal].countryFirst / 200;
        } else {
            resPess = salary * employees * industry[industryVal].countrySecond / 200;
        }
        resPess = Math.round(resPess)
        var resOpt = resPess * 4;

        $('.saving__result.opt').text('$ ' + resOpt)
        $('.saving__result.pess').text('$ ' + resPess)
        $('.saving-bar').find('span').css({width: (100 * resOpt / 1701962020) + '%'})
    }


    body.on('change', '#industry-business, #country-business, .range-secondary', function () {
        businessCalc()
    })


// modal
    body.on('click', '.main__video-link', function () {
        $('body').addClass('open-modal');
        return false
    })

    $("body").click(function (e) {
        if ($(e.target).hasClass('video')) {
            return false;
        }
        $('body').removeClass('open-modal');
    })

    new Typed('.chat__item--qubo span', {
        strings: ["Hello. Describe your problem/issue, please"],
        typeSpeed: 30,
        startDelay: 500,
        showCursor: false
    });
    new Typed('.chat__item--user span', {
        strings: ["How to run SAP report in background?"],
        typeSpeed: 30,
        backDelay: 500,
        startDelay: 2500,
        showCursor: false
    })


//if is mobile

    // for (var i = 0; i < 6; i++) {
    //     $('#range' + i).after($('.outWrap_' + i))
    // }

})
var industry = {
    accommodations: {
        countryFirst: 8.25,
        countrySecond: 5.78,
        management: 30,
        expertise: 40,
        interface: 50,
        collect: 80,
        process: 90
    },
    manufacturing: {
        countryFirst: 7.2,
        countrySecond: 5.04,
        management: 10,
        expertise: 20,
        interface: 20,
        collect: 80,
        process: 70
    },
    agriculture: {
        countryFirst: 7.25,
        countrySecond: 5.08,
        management: 10,
        expertise: 40,
        interface: 40,
        collect: 90,
        process: 80
    },
    transportation: {
        countryFirst: 11.2,
        countrySecond: 7.84,
        management: 30,
        expertise: 40,
        interface: 40,
        collect: 80,
        process: 90
    },
    mining: {
        countryFirst: 8.15,
        countrySecond: 5.71,
        management: 10,
        expertise: 50,
        interface: 10,
        collect: 80,
        process: 80
    },
    construction: {
        countryFirst: 6.33,
        countrySecond: 4.43,
        management: 20,
        expertise: 30,
        interface: 30,
        collect: 80,
        process: 70
    },
    utilities: {
        countryFirst: 8.9,
        countrySecond: 6.23,
        management: 10,
        expertise: 20,
        interface: 30,
        collect: 80,
        process: 80
    },
    wholesale: {
        countryFirst: 8.2,
        countrySecond: 5.74,
        management: 10,
        expertise: 20,
        interface: 20,
        collect: 80,
        process: 70
    },
    retail: {
        countryFirst: 10,
        countrySecond: 10,
        management: 10,
        expertise: 30,
        interface: 20,
        collect: 80,
        process: 70
    },
    health: {
        countryFirst: 10,
        countrySecond: 10,
        management: 10,
        expertise: 20,
        interface: 20,
        collect: 60,
        process: 80
    },
    finance: {
        countryFirst: 12.15,
        countrySecond: 8.51,
        management: 10,
        expertise: 30,
        interface: 30,
        collect: 70,
        process: 80
    },
    real: {
        countryFirst: 9.6,
        countrySecond: 6.72,
        management: 10,
        expertise: 20,
        interface: 20,
        collect: 60,
        process: 80
    }
}
