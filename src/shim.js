/* global window, document, navigator */

window.AudioContext = window.AudioContext || window.webkitAudioContext
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f){ window.setTimeout(f, 1000/30); }
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

window.b = document.body
window.d = document