const baseUrl = 'http://www.bijint.com/assets/pict/';
const locationList = [
    'jp',
    'osaka',
    'hokkaido',
    'sendai',
    'kobe',
    'fukuoka',
    'kanazawa',
    'nagoya',
    'gunma',
    'fukui',
    'okinawa',
    'kumamoto',
    'saitama',
    'tokyo',
    'shizuoka',
    'miyazaki',
    'iwate',
    'tochigi',
    'kanagawa',
    'kyoto',
    'okayama',
    'nagasaki',
    'akita',
    'nagano',
    'ibaraki',
    'saga',
    'aomori',
    'kagawa',
    'kagoshima',
    'niigata',
    'hiroshima',
    'chiba',
    'nara',
    'yamaguchi',
    'tottori',
    'yamanashi'
  ];

window.onload = function () {

    liff.init(
        function (data) {},
        function () {
            appendLiffLink('bijin-tokei.html');
        });

    
    SetImageUrl();
    $('#picture').on('error',function() {
        SetImageUrl();    
    });

    $("#reload").on("click", function(){
        SetImageUrl();
    });
};

function SetImageUrl(){
    var date = new Date();
    var hh = ('0' + date.getHours()).slice(-2);
    var mm = ('0' + date.getMinutes()).slice(-2);
    var loc = locationList[getRandomInt(locationList.length - 1)];
    $('#picture').attr('src', baseUrl + loc + "/pc/" + hh + mm + ".jpg");
    $('#location').text(loc);
    $('#time').text(hh+":"+mm);
 }