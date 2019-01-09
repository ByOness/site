$(document).ready(function () {

    $('.left').click(function () {
        $(location).attr('href', '/');
    })
    checkCookie();

    $('.popup').click(function () {
        $('.popup').hide();
    })

    $('.license>a').click(function () {
        $('.popup').show();
    })
});
 
function checkCookie() {
    let key = getCookie("key");
    let game = getCookie("game");
    let prise = getCookie("prise");
    let bonusC = getCookie("bonus");

    let gameName = $('.wrapper').attr('id');
    let bonus = $('.gameBonus').attr('id');

    if (key !== undefined && game !== undefined && bonusC !== undefined &&
        prise !== undefined && gameName === game && bonusC === bonus) {
        callback({ Key: key, Prise: prise });
    } else {
        deleteCookie("key");
        deleteCookie("game");
        deleteCookie("prise");
        deleteCookie("bonus");

        $('.nextButton').click(function () {
            $.ajax({
                url: "/api",
                type: "POST",
                data: JSON.stringify({ type: "get", title: gameName, bonus: bonus.slice(bonus.length - 4, bonus.length) }),
                dataType: "json"
            })
                .done(callback);
        })
    }

}

function callback(data) {
    console.log(data)
    if (data.Key !== undefined) {
        if (data.Key == "key end") {
            $('.formBuy').html(`<div class="opTitle">В данный момент ключи для этой игры закончились</div>`);
        } else {
            let gameName = $('.wrapper').attr('id');
            let bonus = $('.gameBonus').attr('id');

            setCookie("key", data.Key);
            setCookie("prise", data.Prise);
            setCookie("game", gameName);
            setCookie("bonus", bonus);

            $('.formBuy').html(`
       <div class="opTitle"> Оплата <span class="bold">${data.Prise} RUB</span> на Qiwi Кошелёк: 
       <br>
       <span class="bold">+79831296689</span>
       <br>
       Комментарий: <span class="comm">${data.Key} </span>
       <a target="_blank" href="https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=+79831296689&amountInteger=${data.Prise}&currency=RUB&amountFraction=0&extra%5B%27comment%27%5D=${data.Key}&email="><div class="toBuyButton">Перейти к оплате</div> </a>
       <div class="checkButton">Проверить</div>
       </div>`);

            $('.checkButton').click(function () {
                $.ajax({
                    url: "/api",
                    type: "POST",
                    data: JSON.stringify({ type: "check", key: data.Key }),
                    dataType: "json"
                })
                    .done(function (res) {
                        if (res.MyKey !== undefined && res.MyKey != "wait") {
                            console.log(res.MyKey);

                            deleteCookie("key");
                            deleteCookie("game");
                            deleteCookie("prise");
                            deleteCookie("bonus");

                            $('.formBuy').html(`<div class="opTitle"> Ключ: <span class="bold">${res.MyKey}</span>`);
                        }
                        else {
                            alert("Оплата не подтверждена");
                        }
                    });
            });
        }
    }
}

function setCookie(name, value, options = {}) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}
