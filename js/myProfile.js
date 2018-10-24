window.onload = function (e) {

    liff.init(function (data) {
        initializeApp(data);
    });




};

function initializeApp(data) {
    var profile = liff.getProfile();
    alert(JSON.parse(profile));
    $('#userimagefield').attr('src', profile.pictureUrl);
    $('#usernamefield').val(profile.displayName);
    $('#messagefield').val(profile.statusMessage);
    $('#useridfield').val(data.context.userId);
    $('#utouidfield').val(data.context.utouId);
    $('#roomidfield').val(data.context.roomId);
    $('#groupidfield').val(data.context.groupId);
}