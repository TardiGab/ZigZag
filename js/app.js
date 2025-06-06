"use strict";

document.getElementById("fullSize").addEventListener("click", function() {
    const element = document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // La page n'est pas en plein écran, donc on la met en plein écran
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
    } else {
        // La page est déjà en plein écran, donc on la quitte du mode plein écran
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
});

document.addEventListener("fullscreenchange", toggleFullSizeVisibility);
document.addEventListener("webkitfullscreenchange", toggleFullSizeVisibility);
document.addEventListener("mozfullscreenchange", toggleFullSizeVisibility);
document.addEventListener("MSFullscreenChange", toggleFullSizeVisibility);

function toggleFullSizeVisibility() {
    const fullSizeElement = document.getElementById("fullSize");
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        fullSizeElement.style.display = "none";
    } else {
        fullSizeElement.style.display = "inline-block"; // Remettre l'affichage par défaut
    }
}