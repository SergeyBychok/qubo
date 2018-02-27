$(document).ready(function () {
    some(1, 'Hello. Describe your problem/issue, please', 0, 4800)
    some(2, 'How to run SAP report in background?', 3000, 5000)
    some(1, 'Do you want to read the instructions "Setting the background job in SAP ERP"?', 5000, 4000)
    some(2, 'Yes', 8000, 3000)
    some(1, 'Follow the link for instructions', 9000, 4000)
    some(1, 'Has your issue been solved?', 11000, 3000)
    some(2, 'Yes', 13000, 3000)
    some(1, 'Closing the session', 14000, 2000)
})

function some(dialogNumber, text, delay, remove) {

    var html;
    var ID = 'a' + randomInteger(1, 300);
    if (dialogNumber == 1) {
        html = '<div class="chat__item chat__item--qubo"><img class="chat__pic" src="images/logo_small.svg"><span></span></div>'
    } else {
        html = '<div class="chat__item chat__item--user"><span></span></div>'
    }
    setTimeout(function () {
        $(html).attr('id', ID).appendTo('.chat__content').queue(function () {
            new Typed('#' + ID + ' span', {
                strings: [text],
                typeSpeed: 15,
                startDelay: 500,
                showCursor: false
            })
            $(this).dequeue();
        }).delay(remove).queue(function () {
            $('#' + ID).remove();
        })
    }, delay)
}


//if is mobile

// for (var i = 0; i < 6; i++) {
//     $('#range' + i).after($('.outWrap_' + i))
// }


// <div class="chat__item chat__item--qubo"><img class="chat__pic" src="images/logo_small.svg"><span></span></div>
// <div class="chat__item chat__item--user"><span></span></div>


function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}
