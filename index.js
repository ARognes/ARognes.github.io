/**
 * @author Austin Rognes
 * @date 2/4/2020
 */

let typewriterElem = [document.getElementById('title').childNodes[1], document.getElementById('title').childNodes[3], document.getElementById('about').childNodes[1], document.getElementById('about').childNodes[3], document.getElementById('about').childNodes[5],document.getElementById('about').childNodes[7]];
let typewriterTemp = [];
let blinker = document.getElementById('title').childNodes[5];
let blinkerStartTime;
//let blinkerIndex = 0;
for(let i=0; i<typewriterElem.length; i++) {
  typewriterTemp[i] = typewriterElem[i].innerHTML;
  typewriterElem[i].innerHTML = null;
}

animTypeWriter(0);

/*function startAnim() {

  animTypeWriter();

}*/

function animTypeWriter(blinkerIndex) {

    // end of line
    if(typewriterElem[blinkerIndex].innerHTML.length >= typewriterTemp[blinkerIndex].length) {
      typewriterElem[blinkerIndex].innerHTML = typewriterTemp[blinkerIndex];  // remove '|' once done
      blinkerIndex++;
      console.log(blinkerIndex);
      // finished all lines
      if(blinkerIndex == 2) {
        blinkerStartTime = Date.now();
        blinkCursor();
        
        
        for(let i=blinkerIndex; i < typewriterElem.length; i++) setTimeout(() => {animTypeWriter(i)}, 40);
        return;
      } else if(blinkerIndex > 2) return;
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

    typewriterElem[blinkerIndex].innerHTML = typewriterTemp[blinkerIndex].substr(0, next) + "|";




  setTimeout(() => {animTypeWriter(blinkerIndex)}, 40);
}

function blinkCursor() {
  if(typewriterElem[1].innerHTML[typewriterElem[1].innerHTML.length - 1] !== "|") {
    typewriterElem[1].innerHTML += "|";
    if(window.innerWidth <= 380) typewriterElem[1].style.left = "3.1px";
    else typewriterElem[1].style.left = "4px";
  }
  else {
    typewriterElem[1].innerHTML = typewriterTemp[1];
    typewriterElem[1].style.left = "0";
  }

  setTimeout(blinkCursor, 500);
}

function shakeLinks(elem) {
  shakeLinksTime(elem.parentElement.children[1], elem.parentElement.children[2], 0);
}

function shakeLinksTime(link1, link2, t) {
  if(link1.nodeName == 'A') link1.style.transform = "rotate(" + -Math.sin(t/10) * 20 + "deg)";
  if(link2.nodeName == 'A') link2.style.transform = "rotate(" + Math.sin(t/10) * 20 + "deg)";
  t++;
  if(t < 95) setTimeout(shakeLinksTime, 5, link1, link2, t);
}