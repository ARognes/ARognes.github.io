/**
 * @author Austin Rognes
 * @startdate 2/4/2020
*/

// Repositories to load initially in showcase
const BEST_REPO_NAMES = ['TileGrid', 'RognesCorp', 'BioFun'];

// Resize bio to align with canvas
document.getElementById('bio').style.height = window.innerHeight - 140 + 'px';

// Check if viewing on mobile device
let isMobile = false;

// Device detection retrieved from: https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device/3540295#3540295
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

// Get context and add input listeners
var canvas = document.getElementById('bio__anim'), ctx = canvas.getContext('2d');
let dpx = window.devicePixelRatio || 1;
ctx.scale(dpx, dpx);
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

// Updated with draw()
let now = Date.now();

// Background bubble
let bubble = {left: 220, right: 220, height: 140, scale: 0};

// RequestAnimationFrame adjustment to work on multiple browsers
window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

function draw() {
  let deltaTime = Date.now() - now;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (bubble.scale < 1) bubble.scale += deltaTime / 10000 * (1.02 - bubble.scale);
  bubble.left = bubble.right = Math.min(220 * bubble.scale + Math.sin(now / 100), 221);
  bubble.height = Math.min(140 * bubble.scale + Math.cos(now / 100), 141);

  // Title bubble
  ctx.fillStyle = '#272822';
  ctx.beginPath();
  ctx.bezierCurveTo(w / 2 - bubble.left, 0, w / 2 - 7 * bubble.left / 8, bubble.height, w / 2, bubble.height);
  ctx.bezierCurveTo(w / 2, bubble.height, w / 2 + 7 * bubble.right / 8, bubble.height, w / 2 + bubble.right, 0);
  ctx.fill();

  // Bio bottom bubble
  ctx.rect(0, h - bubble.height / 2 * canvas.width / 800 + 1, w, bubble.height / 2 * canvas.width / 800 + 1);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.bezierCurveTo(0, h - bubble.height / 2 * canvas.width / 800, w / 4, h, w / 2, h);
  ctx.bezierCurveTo(w / 2, h, 3 * w / 4 , h, w, h - bubble.height / 2 * canvas.width / 800);
  ctx.fill();

  if (bubble.scale < 1) requestAnimFrame(draw);
}
draw(); // Not IIFE as resizing canvas would not have access to draw()

// Resize the canvas to fill browser window dynamically
window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  document.getElementById('bio').style.height = window.innerHeight - 140 + 'px';
  requestAnimFrame(draw);
}, false);

// Typewriter initializes by saving title text in typewriterTemp
let typewriterElem = [document.getElementById('title').childNodes[1], 
                      document.getElementById('title').childNodes[3]];
let typewriterTemp = [];
for (let i = 0; i < typewriterElem.length; i++) {
  typewriterTemp[i] = typewriterElem[i].innerHTML;
  typewriterElem[i].innerHTML = null;
}


function animTypeWriter(blinkerIndex) {

    // End of line
    if (typewriterElem[blinkerIndex].innerHTML.length >= typewriterTemp[blinkerIndex].length) {
      blinkerIndex++;

      // Finished all lines
      if (blinkerIndex === 2) {
        typewriterElem[1].innerHTML = typewriterTemp[1];
        blinkCursor();
        return;
      }
    }
    
    let next = typewriterElem[blinkerIndex].innerHTML.length;

    // Treat html tag as a single character (expecting <a></a>)
    if (typewriterTemp[blinkerIndex][next] === '<') {
      // Find 2 greater-than signs
      while(typewriterTemp[blinkerIndex][next] !== '>') next++;
      do next++;  // A rare 'do while' loop grazing in its natural habitat
      while(typewriterTemp[blinkerIndex][next] !== '>');
    } else while (typewriterTemp[blinkerIndex][next + 1] === " ") next++;
    
    typewriterElem[blinkerIndex].innerHTML = typewriterTemp[blinkerIndex].substr(0, next);
    if (typewriterElem[blinkerIndex].innerHTML.length < typewriterTemp[blinkerIndex].length) 
      typewriterElem[blinkerIndex].innerHTML += "|";

  setTimeout(() => {animTypeWriter(blinkerIndex)}, 40);
}

setTimeout(() => {animTypeWriter(0)}, 400);

function blinkCursor() {
  let cursor = typewriterElem[1];
  if (cursor.innerHTML[cursor.innerHTML.length - 1] !== '|') {
    cursor.innerHTML += '|';
    cursor.style.left = '8.3px';
  }
  else {
    cursor.innerHTML = typewriterTemp[1];
    cursor.style.left = '0';
  }

  setTimeout(blinkCursor, 500);
}

let languages = document.getElementById('showcase__languages__bar');
// TODO: also color the languageIcons here
// Set repos to visible through transition

// Repository language bar stick to top / move freely toggle
let observer = new IntersectionObserver(function(entries) {
	if (entries[0].intersectionRatio === 0 && entries[0].boundingClientRect.top <= 0) {
    languages.classList.add('showcase__languages__sticky');
  } else if (entries[0].intersectionRatio === 1)
    languages.classList.remove('showcase__languages__sticky');
}, { threshold: [0,1] });

observer.observe(document.querySelector('#showcase__languages__top'));

// Retrieved from: https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
// var getJSON = function(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.responseType = 'json';
//   xhr.onload = function() {
//     var status = xhr.status;
//     if (status === 200) {
//       callback(null, xhr.response);
//     } else {
//       callback(status, xhr.response);
//     }
//   };
//   xhr.send();
// };
// 
// // Parse information from all of my repositories, uses 1 github api call
// var repos = [];
// var repositories_elem = document.getElementById('repositories');
// // TODO: if no internet connection, display error image/message and don't bother with github api
// getJSON('https://api.github.com/users/ARognes/repos', function(err, data) {
//   if (err !== null) console.error(err);
//   else {
//     for (repo of data) {
//       var condensed_repo = {name: repo['name'], desc: repo['description'], url: repo['html_url'], created: repo['created_at'], 
//                             updated: repo['updated_at'], stars: repo['stargazers_count'], content_url: repo['url'] + '/content/',
//                             showcase: ''/*, langs_url: repo['languages_url']*/};
// 
//       // Initially only load best repos
//       for (name of BEST_REPO_NAMES) {
//         if (condensed_repo.name === name) displayRepo(condensed_repo);
//       }
// 
//       repos.push(condensed_repo);
//     }
// 
//     // Save repos as cookie / to cache for 24 hours to prevent continual github api use
//   }
// });
// 
// // Ensures repo is fully loaded and writes repo to HTML
// function displayRepo(repo) {
//   if (repo.showcase === '') {
//     getJSON(repo.content_url + '/contents/', function(err, data) {
//       if (err !== null) console.error(err);
//       else for (file of data) {
//         if (file['name'].substr(0, 8) === 'showcase') {
//           repo.showcase = file['download_url'];
//           writeRepoToHTML(repo);
//         }
//       }
//     });
//   }
//   else writeRepoToHTML(repo);
// }

// Load in repository information from saved_repos.json
//const repos = './saved_repos.json'

// Adds repo to the repositories_elem in HTML format
let repositories_elem = document.getElementById('repositories');
function writeRepoToHTML(repo) {
  repositories_elem.innerHTML += '<div class="repo"><img src=' + repo.showcase + ' align="middle" class="showcase__graphic">'
  + '<a href=' + repo.name + ' target="_blank" class="showcase__link");"></a>'
  + '<a href=' + repo.url + ' target="_blank" class="showcase__link"></a></div>';
}

function queryRepos(lang) {
  for (repo of repos) {
    //if (repo.langs.find(r => r.))
    /*if (lang === a lang in repo) {
      writeRepoToHTML(repo);
    }*/
  }
}

// Currently unused
function shakeLinks(elem) {
  shakeLinksTime(elem.parentElement.children[1], elem.parentElement.children[2], 0);
}

function shakeLinksTime(link1, link2, t) {
  if(link1.nodeName === 'A') link1.style.transform = "rotate(" + -Math.sin(t / 10) * 20 + "deg)";
  if(link2.nodeName === 'A') link2.style.transform = "rotate(" + Math.sin(t / 10) * 20 + "deg)";
  t++;
  if (t < 95) setTimeout(shakeLinksTime, 5, link1, link2, t);
}