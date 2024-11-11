const images = [
    "./assets/owners/zaedno.jpg",
    "./assets/owners/mile.jpg",
    "./assets/owners/gjore.jpg"
];

let currentIndex = 0;

const imageElement = document.getElementById("ownerImage");

setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.src = images[currentIndex];
}, 5000); 
