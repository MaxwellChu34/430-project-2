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
};

const handleSignup = (e, onUserAdded) => {
    e.preventDefault();
    
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if(!username || !pass) {
        helper.handleError('Your USERNAME or PASSWORD is empty! Please fill both in to signup!');
        return false;
    }
    if(!pass2) {
        helper.handleError('Please reenter your PASSWORD for verification purposes!');
        return false;
    } 
    if(pass !== pass2) {
        helper.handleError('The PASSWORD did not verify! Please reenter both again!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2}, onUserAdded);

    return false;
};


const handleChange = (e, onPassUpdate) => {
    e.preventDefault();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if(!username) {
        helper.handleError('Please enter your USERNAME!');
        return false;
    }
    if(!pass) {
        helper.handleError('Please enter your CURRENT PASSWORD!');
        return false;
    }
    if(!pass2) {
        helper.handleError('Please enter your NEW PASSWORD!');
        return false;
    }
    if(pass == pass2) {
        helper.handleError('Please put in a different NEW PASSWORD different!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2}, onPassUpdate);

    return false;
};

const handleAdmin = (e) => {
    e.preventDefault();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if(!username) {
        helper.handleError('If you know it, please enter the ADMIN USERNAME! Normal users must login at the "Login" link!');
        return false;
    }
    if(!pass) {
        helper.handleError('If you know it, please enter the ADMIN PASSWORD! Normal users must login at the "Login" link!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass});

    return false;
};

const LoginWindow = () => {
    return (
        <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm">
            <label htmlFor="username">USERNAME: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">PASSWORD: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="LOGIN" />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm" name="signupForm" onSubmit={(e) => handleSignup(e, props.triggerReload)} action="/signup" method="POST" className="mainForm">
            <label htmlFor="username">USERNAME: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">PASSWORD: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass">REENTER PASSWORD: </label>
            <input id="pass2" type="password" name="pass2" placeholder="reenter password" />
            <input className="formSubmit" type="submit" value="SIGN UP" />
        </form>
    );
};

const ChangeWindow = (props) => {
    return (
        <form id="changeForm" name="changeForm" onSubmit={(e) => handleChange(e, props.triggerReload)} action="/change" method="POST" className="mainForm">
            <label htmlFor="username">USERNAME: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">CURRENT PASSWORD: </label>
            <input id="pass" type="password" name="pass" placeholder="current password" />
            <label htmlFor="pass">NEW PASSWORD: </label>
            <input id="pass2" type="password" name="pass2" placeholder="new password" />
            <input className="formSubmit" type="submit" value="CHANGE PASSWORD" />
        </form>
    )
}

const AdminWindow = () => {
    return (
        <form id="adminForm" name="adminForm" onSubmit={handleAdmin} action="/admin" method="POST" className="mainForm">
            <label htmlFor="username">ADMIN USERNAME: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">ADMIN PASSWORD: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="LOGIN" />
        </form>
    );
}

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const changeButton = document.getElementById('changeButton');
    const adminButton = document.getElementById('adminButton');

    const root = createRoot(document.getElementById('content'));
    const rootAd = createRoot(document.getElementById('ad'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <LoginWindow /> );
        rootAd.render( <PlaceholderAd/> );
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <SignupWindow/> );
        rootAd.render( <PlaceholderAd/> );
        return false;
    });

    changeButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <ChangeWindow /> );
        rootAd.render( <PlaceholderAd/> );
        return false;
    });

    adminButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <AdminWindow /> );
        rootAd.render( <PlaceholderAd/> );
        return false;
    })

    root.render( <LoginWindow /> );
    rootAd.render( <PlaceholderAd /> );
};

window.onload = init;