/**
 * @author Austin Rognes
 * @date 2/4/2020
 */

let langYPos = document.getElementById('languages').offsetTop - (window.innerWidth < window.innerHeight ? 0.02 * window.innerWidth : 10);

// store showcase repositories
let repos = [...document.getElementsByClassName('repo')];
let openRepos = [];
let reposIndex = 0;

/*
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
};*/

window.onscroll = () => {
  if(window.pageYOffset >= langYPos) {
    
    // fade in
    if(document.getElementById('showcase').style.visibility !== "visible") {
      document.getElementById('showcase').style.visibility = "visible";
      //repoEnter(0);
      let repo = repos.find(e => e.childNodes[7].childNodes[1].innerHTML === "Tile Grid");
      repo.style.visibility = "visible";
      repo.style.top = "90%";
      openRepos.push(repo);
      reposIndex++;

      console.log("Enter Showcase");
    }

    // transform repo divs
    for(let i=0; i<openRepos.length; i++) {
      let offsetY = (window.pageYOffset - langYPos)/window.innerHeight;
      openRepos[i].style.top = 90 + (i * 6) - (offsetY * 100) + "%"; //parseInt(openRepos[i].style.top, 10) - Math.round(scrollDelta/10) + "%";

      let top = parseInt(openRepos[i].style.top);

      const focusY = 30;

      if(top > 40 && top < 45) {
        //openRepos[i].style.top = top + (30 - top) * 0.01 + "%";
        openRepos[i].style.top = focusY + "%";
      }
      else if(top <= 40) {
        openRepos[i].style.top = top - 10 + "%";
        openRepos[i].style.opacity = (top - 20) / 20;
      }
      else {
        openRepos[i].style.opacity = (70 - top) / 20;
      }

      //if(openRepos)
    }
    
    if(openRepos.length) {
      // add another repo
      if(parseInt(openRepos[openRepos.length-1].style.top) < 80) {
        if(reposIndex < repos.length) {
          repos[reposIndex].style.visibility = "visible";
          repos[reposIndex].style.top = "90%";
          openRepos.push(repos[reposIndex]);

          reposIndex++;
        } else {
          // hit end
        }
      } else if(parseInt(openRepos[openRepos.length-1].style.top) > 90) {
        openRepos[openRepos.length-1].style.visibility = "hidden";
        openRepos.pop();
        reposIndex--;
      }

      // remove top repo
      /*if(parseInt(openRepos[0].style.top) < 10) {
        openRepos[0].style.visibility = "hidden";
        openRepos.shift();
      } else if(openRepos[0].style.top >= 10 && reposIndex < 10) {
        openRepos.unshift(repos[reposIndex - 10]);
        openRepos[0].style.visibility = "visible";
      }*/
    }
  }

  // exit showcase
  if(window.pageYOffset < langYPos && document.getElementById('showcase').style.visibility !== "hidden") {
    document.getElementById('showcase').style.visibility = "hidden";
    repoHide();
    
    console.log("Exit Showcase");
  }
}

/*function repoEnter(s) {
  if(s == 0) {
    //console.log(repos[0].childNodes[7].childNodes[1].innerHTML);
    //repos.find(e => {return e.childNodes[7].childNodes[1].innerHTML === "Tile Grid"});
    repos

    for(let i=0; i<repos.length; i++) {
      let repoTitle = repos[i].childNodes[7].childNodes[1].innerHTML;
      if(repoTitle === "Tile Grid" || repoTitle === "MIT BattleCode 2020" || repoTitle === "RognesCorp Website") {
        repos[i].style.visibility = "visible";
        repos[i].style.top = "90%";
        openRepos.push(repos[i]);
      }
    }
  }
}*/

function repoHide() {
  for(let i=0; i<repos.length; i++) repos[i].style.visibility = "hidden";
  openRepos = [];
  reposIndex = 0;
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
