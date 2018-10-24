window.onload = function (e) {

    liff.init(function (data) {
        initializeApp(data);
    });

    

    
};

function initializeApp(data) {
    //var profile = liff.getProfile();
    //document.getElementById('userimagefield').src = profile.pictureUrl;
    //document.getElementById('usernamefield').textContent = profile.displayName;
   // document.getElementById('messagefield').textContent = profile.statusMessage;
    alert(JSON.parse(data));
    $('#useridfield').val(data.context.userId);
    $('#utouidfield').val(data.context.utouId);
    $('#roomidfield').val(data.context.roomId);
    $('#groupidfield').val(data.context.groupId);
}

