System.register([], function (exports_1, context_1) {
    "use strict";
    var ANIM_TYPE_WRITER_DELAY, ANIM_TYPE_WRITER_FREQ, ANIM_CURSOR_BLINK_FREQ, Typewriter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ANIM_TYPE_WRITER_DELAY = 400;
            ANIM_TYPE_WRITER_FREQ = 50;
            ANIM_CURSOR_BLINK_FREQ = 500;
            Typewriter = class Typewriter {
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
            };
            exports_1("Typewriter", Typewriter);
        }
    };
});
