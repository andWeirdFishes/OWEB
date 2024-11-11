
const getCurrentPageIndex = () => {
    const path = window.location.pathname;
    const match = path.match(/u(\d)\.html$/);
    return match ? parseInt(match[1]) + 6 - 1 : 0;
};

const initializeStorage = () => {
    if (!localStorage.getItem('page_likes')) {
        localStorage.setItem('page_likes', JSON.stringify(new Array(12).fill(0)));
        localStorage.setItem('page_dislikes', JSON.stringify(new Array(12).fill(0)));
        localStorage.setItem('page_comments', JSON.stringify(Array(12).fill().map(() => [])));
    }
};

const pageIndex = getCurrentPageIndex();
initializeStorage();

var pageLikes = JSON.parse(localStorage.getItem('page_likes'));
var pageDislikes = JSON.parse(localStorage.getItem('page_dislikes'));
var pageComments = JSON.parse(localStorage.getItem('page_comments'));

var hasReacted = false;

window.onload = function () {
    document.getElementById('likeCount').innerHTML = pageLikes[pageIndex];
    document.getElementById('dislikeCount').innerHTML = pageDislikes[pageIndex];
    loadComments();
}

document.getElementById('likeBtn').onclick = function () {
    if (!hasReacted) {
        pageLikes[pageIndex]++;
        document.getElementById('likeCount').innerHTML = pageLikes[pageIndex];
        localStorage.setItem('page_likes', JSON.stringify(pageLikes));
        hasReacted = true;
        document.getElementById('likeBtn').classList.add('disabled-btn');
        document.getElementById('dislikeBtn').classList.add('disabled-btn');
    }
}

document.getElementById('dislikeBtn').onclick = function () {
    if (!hasReacted) {
        pageDislikes[pageIndex]++;
        document.getElementById('dislikeCount').innerHTML = pageDislikes[pageIndex];
        localStorage.setItem('page_dislikes', JSON.stringify(pageDislikes));
        hasReacted = true;
        document.getElementById('likeBtn').classList.add('disabled-btn');
        document.getElementById('dislikeBtn').classList.add('disabled-btn');
    }
}

document.getElementById('submitComment').onclick = function () {
    var commentText = document.getElementById('commentInput').value;
    var commenterName = document.getElementById('commenterName').value;

    if (commentText.trim() === '') {
        alert('Please write a comment before posting.');
        return;
    }

    if (commenterName.trim() === '') {
        alert('Please enter your name before posting a comment.');
        return;
    }

    saveComment(commentText, commenterName);
    document.getElementById('commentInput').value = '';
    document.getElementById('commenterName').value = '';
}

function generateCommentId() {
    return 'comment_' + new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9);
}

function saveComment(text, name) {
    var newComment = {
        id: generateCommentId(),
        text: text,
        name: name,
        date: new Date().toLocaleString()
    };

    pageComments[pageIndex].push(newComment);
    localStorage.setItem('page_comments', JSON.stringify(pageComments));
    loadComments();
}

function deleteComment(commentId) {
    pageComments[pageIndex] = pageComments[pageIndex].filter(function (comment) {
        return comment.id !== commentId;
    });
    localStorage.setItem('page_comments', JSON.stringify(pageComments));
    loadComments();
}

function loadComments() {
    var comments = pageComments[pageIndex];
    var commentsHtml = '';

    for (var i = 0; i < comments.length; i++) {
        commentsHtml += '<div class="card bg-secondary mb-2"><div class="card-body">';
        commentsHtml += '<div class="d-flex justify-content-between">';
        commentsHtml += '<h6 class="card-subtitle mb-2">' + comments[i].name + '</h6>';
        commentsHtml += '<button class="btn btn-danger btn-sm" onclick="deleteComment(\'' + comments[i].id + '\')">Delete</button>';
        commentsHtml += '</div>';
        commentsHtml += '<p class="card-text">' + comments[i].text + '</p>';
        commentsHtml += '<small class="text-muted">' + comments[i].date + '</small>';
        commentsHtml += '</div></div>';
    }

    document.getElementById('commentsList').innerHTML = commentsHtml;
}

document.getElementById('testDriveForm').onsubmit = function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var date = document.getElementById('date').value;

    const carModels = [
        '2024 Mystery Machine X1',
        '2024 Green Phantom',
        '2024 Eco Cruiser',
        '2024 Lightning McGray',
        '2024 Forest Runner',
        '2024 Nature Beast',
        '2020 Vintage Viper',
        '2019 Classic Cobra',
        '2011 Phoenix Phantom',
        '2002 Shadow Specter',
        '1995 Thunderbolt Cruiser',
        '1988 Midnight Mirage'
    ];

    var requests = JSON.parse(localStorage.getItem('testDriveRequests')) || [];
    requests.push({
        car: carModels[pageIndex],
        name: name,
        email: email,
        date: date,
        requestDate: new Date().toLocaleString()
    });
    localStorage.setItem('testDriveRequests', JSON.stringify(requests));

    alert('Test drive request submitted successfully! We will contact you soon.');
    this.reset();
}