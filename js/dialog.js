$(document).ready(function () {

    continuity()
    setInterval(continuity, 13500);
})

function some(dialogNumber, text, delay, remove) {

    var html;
    var ID = 'a' + randomInteger(1, 300);
    if (dialogNumber == 1) {
        html = '<div class="chat__item chat__item--qubo"><img class="chat__pic" src="images/logo_small.svg"><span>' + text + '</span></div>'
    } else {
        html = '<div class="chat__item chat__item--user"><span>' + text + '</span></div>'
    }
    setTimeout(function () {
        $(html).attr('id', ID).css({opacity: 0}).appendTo('.chat__content').addClass('chat-animate').delay(remove).queue(function () {
            $('#' + ID).addClass('chat-animate--hide');
            setTimeout(function () {
                $('#' + ID).remove();
            }, 300);
        })
        $(this).dequeue();
    }, delay)
}

function continuity() {
    some(1, 'Hello. Describe your problem/issue, please', 0, 2800) //4800
    some(2, 'How to run SAP report in background?', 1000, 4000)
    some(1, 'Do you want to read the instructions "Setting the background job in SAP ERP"?', 2800, 4000)
    some(2, 'Yes', 5500, 3000)
    some(1, 'Follow the link for instructions', 6800, 3000)
    some(1, 'Has your issue been solved?', 8500, 3000)
    some(2, 'Yes', 9500, 3000)
    some(1, 'Closing the session', 10000, 2500)
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}
