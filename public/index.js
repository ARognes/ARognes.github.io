"use strict";
const header = document.getElementById('header');
const bio = document.getElementById('bio');
const canvas = document.getElementById('bio__anim');
const ctx = canvas.getContext('2d');
const dpx = window.devicePixelRatio || 1;
ctx.scale(dpx, dpx);
const ANIM_TYPE_WRITER_DELAY = 400;
const ANIM_TYPE_WRITER_FREQ = 50;
const ANIM_CURSOR_BLINK_FREQ = 500;
// Check if viewing on mobile device
// Device detection retrieved from: https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device/3540295#3540295
const isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))
    ? true : false;
// Updated with draw()
let now = Date.now();
// Background bubble
const BUBBLE_FULL = { left: 220, right: 220, height: 140 };
const bubble = { left: 0, right: 0, height: 0, scale: 0 };
// RequestAnimationFrame adjustment to work on multiple browsers
window.requestAnimFrame = (callback) => window.requestAnimationFrame(callback) ||
    window.webkitRequestAnimationFrame(callback) ||
    window.mozRequestAnimationFrame(callback) ||
    window.setTimeout(callback, 1000 / 60);
let w = 0, h = 0;
resize();
function draw() {
    let deltaTime = Date.now() - now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bubble.scale < 1)
        bubble.scale += deltaTime / 10000 * (1.001 - bubble.scale);
    bubble.left = Math.min(BUBBLE_FULL.left * bubble.scale + Math.sin(now / 100), BUBBLE_FULL.left + 1);
    bubble.right = Math.min(BUBBLE_FULL.right * bubble.scale + Math.sin(now / 100), BUBBLE_FULL.right + 1);
    bubble.height = Math.min(BUBBLE_FULL.height * bubble.scale + Math.cos(now / 100), BUBBLE_FULL.height + 1);
    // Header bubble
    ctx.fillStyle = '#272822';
    ctx.beginPath();
    ctx.bezierCurveTo(w / 2 - bubble.left, 0, w / 2 - 7 * bubble.left / 8, bubble.height, w / 2, bubble.height);
    ctx.bezierCurveTo(w / 2, bubble.height, w / 2 + 7 * bubble.right / 8, bubble.height, w / 2 + bubble.right, 0);
    ctx.fill();
    // Bio bottom bubble
    const bubbleBottomHeight = bubble.height / 2 * canvas.width / 800;
    const offsetHeight = bubble.scale * (h - header.clientHeight - bio.clientHeight);
    ctx.beginPath();
    ctx.moveTo(0, h + 2);
    ctx.lineTo(0, h - bubbleBottomHeight - offsetHeight);
    ctx.bezierCurveTo(0, h - bubbleBottomHeight - offsetHeight, w / 4, h - offsetHeight, w / 2, h - offsetHeight);
    ctx.bezierCurveTo(w / 2, h - offsetHeight, 3 * w / 4, h - offsetHeight, w, h - bubbleBottomHeight - offsetHeight);
    ctx.lineTo(w, h + 2);
    ctx.fill();
    if (bubble.scale < 1)
        window.requestAnimFrame(draw);
}
draw(); // Not IIFE as resizing canvas would not have access to draw()
// Resize the canvas to fill browser window dynamically
window.addEventListener('resize', resize, false);
window.addEventListener('focus', () => window.requestAnimFrame(draw), false);
function resize() {
    w = canvas.width = bio.clientWidth;
    h = canvas.height = isMobile ? window.outerHeight : window.innerHeight;
    window.requestAnimFrame(draw);
}
class Typewriter {
    constructor(rows) {
        this.rowsTemp = [];
        this.rows = rows;
        for (let i = 0; i < this.rows.length; i++) {
            this.rowsTemp.push(this.rows[i].innerHTML);
            this.rows[i].innerHTML = '';
        }
    }
    start() {
        setTimeout(() => { this.animTypeWriter(0, 0); }, ANIM_TYPE_WRITER_DELAY);
    }
    animTypeWriter(row, index) {
        // End of line
        if (this.rows[row].innerHTML.length >= this.rowsTemp[row].length) {
            row++;
            index = 0;
            // Finished all lines
            if (row >= 2) {
                this.rows[1].innerHTML = this.rowsTemp[1];
                this.blinkCursor();
                return;
            }
        }
        // Treat html tag as a single character (expecting <a></a>)
        if (this.rowsTemp[row][index] === '<') {
            // Find 2 greater-than signs
            while (this.rowsTemp[row][index] !== '>')
                index++;
            do
                index++; // A rare 'do while' loop grazing in its natural habitat
            while (this.rowsTemp[row][index] !== '>');
        }
        else
            while (this.rowsTemp[row][index + 1] === ' ')
                index++;
        this.rows[row].innerHTML = this.rowsTemp[row].substring(0, index);
        if (this.rows[row].innerHTML.length < this.rowsTemp[row].length)
            this.rows[row].innerHTML += '|';
        setTimeout(() => this.animTypeWriter(row, index + 1), ANIM_TYPE_WRITER_FREQ);
    }
    blinkCursor() {
        const cursor = this.rows[1];
        if (cursor.innerHTML[cursor.innerHTML.length - 1] !== '|')
            cursor.innerHTML += '|';
        else
            cursor.innerHTML = this.rowsTemp[1];
        setTimeout(() => this.blinkCursor(), ANIM_CURSOR_BLINK_FREQ);
    }
}
// Typewriter initializes by saving header text in typewriterTemp
// and then clearing out the visible text in typewriterElems
const header__line1 = document.getElementById('header__line1');
const header__line2 = document.getElementById('header__line2');
const rows = [header__line1, header__line2];
new Typewriter(rows).start();
