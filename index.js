/**
 * @author Austin Rognes
 * @startdate 2/4/2020
*/

//
document.getElementById("bio").style.height = window.innerHeight - 140 + "px";


// check if viewing on mobile device
var isMobile = false;

// device detection retrieved from: https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device/3540295#3540295
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

// get context and add input listeners
var canvas = document.getElementById('bioAnim'), ctx = canvas.getContext('2d');
let dpx = window.devicePixelRatio || 1;
ctx.scale(dpx, dpx);
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', () => {
  if(!isMobile) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
}, false);

let now = Date.now();

// background bubble
let bubble = {left: 220, right: 220, height: 140, scale: 0};

function draw(){
  let dt = Date.now() - now;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  

  if(bubble.scale < 1) bubble.scale += dt/500 * (1 - bubble.scale);
  bubble.left = 220 * bubble.scale + Math.sin(now/100);
  bubble.right = 220 * bubble.scale + Math.sin(now/100);
  bubble.height = 140 * bubble.scale + Math.cos(now/100);

  // title bubble
  ctx.fillStyle = '#272822';
  ctx.beginPath();
  ctx.bezierCurveTo(w/2 - bubble.left, 0, w/2 - 7 * bubble.left/8, bubble.height, w/2, bubble.height);
  ctx.bezierCurveTo(w/2, bubble.height, w/2 + 7 * bubble.right/8, bubble.height, w/2 + bubble.right, 0);
  ctx.fill();

  // bio bottom bubble
  ctx.rect(0, h-bubble.height/2 * canvas.width/800 + 1, w, bubble.height/2 * canvas.width/800 + 1);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.bezierCurveTo(0, h - bubble.height/2 * canvas.width / 800, w/4, h, w/2, h);
  ctx.bezierCurveTo(w/2, h, 3 * w/4 , h, w, h - bubble.height/2 * canvas.width / 800);
  ctx.fill();


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

setTimeout(() => {animTypeWriter(0)}, 400);



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
      while(typewriterTemp[blinkerIndex][next] !== '>') next++;
      do next++;  // a rare 'do while' loop grazing in its natural habitat
      while(typewriterTemp[blinkerIndex][next] !== '>');
    } else while(typewriterTemp[blinkerIndex][next + 1] === " ") next++;
    
    typewriterElem[blinkerIndex].innerHTML = typewriterTemp[blinkerIndex].substr(0, next);
    if(typewriterElem[blinkerIndex].innerHTML.length < typewriterTemp[blinkerIndex].length) typewriterElem[blinkerIndex].innerHTML += "|";
  setTimeout(() => {animTypeWriter(blinkerIndex)}, 40);
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
    languages.classList.add('languagesSticky');
  } else if(entries[0].intersectionRatio === 1)
    languages.classList.remove('languagesSticky');
}, { threshold: [0,1] });

observer.observe(document.querySelector("#languagesTop"));

function shakeLinks(elem) {
  shakeLinksTime(elem.parentElement.children[1], elem.parentElement.children[2], 0);
}

function shakeLinksTime(link1, link2, t) {
  if(link1.nodeName == 'A') link1.style.transform = "rotate(" + -Math.sin(t/10) * 20 + "deg)";
  if(link2.nodeName == 'A') link2.style.transform = "rotate(" + Math.sin(t/10) * 20 + "deg)";
  t++;
  if(t < 95) setTimeout(shakeLinksTime, 5, link1, link2, t);
}