$(document).ready(function () {

    $('.left').click(function () {
        $(location).attr('href', '/');
    })
    $('.nextButton').click(function () {
        if (cheking === false) {
            $.ajax({
                url: "/api",
                type: "POST",
                data: JSON.stringify({ type: "sell", key: $('.emailInput').val() }),
                dataType: "json"
            })
                .done(callback);
        } else {

            let qiwi = $('.emailInput').val();

            if(qiwi[0] != "+" || qiwi.length != 12) {
                alert("Некорректно введен номер qiwi кошелька");
                $('.emailInput').focus();
                return;
            }

            $('.formBuy').html(`Ждите зачислений`);
        }
    })

    $('.popup').click( function() {
        $('.popup').hide();
    })

    $('.license>a').click(function() {
        $('.popup').show();
    })

});

let cheking = false;

function callback(data) {
    console.log(data);

    if (data.Result !== undefined && data.Result === "ok") {
        cheking = true;
        $('.email').html(`<div class="gameInfoKey">Игра: <span class="boldPrise">${data.GameName}</span>
                        <br>
                        Будет зачисленно:<span class="boldPrise"> ${data.Prise} rub</span>
                        <br>
                        Номер qiwi кошелька
                        <br>
                        <input type="text" class="emailInput" placeholder="+7**********" />
                        </div>`)
        $(".textButton").text("Отправить");

        

    }
    else {
        cheking = false;
        alert("Проверьте свою ключ.")
    }
}
