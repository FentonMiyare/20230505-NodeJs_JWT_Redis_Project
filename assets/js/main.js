/*==========TOGGLE NAV==========*/
'use strict';
let nav = document.querySelector('.nav__container');
let hamburger = document.querySelector('#hamburger');
const navList = document.querySelector(".nav__list");
const navItem = document.querySelectorAll(".nav__item");
const navLinks = document.querySelectorAll(".nav__item a");


if (hamburger) {
  hamburger.addEventListener('click', toggleMenu)
}

function toggleMenu() {
  hamburger.classList.toggle("open");
  
  //Animate Links
  navList.classList.toggle("open");
  nav.classList.toggle("open");
  
//  navLink.classList.toggle("active");
  navItem.forEach(item => {
    item.classList.toggle("fade");
  });
}


// window.addEventListener('load', e => {
//   navLinks.forEach(navLink => navLink.classList.add("active__link"));
// });


// ADDING ACTIVE STATE TO NAVLINKS
window.onload = () => {
  for(var i = 0; i < navLinks.length; i++){
    navLinks[i].addEventListener("click", function(e){
        let current = e.currentTarget//  document.querySelector(".nav__item a");
        if(current){
          current.classList.remove('active__link')
          console.log(current)
        }
        this.classList.add('active__link')
        console.log(current)
    })
  }
}

// for (const link of navLinks) {
//   window.addEventListener('load', () => {
//     link.classList.add('active__link')
//   })
//   // link.onloadstart = (e) => {
//   //   e.currentTarget.classList.add('active__link')
//   // }
//   console.log(link)
// }

/*ADDING INSTANAV*/
let content = document.querySelector(".wrapper");
let toc = document.getElementById("table-of-contents");
let headings = content.querySelectorAll("h2");

function addLinksToTOC() {
  let tocItems;
  let prevLevel = false;
  
  let parentEl = toc;
  let prevEl = parentEl;
  for (let i = 0, l = headings.length; i < l; i++) {
    let heading = headings[i];
    let text = heading.childNodes[0].nodeValue;
    let slug = slugify(text);
    heading.id = slug;
    tocItems = toc.getElementsByTagName("li");

    let level = parseInt(heading.tagName.replace(/\D/g, ''));
    if (prevLevel) {
      if (level > prevLevel) {
        let ul = document.createElement("ul");
        tocItems[tocItems.length - 1].appendChild(ul);
        parentEl = ul;
        prevEl = tocItems[tocItems.length - 1].parentElement;
      } else if (level < prevLevel) {
        parentEl = prevEl;
      }
    }
    prevLevel = level;

    let li = document.createElement("li");
    let a = document.createElement("a");
    let aText = document.createTextNode(text);
    a.href = "#" + heading.id;
    a.appendChild(aText);
    li.appendChild(a);
    parentEl.appendChild(li);
    li.style.paddingBlock = '0rem'
    a.style.marginInlineStart = '6px';
    a.style.pointerEvents = 'all';
    a.style.cursor = 'pointer';
  }
}


async function initTableOfContents() {
  
  // let Toc = Array.from(toc)

  // if (toc.length > 0) {
    await addLinksToTOC();
  // }
}


function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') 
    // Replace spaces with -
    .replace(/[^\w\-]+/g, '')
    // Remove all non-word chars
    .replace(/\-\-+/g, '-') 
    // Replace multiple - with single -
    .replace(/^-+/, '') 
    // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}


if (toc) {
  initTableOfContents();
}

const aside = document.querySelector(".insta_nav");

/* STICKY INSTANAV */
function sticky(){
  
  const limit = document.querySelector(".footer-section");
  const stickyOffset = aside.offsetTop;
  const limitOffset = limit.offsetTop;
  const stickyHeight = aside.offsetHeight;
  const limitHeight = limit.offsetHeight;
  
  window.addEventListener("scroll",e => {
      if(window.pageYOffset > stickyOffset){
        aside.classList.add('fixed');
        aside.style.top ="";
      } 
      else{
        aside.classList.remove('fixed');
        aside.style.top ="";
      }
      if(window.pageYOffset > limitOffset + stickyHeight){
      aside.classList.remove('fixed');
      aside.style.top = `${limitOffset-stickyHeight - limitHeight}px`;
      }
  });
}

if (aside) {
  sticky();
}

/*NAVBAR ADD SHADOW ON SCROLL*/
let navWrapper = document.querySelector('.header__wrapper');

window.onscroll = function() {
  let className = 'shadow';
  
  if (navWrapper.classList) {
    if (window.scrollY > 10)
      navWrapper.classList.add(className);
    else
      navWrapper.classList.remove(className);
  }
};
