$(document).ready(function () {

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


// individual
    var container = $('#range-container');

    var values = [1, 6, 21, 36, 51, 67]
    var previus = [0, 0, 0, 0, 0, 0];
    var itemWidth = 10;

//append inputs
    values.forEach(function (value, i) {
        var id = 'range' + i;
        var oninput = 'rangeout_' + i + '.value = ' + id + '.value';
        var input = $('<input type="range" multiple></input>').clone();

        input.attr('max', 100)
        input.attr('id', id);
        input.attr('min', 0);
        input.attr('step', 0.01);
        input.attr('oninput', oninput);
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
            // console.log('dont has move')
            return false;
        }

        return true;
    }


    $('input').each(function () {
        //console.log($(this).attr('id'))
        var id = $(this).attr('id');

        $(document).on('input change', '#' + id, function () {
            var value = $(this).val();
            var id = $(this).attr('id').split('range')[1];
            var width = $(this).width();
            var x = (width / 100) * value;
            var direction = getDirection(id, value);

            if (!checkIfHasMove(x, id, width)) {
                var length = (values.length - 1) - id;
                //var itemWidth = (30);
                //var nValue = ( (width - (width/100)*length) )/ (width/100);
                var nValue = (width - (itemWidth * length)) / (width / 100);

                // console.log('checkIfHasMove', nValue)
                $(this).val(nValue)
            }

            // console.log('direction', direction, id)
            changeVal(id)
            if (direction == 'right') {
                sinbling = $('#range' + (++id));
            } else {
                sinbling = $('#range' + (--id));
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
        var that = $('.outWrap_' + id)
        var rangeVal = $('#range' + id).val()

        var beforeVal = +$('#range' + (id - 1)).val() || 0
        var nextVal = +$('#range' + (id + 1)).val() || 0

        $('#rangeout_' + (id + 1)).text(Math.round(nextVal - rangeVal))
        that.find('output').text(Math.round(rangeVal - beforeVal))
        that.css({left: rangeVal + '%'})
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
        $('.saving__block').fadeTo(300, 1)
        $('.saving__result.opt').text('$ ' + numberWithSpaces(resOpt))
        $('.saving__result.pess').text('$ ' + numberWithSpaces(resPess))
        $('.saving-bar').find('span').css({width: (100 * ((resOpt - resPess) / resOpt)) + '%'})

    }

    body.on('change', '#industry-business, #country-business, .range-secondary', function () {
        businessCalc()
    })

//if is mobile
    var resizeFlag = false

    $(window).on('resize', function () {
        checkMobile()
    })
    checkMobile()

    function checkMobile() {
        if ($(document).width() < 767 && !resizeFlag) {
            resizeFlag = true

            $('select').niceSelect('destroy');
            for (var i = 0; i < 6; i++) {
                $('#range' + i).after($('.outWrap_' + i))
            }
        } else if (resizeFlag && $(document).width() > 767) {
            resizeFlag = false

            $('select').niceSelect();
            for (var i = 0; i < 6; i++) {
                $('.outWrap_' + i).appendTo($('.calculate__range-wrap'))
                changeVal(i)
            }
        }
    }
})
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
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
