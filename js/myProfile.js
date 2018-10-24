window.onload = function () {

    liff.init(function (data) {
        initializeApp(data);
    });
};

function initializeApp(data) {
    $('#useridfield').val(data.context.userId);
    $('#utouidfield').val(data.context.utouId);
    $('#roomidfield').val(data.context.roomId);
    $('#groupidfield').val(data.context.groupId);
    
    liff.getProfile().then(function (profile) {
        $('#userimagefield').attr('src', profile.pictureUrl);
        $('#usernamefield').val(profile.displayName);
        $('#messagefield').val(profile.statusMessage);
    }).catch(function (error) {
        window.alert("Error getting profile: " + error.message);
    });
}