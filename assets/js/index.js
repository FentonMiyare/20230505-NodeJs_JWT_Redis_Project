/*ORDER WRAPPER DETAILS*/
let choose = document.querySelector('.choose');
let chooseIcon = document.querySelector('.choose > .icon');
let pay = document.querySelector('.pay');
let wrap = document.querySelector('.wrap');
let ship = document.querySelector('.ship');
let wrapIcon = document.querySelector('.wrap > .icon');
let payIcon = document.querySelector('.pay > .icon');
let shipIcon = document.querySelector('.ship > .icon');
let line = document.querySelector('#line');
let first = document.querySelector('#first');
let second = document.querySelector('#second');
let third = document.querySelector('#third');
let fourth = document.querySelector('#fourth');

/*for (let i = 0; i < Things.length; i++) {
  Things[i]
}*/

const elNodeList = [
    {'el': choose, 'elChange': chooseIcon, 'lineNo': first},
    {'el': pay, 'elChange': payIcon, 'lineNo': second},
    {'el': wrap, 'elChange': wrapIcon, 'lineNo': third},
    {'el': ship, 'elChange': shipIcon, 'lineNo': fourth},
  ];
// console.log(elNodeList[3]['elChange']);


choose.addEventListener('click', () => {
  choose.classList.add("active");
  chooseIcon.classList.add("active");
  pay.classList.remove("active");
  wrap.classList.remove("active");
  ship.classList.remove("active");
  payIcon.classList.remove("active");
  shipIcon.classList.remove("active");
  wrapIcon.classList.remove("active");
  shipIcon.classList.remove("active");
  line.classList.add("one");
  line.classList.remove("two");
  line.classList.remove("three");
  line.classList.remove("four");
})

pay.addEventListener('click', () => {
  pay.classList.add("active");
  payIcon.classList.add("active");
  choose.classList.remove("active");
  wrap.classList.remove("active");
  ship.classList.remove("active");
  chooseIcon.classList.remove("active");
  wrapIcon.classList.remove("active");
  shipIcon.classList.remove("active");
  line.classList.add("two");
  line.classList.remove("one");
  line.classList.remove("three");
  line.classList.remove("four");
})

wrap.addEventListener('click', () => {
  wrap.classList.add("active");
  wrapIcon.classList.add("active");
  pay.classList.remove("active");
  choose.classList.remove("active");
  ship.classList.remove("active");
  payIcon.classList.remove("active");
  chooseIcon.classList.remove("active");
  shipIcon.classList.remove("active");
  line.classList.add("three");
  line.classList.remove("two");
  line.classList.remove("one");
  line.classList.remove("four");
})

ship.addEventListener('click', () => {
  ship.classList.add("active");
  shipIcon.classList.add("active");
  pay.classList.remove("active");
  wrap.classList.remove("active");
  choose.classList.remove("active");
  payIcon.classList.remove("active");
  wrapIcon.classList.remove("active");
  chooseIcon.classList.remove("active");
  line.classList.add("four");
  line.classList.remove("two");
  line.classList.remove("three");
  line.classList.remove("one");
})

choose.addEventListener('click', function() {
  first.classList.add("active");
  second.classList.remove("active");
  third.classList.remove("active");
  fourth.classList.remove("active");
})

pay.addEventListener('click', function() {
  first.classList.remove("active");
  second.classList.add("active");
  third.classList.remove("active");
  fourth.classList.remove("active");
})

wrap.addEventListener('click', function() {
  first.classList.remove("active");
  second.classList.remove("active");
  third.classList.add("active");
  fourth.classList.remove("active");
})

ship.addEventListener('click', function() {
  first.classList.remove("active");
  second.classList.remove("active");
  third.classList.remove("active");
  fourth.classList.add("active");
})


/*TESTIMONIALS*/
'use strict'
let testim = document.getElementById("testim"),
    testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
    touchStartPos,
    touchEndPos,
    touchPosDiff,
    ignoreTouch = 30;
;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
    
    testim.addEventListener("touchstart", function(e) {
        touchStartPos = e.changedTouches[0].clientX;
    })
  
    testim.addEventListener("touchend", function(e) {
        touchEndPos = e.changedTouches[0].clientX;
      
        touchPosDiff = touchStartPos - touchEndPos;
      
      //  console.log(touchPosDiff);
      //  console.log(touchStartPos); 
      //  console.log(touchEndPos); 

      
        if (touchPosDiff > 0 + ignoreTouch) {
            testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
            testimRightArrow.click();
        } else {
          return;
        }
      
    })
}
