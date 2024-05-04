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

const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if(!username || !pass) {
        helper.handleError('Your USERNAME or PASSWORD is empty! Please fill both in or signup to create a new account!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass});
    return false; 
}

const LoginWindow = () => {
    return (
        <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm">
            <label htmlFor="username">USERNAME: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">PASSWORD: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="Log in" />
        </form>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('content'));
    const rootAd = createRoot(document.getElementById('ad'));

    root.render( <LoginWindow /> );
    rootAd.render( <PlaceholderAd /> );
}

window.onload = init;