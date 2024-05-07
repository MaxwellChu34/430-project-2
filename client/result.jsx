const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const {createRoot} = require('react-dom/client');

//PlaceholderAd is a proof of concept profit model that displays a clickable image to a different site
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

//CalcResult determines the mode on server side to see which member the user gets
const CalcResult = (props) => {
    const [result, setResult] = useState(props.result);
    useEffect(() => {
        const loadResultFromServer = async () => {
            const response = await fetch('/getResults');
            const data = await response.json();
            setResult(data);
        };
        loadResultFromServer();
    }, [props.reloadResult]);

    let mode = result.result;
    if(Array.isArray(mode)){
        //mode[0]
        if(mode[0] === 1) {
            return (
                <div>
                    <h3>NAYEON</h3>
                </div>
            )
        } else if(mode[0] === 2) {
            return (
                <div>
                    <h3>JEONGYEON</h3>
                </div>
            )
        } else if(mode[0] === 3) {
            return (
                <div>
                    <h3>MOMO</h3>
                </div>
            )
        } else if(mode[0] === 4) {
            return (
                <div>
                    <h3>SANA</h3>
                </div>
            )
        } else if(mode[0] === 5) {
            return (
                <div>
                    <h3>JIHYO</h3>
                </div>
            )
        } else if(mode[0] === 6) {
            return (
                <div>
                    <h3>MINA</h3>
                </div>
            )
        } else if(mode[0] === 7) {
            return (
                <div>
                    <h3>DAHYUN</h3>
                </div>
            )
        } else if(mode[0] === 8) {
            return (
                <div>
                    <h3>CHAEYOUNG</h3>
                </div>
            )
        } else if(mode[0] === 9) {
            return (
                <div>
                    <h3>TZUYU</h3>
                </div>
            )
        }
    }
}

//ResultWindow displays CalcResult
const ResultWindow = () => {
    const [reloadResult, setReloadResult] = useState(false);

    return (
        <div>
            <CalcResult result={[]} reloadResult={reloadResult} />
        </div>
    )
};

const init = () => {
    const root = createRoot(document.getElementById('result'));
    const rootAd = createRoot(document.getElementById('ad'));

    root.render( <ResultWindow /> );
    rootAd.render( <PlaceholderAd /> );
};

window.onload = init;