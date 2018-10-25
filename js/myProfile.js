window.onload = function () {

    liff.init(
        function (data) {
            initializeApp(data);
        },
        function(){
            $('body').append(
`<div class="ui info message">
    <div class="header">
        Register this page to LINE BOT from the following link.
    </div>
    <a href="${location.href.replace('myLineProfile.html','')}">${location.href.replace('myLineProfile.html','')}</a>
</div>`);
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