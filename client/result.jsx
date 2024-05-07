const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const {createRoot} = require('react-dom/client');

const PlaceholderAd = () => {
    let ad = Math.floor(Math.random() * 3);
    if(ad === 0) {
        return (
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img id="adimg" src="/assets/img/ad1.png" alt="Placeholder Ad 1"></img></a>
        );
    } else if (ad === 1) {
        return (
            <a href="https://www.youtube.com/watch?v=lJ9Uh9oN_sk"><img id="adimg" src="/assets/img/ad2.png" alt="Placeholder Ad 2"></img></a>
        );
    } else if (ad === 2) {
        return (
            <a href="https://www.youtube.com/watch?v=6VhnU3_-KUY"><img id="adimg" src="/assets/img/ad3.png" alt="Placeholder Ad 3"></img></a>
        );
    }
};

const ResultWindow = () => {

};

const init = () => {
    const root = createRoot(document.getElementById('result'));
    const rootAd = createRoot(document.getElementById('ad'));

    root.render( <ResultWindow /> );
    rootAd.render( <PlaceholderAd /> );
};

window.onload = init;