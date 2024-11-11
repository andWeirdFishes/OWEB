document.addEventListener("DOMContentLoaded", function () {
    var selectedRating = 0;
    var star1 = document.getElementById("star1");
    var star2 = document.getElementById("star2");
    var star3 = document.getElementById("star3");
    var star4 = document.getElementById("star4");
    var star5 = document.getElementById("star5");
    var stars = [star1, star2, star3, star4, star5];
    var form = document.getElementById("review-form");

    for (var i = 0; i < stars.length; i++) {
        (function (index) {
            stars[index].addEventListener("mouseover", function () {
                updateStars(index + 1);
            });
            stars[index].addEventListener("mouseout", function () {
                updateStars(selectedRating);
            });
            stars[index].addEventListener("click", function () {
                selectedRating = index + 1;
            });
        })(i);
    }

    function updateStars(rating) {
        for (var j = 0; j < stars.length; j++) {
            stars[j].src = j < rating ? "assets/logos/st1.png" : "assets/logos/st0.png";
        }
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        saveRating(selectedRating);
        calculateAverageRating();
        form.reset();
        selectedRating = 0;
        updateStars(0);
    });

    function saveRating(rating) {
        var ratings = JSON.parse(localStorage.getItem("ratings")) || [];
        ratings.push(rating);
        localStorage.setItem("ratings", JSON.stringify(ratings));
    }

    function calculateAverageRating() {
        var ratings = JSON.parse(localStorage.getItem("ratings")) || [];
        if (ratings.length === 0) {
            document.getElementById("average-rating").innerHTML = "-";
            return;
        }
        var total = 0;
        for (var i = 0; i < ratings.length; i++) {
            total += ratings[i];
        }
        var average = total / ratings.length;
        document.getElementById("average-rating").innerHTML = average.toFixed(1);
    }

    calculateAverageRating();
});