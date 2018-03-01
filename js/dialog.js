$(document).ready(function () {
    continuity()
    setInterval(continuity, 26000);
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
    some(1, 'Hello, how can I help?', 0, 3000)
    some(2, 'I cannot work with the vendor bank account in the SAP system', 1000, 4000)
    some(1, 'Can you please specify in which system you experience this issue?', 3000, 4000)
    some(2, 'SAP ERP', 5000, 3000)
    some(1, 'Please provide vendor account number', 7000, 2000)
    some(2, '10000043', 8000, 2000)
    some(1, 'Please provide bank code', 9000, 2000)
    some(2, '300258', 10000, 2000)
    some(1, 'Enter bank account number, please', 11000, 3000)
    some(2, '122344', 12000, 2500)
    some(1, 'This bank account does not exist in SAP system.', 14000, 3000)
    some(1, 'I\'m happy to create it for you momentarily. Are you ok with this?', 14500, 3500)
    some(2, 'Yes', 17000, 2000)
    some(1, 'Sure, 122344 bank account was successfully created for the vendor 10000043', 18000, 4500)
    some(1, 'Are you satisfied with my service?', 19000, 4000)
    some(2, 'Absolutely!', 22500, 1500)
    some(1, 'Thank you and have a great rest of the week', 23000, 3000)
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}