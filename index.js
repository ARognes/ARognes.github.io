/**
 * @author Austin Rognes
 * @startdate 2/4/2020
*/

// get context and add input listeners
var canvas = document.getElementById('bioAnim'), ctx = canvas.getContext('2d');
let dpx = window.devicePixelRatio || 1;
ctx.scale(dpx, dpx);
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}, false);

let points = [];
for(let i=0; i<8; i++) {
  let point = [w / 9 * (i + 1), h - Math.random() * h/4, 0.5 + Math.random()];
  points.push(point);
}
let now = Date.now();

function draw(){
  let dt = Date.now() - now;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#272822';


  /*ctx.beginPath();
  ctx.moveTo(0, h);
  for(let i=0; i<points.length; i++) {



    
  }
  //ctx.lineTo(w, 3*h/4);
  ctx.lineTo(w, h);
  ctx.fill();*/
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function loop(){
  draw();
  requestAnimFrame(loop);
  now = Date.now();
})();

// typewriter initialization
let typewriterElem = [document.getElementById('title').childNodes[5], document.getElementById('title').childNodes[7]];
let typewriterTemp = [];
for(let i=0; i<typewriterElem.length; i++) {
  typewriterTemp[i] = typewriterElem[i].innerHTML;
  typewriterElem[i].innerHTML = null;
}

window.addEventListener('load', function () {
  animTypeWriter(0);
});

function animTypeWriter(blinkerIndex) {

    // end of line
    if(typewriterElem[blinkerIndex].innerHTML.length >= typewriterTemp[blinkerIndex].length) {
      blinkerIndex++;

      // finished all lines
      if(blinkerIndex == 2) {
        typewriterElem[1].innerHTML = typewriterTemp[1];
        blinkCursor();
        return;
      }
    }
    
    let next = typewriterElem[blinkerIndex].innerHTML.length;

    // treat html tag as a single character (expecting <a></a>)
    if(typewriterTemp[blinkerIndex][next] === '<') {
      // find 2 greater-than signs
      next++;
      while(typewriterTemp[blinkerIndex][next] !== '>') next++;
      do next++;  // a rare 'do while' loop grazing in its natural habitat
      while(typewriterTemp[blinkerIndex][next] !== '>');
      next++;
    } else while(typewriterTemp[blinkerIndex][next + 1] === " ") next++;

    
    typewriterElem[blinkerIndex].innerHTML = typewriterTemp[blinkerIndex].substr(0, next);
    if(typewriterElem[blinkerIndex].innerHTML.length < typewriterTemp[blinkerIndex].length) typewriterElem[blinkerIndex].innerHTML += "|";
  setTimeout(() => {animTypeWriter(blinkerIndex)}, 50);
}

function blinkCursor() {
  if(typewriterElem[1].innerHTML[typewriterElem[1].innerHTML.length - 1] !== "|") {
    typewriterElem[1].innerHTML += "|";
    typewriterElem[1].style.left = "8.3px";
  }
  else {
    typewriterElem[1].innerHTML = typewriterTemp[1];
    typewriterElem[1].style.left = "0";
  }

  setTimeout(blinkCursor, 500);
}

let languages = document.getElementById('languages');
// also color the languageIcons here
// set repos to visible through transition

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].intersectionRatio === 0) {
    languages.classList.add('languages-sticky');
  } else if(entries[0].intersectionRatio === 1)
    languages.classList.remove('languages-sticky');
}, { threshold: [0,1] });

observer.observe(document.querySelector("#languages-top"));

function shakeLinks(elem) {
  shakeLinksTime(elem.parentElement.children[1], elem.parentElement.children[2], 0);
}

function shakeLinksTime(link1, link2, t) {
  if(link1.nodeName == 'A') link1.style.transform = "rotate(" + -Math.sin(t/10) * 20 + "deg)";
  if(link2.nodeName == 'A') link2.style.transform = "rotate(" + Math.sin(t/10) * 20 + "deg)";
  t++;
  if(t < 95) setTimeout(shakeLinksTime, 5, link1, link2, t);
}