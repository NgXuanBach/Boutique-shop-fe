/*Bắt đầu đếm số lượng items trong cart */
let bearerToken = "Bearer " + localStorage.getItem("token");
var cartTotal = ('small#totalQuantity');
$(document).ready(function () {
    $('.chat-toggle-btn').click(function () {
        $('#chat-box').toggle();
    });

    $('.close-btn').click(function () {
        $('#chat-box').hide();
    });

    $('#send-btn').click(function () {
        sendMessage();
    });

    $('#chat-input').keypress(function (e) {
        if (e.which === 13) { // Enter key pressed
            sendMessage();
        }
    });

    function sendMessage() {
        const message = $('#chat-input').val().trim();
        if (message) {
            $('#chat-messages').append('<div>' + message + '</div>');
            $('#chat-input').val('');
            $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
        }
    }
    var userId;
    //  function getUserId() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/user/getid",
        headers: { Authorization: bearerToken },
        async: false,
        data: {
            token: localStorage.getItem("token"),
        },
    }).done(function (response) {
        userId = response.data;
        return response;
    });
    //  }

    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/cart/count/" + encodeURIComponent(userId),
        headers: { "Authorization": bearerToken },
        data: {
            userId: userId
        },

        success: function (response) {
            var totalQuantity = response.data;
            if (typeof totalQuantity === "undefined") {
                $('#login').show();
                $('#logout').hide();
                $(cartTotal).text('(0)');
            } else {
                $('#login').hide();
                $('#logout').show();
                $(cartTotal).text('(' + totalQuantity + ')');
            }
        },
        error: function (error) {
            console.error("Error return productList", error);
        }
    });
    //  })
})

function Ulogout() {
    window.location.href = "index.html"
    localStorage.clear();
}

