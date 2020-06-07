var brand = document.getElementById('headerBrand');
var header = document.getElementById('header');
var headerDesc = document.getElementById('headerDesc');
var sect1 = document.getElementById('sect1');
var sect2 = document.getElementById('sect2');
var screen = window.matchMedia("(min-width: 768px)");

window.onload = function () {
    pageLoad();
};

function pageLoad() {
    // 1 - brand * after .5s
    // brand.style.opacity = 1;
    setTimeout(function () {
        moveUpHalf(brand);
    }, 500);
    // 2 - header description * after .3s
    setTimeout(function () {
        fadeIn(headerDesc);
    }, 800);
    // 3 - section halfs * after .5s
    setTimeout(function () {
        sectionAnimation(screen); // Call listener function at run time
        screen.addListener(sectionAnimation); // Attach listener function on state changes
    }, 1300);
}

// ===============================================================
// Animation Rules
// ===============================================================
function fadeIn(elem) {
    var op = 0.1;
    // elem.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        elem.style.opacity = op;
        elem.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function moveUpHalf(elem) {
    var pos = 50;
    var id = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(id);
            header.style.position = "fixed";
            elem.style.position = "relative";
        } else {
            pos--;
            elem.style.top = pos + '%';
            elem.style.transform = "translate(-50%, -" + pos + "%)";
        }
    }
}

function moveUpFull(elem) {
    var pos = 100;
    var id = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(id);
        } else {
            pos--;
            elem.style.top = pos + '%';
            elem.style.display = 'block';
        }
    }
}

function moveDownFull(elem) {
    var pos = -100;
    var id = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + '%';
            elem.style.display = 'block';
        }
    }
}

function moveLeftFull(elem) {
    var pos = 100;
    var id = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(id);
        } else {
            pos--;
            elem.style.left = pos + '%';
            elem.style.display = 'block';
        }
    }
}

function moveRightFull(elem) {
    var pos = -100;
    var id = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.left = pos + '%';
            elem.style.display = 'block';
        }
    }
}

// ===============================================================
function sectionAnimation(screen) {
    if (screen.matches) { // If media query matches
        sect1.style.left = "unset";
        sect2.style.left = "unset";
        moveDownFull(sect1);
        moveUpFull(sect2);
    } else {
        sect1.style.top = "unset";
        sect2.style.top = "unset";
        moveRightFull(sect1);
        moveLeftFull(sect2);
    }
}