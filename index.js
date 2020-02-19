/**
 * @author Austin Rognes
 * @date 2/4/2020
 */

let typewriterSpeed = 200;
let typewriterElem = [document.getElementById('title').childNodes[1], document.getElementById('title').childNodes[3]];
let typewriterTemp = ["Austin_Rognes =", typewriterElem[1].innerHTML];
let blinker = document.getElementById('title').childNodes[5];
let blinkerStartTime;
let blinkerIndex = 0;
for(let i=0; i<typewriterElem.length; i++) typewriterElem[i].innerHTML = null;

animTypeWriter();

function animTypeWriter() {

    // end of line
    if(typewriterElem[blinkerIndex].innerHTML.length >= typewriterTemp[blinkerIndex].length) {
      typewriterElem[blinkerIndex].innerHTML = typewriterTemp[blinkerIndex];  // remove '|' once done
      blinkerIndex++;

      // finished all lines
      if(blinkerIndex >= typewriterElem.length) {
        blinkerStartTime = Date.now();
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

    typewriterElem[blinkerIndex].innerHTML = typewriterTemp[blinkerIndex].substr(0, next) + "|";
  setTimeout(animTypeWriter, 60);
}

function blinkCursor() {
  //typewriterElem[1].innerHTML = typewriterTemp[1] + ((Math.floor(Date.now()/500) % 2 == 0) ? "|" : " ");

  if(Math.floor((Date.now() - blinkerStartTime)/500) % 2 == 0) blinker.innerHTML = "|";
  else blinker.innerHTML = "";

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