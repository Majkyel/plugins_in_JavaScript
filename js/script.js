'use strit';

var mainCarousel = document.querySelector('.main-carousel');
var slidesScript = document.getElementById('slideScript').innerHTML;
var previousWrappedButton = document.querySelector('.restart');
var progressBar = document.querySelector('.progress-bar');
var conButtons = document.querySelector('.container-buttons');
var allSlides = '';

var dataSlides = [{
    id: 'carousel-cell1',
    image: 'http://citywallpaperhd.com/download/405-portofino-italy-photos.jpg',
    title: 'SICILY',
    description: '<h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut mattis purus. Etiam ac auctor elit.</h6>',
    coords: {
        lat: 38.115,
        lng: 13.361
    }
},
{
    id: 'carousel-cell2',
    image: 'https://italia-by-natalia.pl/wp-content/uploads/2017/05/DSC00388.jpg',
    title: 'SICILY',
    description: '<h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut mattis purus. Etiam ac auctor elit.</h6>',
    coords: {
        lat: 37.075,
        lng: 15.286
    }
},
{
    id: 'carousel-cell3',
    image: 'http://www.vinci-energies.it/content/uploads/sites/11/2017/01/hp_vinci_energies_italia02.jpg',
    title: 'Venice',
    description: '<h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut mattis purus. Etiam ac auctor elit.</h6>',
    coords: {
        lat: 45.440,
        lng: 12.315
    }
},
{
    id: 'carousel-cell4',
    image: 'https://sklep.trefl.com/media/catalog/product/2/6/26119_plakat.png',
    title: 'Santorini',
    description: '<h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut mattis purus. Etiam ac auctor elit.</h6>',
    coords: {
        lat: 36.393,
        lng: 25.461
    }
},
{
    id: 'carousel-cell5',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Bugibba_square_Malta_1.jpg',
    title: 'Malta',
    description: '<h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut mattis purus. Etiam ac auctor elit.</h6>',
    coords: {
        lat: 35.937,
        lng: 14.375
    }
}];

var dataSlidesLength = dataSlides.length;

for (var i = 0; i < dataSlidesLength; i++) {
    allSlides += Mustache.render(slidesScript, dataSlides[i]);
}
mainCarousel.insertAdjacentHTML('afterbegin', allSlides);

function createNewSlider(target, options) {
    return new Flickity(target, options);
}

var flkty = createNewSlider(mainCarousel, {cellAlign: 'left', contain: true, pageDots: false, hash: true});
createNewSlider(conButtons, {asNavFor: '.main-carousel', contain: true, pageDots: false, prevNextButtons: false});

previousWrappedButton.addEventListener('click', function () {
    flkty.select(0);
});

flkty.on('scroll', function (progress) {
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

    for (let i = 0; i < dataSlidesLength; i++) {
        var marker = new google.maps.Marker({
            position: dataSlides[i].coords,
            map: map
        });
        marker.addListener('click', function () {
            flkty.selectCell("#" + dataSlides[i].id);
        });
    }

    for (let i = 0; i < dataSlidesLength; i++) {
        buttons[i].addEventListener('click', function () {
            map.panTo(dataSlides[i].coords);
            map.setZoom(8);
        });
    }

    flkty.on('change', function (index) {
        map.panTo(dataSlides[index].coords);
    });
};
