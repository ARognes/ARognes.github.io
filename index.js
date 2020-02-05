/**
 * @author Austin Rognes
 * @date 2/4/2020
 */


document.addEventListener('touchmove', () => {

});


function shakeLinks(elem) {
  shakeLinksTime(elem.parentElement.children[1], elem.parentElement.children[2], 0);
  //let link1 = elem.parentElement.children[1];
  //let link2 = elem.parentElement.children[2];
  //link1.style.transform = "rotate(20)";
  //link1.style.transform = "rotate(" + Math.sin(t/5) * 20 + ")";
  //link2.style.transform = "rotate(" + Math.cos(t/5) * 20 + ")";
  //console.log(Math.sin(t/5) * 20);
  //t++;
  //if(t < 40) setTimeout(shakeLinks, 5, link1, link2, t);
}

function shakeLinksTime(link1, link2, t) {
  link1.style.transform = "rotate(" + -Math.sin(t/10) * 20 + "deg)";
  link2.style.transform = "rotate(" + Math.sin(t/10) * 20 + "deg)";
  t++;
  if(t < 95) setTimeout(shakeLinksTime, 5, link1, link2, t);
}
