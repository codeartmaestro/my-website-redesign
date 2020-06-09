var brand = document.getElementById('navBrand');
var header = document.getElementById('header');
var navCenter = document.getElementById('navCenter');
var navDesc = document.getElementById('navDesc');
var sect1 = document.getElementById('sect1');
var sect2 = document.getElementById('sect2');
var sect1phrase = document.getElementById('sect1phrase');
var sect2phrase = document.getElementById('sect2phrase');
var centralSymbol = document.getElementById('centralSymbol');
var fadeObj = document.querySelectorAll(".fade-in-last");
var screen = window.matchMedia("(min-width: 768px)");

window.onload = function () {
    pageLoad();
};

function pageLoad() {
    // 1 - brand * after .5s
    // brand.style.opacity = 1;
    setTimeout(function () {
        moveUpHalf(brand, function () {
            // 2 - header description * after .3s
            setTimeout(function () {
                fadeIn(navDesc, function () {
                    // 3 - section halfs * after .5s
                    setTimeout(function () {
                        sectionAnim(screen, function () {
                            screen.addListener(sectionAnim); // Attach listener function on state changes
                            // 4 - section phrase left/top * after 3.5s > text animation durations
                            setTimeout(function () {
                                fadeIn(sect1phrase, function () {
                                    // 5 - central symbol
                                    setTimeout(function () {
                                        fadeIn(centralSymbol, function () {
                                            // 6 - section phrase right/bottom
                                            setTimeout(function () {
                                                fadeIn(sect2phrase, function () {
                                                    setTimeout(function () {
                                                        fadeInArr(fadeObj, function () {
                                                            console.log('t');
                                                        });
                                                    }, 500);
                                                });
                                            }, 300);
                                        });
                                    }, 300);
                                });
                            }, 2000);
                        }); // Call listener function at run time
                    }, 500);
                });
            }, 500);
        });
    }, 500);
}

// ===============================================================
// Anim Rules
// ===============================================================
function fadeIn(elem, cb) {
    var op = 0.1;
    var timer = setInterval(frame, 10);

    function frame() {
        if (op >= 1) {
            clearInterval(timer);
        } else {
            elem.style.opacity = op;
            elem.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }
    }
    cb();
}

function fadeInArr(arr, cb) {
    var op = 0.1;
    var timer = setInterval(frame, 10);

    function frame() {
        for (var i = 0; i < arr.length; i++) {
            if (op >= 2) {
                clearInterval(timer);
            } else {
                arr[i].style.opacity = op;
                arr[i].style.filter = 'alpha(opacity=' + op * 100 + ")";
                op += op * 0.1;
            }
        }
    }

    cb();
}

function moveUpHalf(elem, cb) {
    var pos = 50;
    var timer = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(timer);
            header.style.position = "fixed";
            elem.style.position = "relative";
            // navCenter.classList.add("nav__center--pos");
        } else {
            pos--;
            elem.style.top = pos + '%';
            elem.style.transform = "translate(-50%, -" + pos + "%)";
        }
    }

    cb();
}

function moveUpFull(elem) {
    var pos = 100;
    var timer = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(timer);
        } else {
            pos--;
            elem.style.top = pos + '%';
            elem.style.display = 'block';
        }
    }
}

function moveDownFull(elem) {
    var pos = -100;
    var timer = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(timer);
        } else {
            pos++;
            elem.style.top = pos + '%';
            elem.style.display = 'block';
        }
    }
}

function moveLeftFull(elem) {
    var pos = 100;
    var timer = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(timer);
        } else {
            pos--;
            elem.style.left = pos + '%';
            elem.style.display = 'block';
        }
    }
}

function moveRightFull(elem) {
    var pos = -100;
    var timer = setInterval(frame, 1);

    function frame() {
        if (pos === 0) {
            clearInterval(timer);
        } else {
            pos++;
            elem.style.left = pos + '%';
            elem.style.display = 'block';
        }
    }
}

// ===============================================================
function sectionAnim(screen, cb) {
    if (screen.matches) { // If media query matches
        sect1.style.left = "auto";
        sect2.style.left = "auto";
        navDesc.classList.remove("nav__desc--pos");
        moveDownFull(sect1);
        moveUpFull(sect2);
    } else {
        sect1.style.top = "auto";
        sect2.style.top = "auto";
        navDesc.classList.add("nav__desc--pos");
        moveRightFull(sect1);
        moveLeftFull(sect2);
    }
    cb();
}

// function fadeInOne(elem, cb) {
//     fadeIn(elem);
//     cb();
// }

// function fadeInLast(cb) {
//     for (var i = 0; i <= fadeObj.length; i++) {
//         fadeIn(fadeObj[i], function () {
//             console.log('t');
//         });
//     }
//     cb();
// }