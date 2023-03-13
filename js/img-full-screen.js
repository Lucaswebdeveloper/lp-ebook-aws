


function openFullscreen() {
    var imgSrc = event.target.src;
    var fullscreenImg = document.getElementById("fullscreen-img");
    fullscreenImg.src = imgSrc;
    document.getElementById("fullscreen-container").style.display = "flex";
}

function closeFullscreen() {
    document.getElementById("fullscreen-container").style.display = "none";
}


