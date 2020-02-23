/**
 * @author Austin Rognes
 * @date 2/4/2020
 */

 // typewriter initialization
let typewriterElem = [document.getElementById('title').childNodes[1], document.getElementById('title').childNodes[3]];
let typewriterTemp = [];
let blinker = document.getElementById('title').childNodes[5];
let blinkerStartTime;
for(let i=0; i<typewriterElem.length; i++) {
  typewriterTemp[i] = typewriterElem[i].innerHTML;
  typewriterElem[i].innerHTML = null;
}
animTypeWriter(0);

// about me section animatin
/*let aboutTxt = [];
let aboutMeChildren = document.getElementById('about').childNodes;
for(let i=1; i<aboutMeChildren.length; i+=2) aboutTxt[Math.floor(i/2)] = aboutMeChildren[i];
animRise(0);*/



function animTypeWriter(blinkerIndex) {

    // end of line
    if(typewriterElem[blinkerIndex].innerHTML.length >= typewriterTemp[blinkerIndex].length) {
      typewriterElem[blinkerIndex].innerHTML = typewriterTemp[blinkerIndex];  // remove '|' once done
      blinkerIndex++;

      // finished all lines
      if(blinkerIndex == 2) {
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

/*function animRise(index) {

  aboutTxt[index].style.opacity = Number(aboutTxt[index].style.opacity) + 0.05;
  console.log(aboutTxt[index].style.opacity);

  if(aboutTxt[index].style.opacity == 1) {
    if(index < aboutTxt.length - 1) setTimeout(() => {animRise(++index)}, 500);
    return;
  }

  setTimeout(() => {animRise(index)}, 5);
}*/



function shakeLinks(elem) {
  shakeLinksTime(elem.parentElement.children[1], elem.parentElement.children[2], 0);
}

function shakeLinksTime(link1, link2, t) {
  if(link1.nodeName == 'A') link1.style.transform = "rotate(" + -Math.sin(t/10) * 20 + "deg)";
  if(link2.nodeName == 'A') link2.style.transform = "rotate(" + Math.sin(t/10) * 20 + "deg)";
  t++;
  if(t < 95) setTimeout(shakeLinksTime, 5, link1, link2, t);
}