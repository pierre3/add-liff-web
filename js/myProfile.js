window.onload = function (e) {

    liff.init(function (data) {
        initializeApp(data);
    });




};

function initializeApp(data) {
    liff.getProfile().then(function()
    {
        $('#userimagefield').attr('src', profile.pictureUrl);
        $('#usernamefield').text(profile.displayName);
        $('#messagefield').text(profile.statusMessage);
    });
    $('#useridfield').text(data.context.userId);
    $('#utouidfield').text(data.context.utouId);
    $('#roomidfield').text(data.context.roomId);
    $('#groupidfield').text(data.context.groupId);
}