const liffUrl = "https://api.line.me/liff/v1/apps";

window.onload = function () {
    $("#registerButton").on("click", function () {
        var accessToken = $("#accessTokenField").val();
        if (accessToken === "" || accessToken === null) { return; }
        sessionStorage.setItem("ChannelAccessToken", accessToken);
        listLiff(accessToken);
    });

    $("#addLiff").on("click", function () {
        var accessToken = $("#accessTokenField").val();
        if (accessToken === "" || accessToken === null) { return; }

        var url = $("#url").val();
        var type = $("input[type='radio']:checked").attr('id');
        addLiff(accessToken, url, type);
    });
    
    $("#url").val(location.href + "myLineProfile.html");

    var accessToken = this.sessionStorage.getItem("ChannelAccessToken");
    if (accessToken === "" || accessToken === null) { return; }
    $("#accessTokenField").val(accessToken);

    listLiff(accessToken);

};

function listLiff(accessToken) {
    $.ajax({
        url: liffUrl,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }

    }).done(function (result) {
        $("#cards").empty();
        for (let liff of result.apps) {
            var card = `<div class='card'>
    <div class='content'>
        <div class='header' id='id-${liff.liffId}'>line://app/${liff.liffId}</div>
        <div class='meta'>View Type: ${liff.view.type}</div>
        <div class='description'>URL: <a href ='${liff.view.url}'>${liff.view.url}</a></div>
    </div >
    <div class='extra content'>
        <button class='ui basic green button copyUrlButton' data-liffid='${liff.liffId}'>Copy LIFF URL</button>
    </div>
</div >`;
            $("#cards").append(card);
        }

        $(".copyUrlButton").on("click", function () {
            var liffId = $(this).data("liffid");
            copyToClipboard('id-' + liffId);
        });

    }).fail(function () {
        alert("Failed.");
    });
}

function addLiff(accessToken, url, viewType) {
    var body = JSON.stringify({
        'view': {
            'type': viewType,
            'url': url
        }
    });
    $.ajax({
        url: liffUrl,
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        data: body
    }).done(function () {
        listLiff(accessToken);
    }).fail(function () {
        alert("Failed.");
    });
}

function deleteLiff(liffId) {
    var accessToken = sessionStorage.getItem("ChannelAccessToken");
    $.ajax({
        url: liffUrl + "/" + liffId,
        type: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).done(function () {
        listLiff(accessToken);
    }).fail(function () {
        alert("Failed.");
    });
}