"use strict";

window.addEventListener('DOMContentLoaded', () => {
   
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        forms = require('./modules/forms'),
        sliders = require('./modules/sliders'),
        cards = require('./modules/cards'),
        timer = require('./modules/timer'),
        calc = require('./modules/calc');

    tabs();
    modal();
    forms();
    sliders();
    cards();
    timer();
    calc();
});

