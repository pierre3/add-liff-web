window.onload = function () {

    liff.init(function (data) {
        initializeApp(data);
    });
};

function initializeApp(data) {
    $('#useridfield').val('user id');
    $('#utouidfield').val('utou id');
    $('#roomidfield').val('room id');
    $('#groupidfield').val('group id');
}