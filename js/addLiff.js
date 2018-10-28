const liffUrl = "https://api.line.me/liff/v1/apps";
const pages = {
    'My LINE Profile': 'myLineProfile.html',
    'Bijin Tokei':'bijin-tokei.html',
    'Pict Paint':'pictPaint.html'
};

window.onload = function () {
    $("#verifyButton").on("click", verifyButtonClick);
    $("#addLiff").on("click", addLiffButtonClick);

    createLinkList();
    SetDataFromSessionStorage();
};

var verifyButtonClick = function () {
    var accessToken = $("#accessTokenField").val();
    if (accessToken === "" || accessToken === null) {
        return;
    }
    listLiff(accessToken);
};

var addLiffButtonClick = function () {
    var accessToken = $("#accessTokenField").val();
    if (accessToken === "" || accessToken === null) {
        return;
    }

    var url = $("#url").val();
    var type = $("input[type='radio']:checked").attr('id');
    addLiff(accessToken, url, type);
};

function SetDataFromSessionStorage() {
    var accessToken = this.sessionStorage.getItem("ChannelAccessToken");
    if (accessToken === "" || accessToken === null) {
        return;
    }
    $("#accessTokenField").val(accessToken);
    listLiff(accessToken);
}

function createLinkList() {
    for (key in pages) {
        var linkUrl = location.href.replace('index.html', '') + pages[key];
        $("#links").append(
            `<div class="item">
    <div class="content">
    <button class="right floated ui button setUrl" data-url="${linkUrl}">Set to "Add LIFF"</button>
        <a class="header">${key}</a>
        <a href="${linkUrl}">${linkUrl}</div>
    </div>
</div>`);
    }
    $(".setUrl").on("click", function () {
        $("#url").val($(this).data("url"));
    });
}

function listLiff(accessToken) {
    $.ajax({
        url: liffUrl,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }

    }).done(function (result) {

        //--- Add liff cards ----------------
        $("#cards").empty();
        for (let liff of result.apps) {

            var card = 
`<div class='card'>
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
        //-------------------------------

        sessionStorage.setItem("ChannelAccessToken", accessToken);
        $("#verifyButton").empty();
        $("#verifyButton").append('<i class="ui green check icon"></i>Verify');

    }).fail(function (xhr) {
        $("#verifyButton").empty();
        if (xhr.status !== 404) {
            $("#verifyButton").append('Verify');
            alert("Failed! Invalid AccessToken.");
        } else {
            sessionStorage.setItem("ChannelAccessToken", accessToken);
            $("#verifyButton").append('<i class="ui green check icon"></i>Verify');
        }
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