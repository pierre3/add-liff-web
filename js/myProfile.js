window.onload = function (e) {

    liff.init(function (data) {
        initializeApp(data);
    });
};

function initializeApp(data) {
    $('#useridfield').val(data.context.userId);
    $('#utouidfield').val(data.context.utouId);
    $('#roomidfield').val(data.context.roomId);
    $('#groupidfield').val(data.context.groupId);
}