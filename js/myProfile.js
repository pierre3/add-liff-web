window.onload = function (e) {

    liff.init(function (data) {
        initializeApp(data);
    });
};

function initializeApp(data) {
    $('#useridfield').text(data.context.userId);
    $('#utouidfield').text(data.context.utouId);
    $('#roomidfield').text(data.context.roomId);
    $('#groupidfield').text(data.context.groupId);
    liff.getProfile().then(function (profile)
    {
        $('#userimagefield').attr('src', profile.pictureUrl);
        $('#usernamefield').text(profile.displayName);
        $('#messagefield').text(profile.statusMessage);
    }).catch(function (error){
        alert("Error getting profile: " + error.message);
    });
}