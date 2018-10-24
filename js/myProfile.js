window.onload = function (e) {

    liff.init(function (data) {
        initializeApp(data);
    });

    

    
};

function initializeApp(data, profile) {
    //var profile = liff.getProfile();
    //document.getElementById('userimagefield').src = profile.pictureUrl;
    //document.getElementById('usernamefield').textContent = profile.displayName;
   // document.getElementById('messagefield').textContent = profile.statusMessage;
    document.getElementById('languagefield').textContent = data.language;
    document.getElementById('useridfield').textContent = data.context.userId;
    document.getElementById('utouidfield').textContent = data.context.utouId;
    document.getElementById('roomidfield').textContent = data.context.roomId;
    document.getElementById('groupidfield').textContent = data.context.groupId;
}

