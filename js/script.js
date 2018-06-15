'use strit';

var mainCarousel = document.querySelector('.main-carousel');
var slidesScript = document.getElementById('slideScript').innerHTML;
var dataSlidesLength = dataSlides.length;
var previousWrappedButton = document.querySelector('.restart');
var progressBar = document.querySelector('.progress-bar');
var conButtons = document.querySelector('.container-buttons');
var allSlides = '';

for (var i = 0; i < dataSlidesLength; i++) {
    allSlides += Mustache.render(slidesScript, dataSlides[i]);
}
mainCarousel.insertAdjacentHTML('afterbegin', allSlides);

var flkty = new Flickity(mainCarousel, {
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    hash: true
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

flkty.on('scroll', function(progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

window.initMap = function () {
    var buttons = document.querySelectorAll('.localization');
    var firstSlide = dataSlides[0].coords;
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: firstSlide
    });
		
    for (let i = 0;i < dataSlidesLength; i++) {
        var marker = new google.maps.Marker({
            position: dataSlides[i].coords,
            map: map
        }); 
        marker.addListener('click', function() {
            flkty.selectCell("#" + dataSlides[i].id);
        });
    }
    
    for (let i = 0;i < dataSlidesLength; i++) {
        buttons[i].addEventListener('click', function() {
            map.panTo(dataSlides[i].coords);   
            map.setZoom(8);
        });
    }
    
    flkty.on('change', function(index) {
        map.panTo(dataSlides[index].coords);
    });
};
