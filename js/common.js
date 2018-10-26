function copyToClipboard(targetElementId) {

    var copyTarget = document.getElementById(targetElementId);
    var rng = document.createRange();
    rng.selectNodeContents(copyTarget);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(rng);
    //copy
    document.execCommand("Copy");
    alert("Copied. [" + copyTarget.innerHTML + "]");
}

function appendLiffLink(fileName)
{
    $('body').append(
        `<div class="ui info message">
            <div class="header">
                Register this page to LINE BOT from the following link.
            </div>
            <a href="${location.href.replace(fileName,'')}">${location.href.replace(fileName,'')}</a>
        </div>`);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }