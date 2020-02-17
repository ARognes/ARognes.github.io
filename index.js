/**
 * @author Austin Rognes
 * @date 2/4/2020
 */

 let langYPos = 0;
 let animTimer;
 let animInterval;

 // store showcase repositories
 let repos = [...document.getElementsByClassName('repo')];
 let openRepos = [];


window.onscroll = () => {

  // enter / exit repository div
  lang = document.getElementById('languages');
  if(window.pageYOffset >= lang.offsetTop - 0.02 * window.innerWidth && lang.style.position != "fixed") {
      langYPos = lang.offsetTop - 0.02 * window.innerWidth;
      lang.style.position = "fixed";
      lang.style.top = "2vw";

      // fade in
      document.getElementById('showcase').style.visibility = "visible";

      // stack cards in
      repoEnter(0);

      animTimer = Date.now();
      animInterval = setInterval(repoAnimate, 5);



  }
  if(window.pageYOffset < langYPos) {
    document.getElementById('languages').style.position = "absolute";
    document.getElementById('languages').style.top = null;

    // fade out
    document.getElementById('showcase').style.visibility = "hidden";
    repoHide();
    clearInterval(animInterval);
  }
};

function repoEnter(s) {
  if(s == 0) {
    //console.log(repos[0].childNodes[7].childNodes[1].innerHTML);
    //repos.find(e => {return e.childNodes[7].childNodes[1].innerHTML === "Tile Grid"});
    for(let i=0; i<repos.length; i++) {
      let repoTitle = repos[i].childNodes[7].childNodes[1].innerHTML;
      if(repoTitle === "Tile Grid" || repoTitle === "MIT BattleCode 2020" || repoTitle === "RognesCorp Website") {
        repos[i].style.visibility = "visible";
        repos[i].style.top = "90%";
        openRepos.push(repos[i]);
      }
      /*else if(repoTitle === "MIT BattleCode 2020") {
        repos[i].style.visibility = "visible";
        repos[i].style.top = "110%";
      }
      else if(repoTitle === "RognesCorp Website") {
        repos[i].style.visibility = "visible";
        repos[i].style.top = "110%";
      }*/
    }
  }
}

function repoHide() {
  for(let i=0; i<repos.length; i++) repos[i].style.visibility = "hidden";
  openRepos = [];
}

function repoAnimate() {
  for(let i=0; i<openRepos.length; i++) {
    if(openRepos[i].style.visibility === "visible") {
      let curTop = openRepos[i].style.top.substr(0, 2);
      openRepos[i].style.top = curTop* 0.99 + "%";
      console.log(curTop);
    }
  }
}

function arst(e) {
  e.childNodes[7].childNodes[1].innerHTML == "Tile Grid";
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
