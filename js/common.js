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