'use strit';

var mainCarousel = document.querySelector('.main-carousel');
var conButtons = document.querySelector('.container-buttons');
var progressBar = document.querySelector('.progress-bar');
var previousWrappedButton = document.querySelector('.restart');

var flkty = new Flickity(mainCarousel, {
    cellAlign: 'left',
    contain: true,
    pageDots: false,
});

new Flickity(conButtons, {
    asNavFor: ".main-carousel",
    pageDots: false,
    contain: true,
    prevNextButtons: false
});

previousWrappedButton.addEventListener('click', function () {
    flkty.select(0);
});

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});
