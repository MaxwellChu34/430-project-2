const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

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

const Answer = (props) => {
    const [answer, setAnswer] = useState(props.answer);

    useEffect(() => {
        const loadAnswerFromServer = async () => {
            const response = await fetch('/getAnswers');
            const data = await response.json();
            setAnswer(data.answer);
        };
        loadAnswerFromServer();
    }, [props.reloadAnswers]);
    console.log(answer);

    if(answer.length === 0) {
        return (
            <div>
                <h3>Answer 1:</h3>
                <h3>Answer 2:</h3>
                <h3>Answer 3:</h3>
                <h3>Answer 4:</h3>
                <h3>Answer 5:</h3>
            </div>
        );
    }
}

const AnswerRecords = () => {
    const [reloadAnswers, setReloadAnswers] = useState(false);

    return (
        <Answer answer={[]} reloadAnswers={reloadAnswers}/>
    );
};

const handleAnswer = (e, question) => {
    e.preventDefault();

    let radioForm = document.getElementsByName(`q${question}`);
    let checked = false;
    for(let i = 0; i < 10; i++) {
        if(radioForm[i].checked) {
            checked = true;
            helper.handleError(null);
            break;
        }
    }
    if(checked === false) {
        helper.handleError('Please answer this question!');
        return false;
    }

    let selected = document.querySelector(`input[name=q${question}]:checked`);
    let intSelected = parseInt(selected);
    for(let i = 0; i < 10; i++) {
        if(radioForm[i].checked) {
            let answer = radioForm[i].value;
        }
    }

    helper.sendPost(e.target.action, {question, answer, intSelected})
    
    return false;
};

const App = () => {
    return (
        <div>
            <h3>Hey there! This quiz will ask you a few things to 
                see who your favorite member would most likely be 
                in the KPOP group TWICE. Use the navigation bar 
                on the left side of the screen to jump around the 
                quiz. Make sure you click submit on all questions. 
                You can also keep track of what you answered on 
                the right side of the screen. When you're ready 
                and answered everything, you can click the "Results" 
                screen on the left to see who you got. Have fun!</h3>
        </div>
    )
};

const Q1 = () => {
    return (
        <form id="question1" name="q1" onSubmit={(e) => handleAnswer(e, 1)} action="/q1" method="POST" className="quizForm">
            <h3>Question 1: Pick a color</h3>
            <input type="radio" name="q1" id="1" value="Sky Blue"/>
            <label for="1">Sky Blue</label>
            <input type="radio" name="q1" id="2" value="Yellow-Green"/>
            <label for="2">Yellow-Green</label>
            <input type="radio" name="q1" id="3" value="Pink"/>
            <label for="3">Pink</label>
            <input type="radio" name="q1" id="4" value="Purple"/>
            <label for="4">Purple</label>
            <input type="radio" name="q1" id="5" value="Apricot"/>
            <label for="5">Apricot</label>
            <input type="radio" name="q1" id="6" value="Mint"/>
            <label for="6">Mint</label>
            <input type="radio" name="q1" id="7" value="White"/>
            <label for="7">White</label>
            <input type="radio" name="q1" id="8" value="Red"/>
            <label for="8">Red</label>
            <input type="radio" name="q1" id="9" value="Blue"/>
            <label for="9">Blue</label>
            <input className="formSubmit" type="submit" value="SUBMIT" />
        </form>
    )
};

const Q2 = () => {
    return (
        <form id="question2" name="q2" onSubmit={(e) => handleAnswer(e, 2)} action="/q2" method="POST" className="quizForm">
            <h3>Question 2: Pick an animal</h3>
            <input type="radio" name="q2" id="1" value="Bunny"/>
            <label for="1">Bunny</label>
            <input type="radio" name="q2" id="2" value="Dog"/>
            <label for="2">Dog</label>
            <input type="radio" name="q2" id="3" value="Raccoon"/>
            <label for="3">Raccoon</label>
            <input type="radio" name="q2" id="4" value="Hamster"/>
            <label for="4">Hamster</label>
            <input type="radio" name="q2" id="5" value="Owl"/>
            <label for="5">Owl</label>
            <input type="radio" name="q2" id="6" value="Penguin"/>
            <label for="6">Penguin</label>
            <input type="radio" name="q2" id="7" value="Eagle"/>
            <label for="7">Eagle</label>
            <input type="radio" name="q2" id="8" value="Tiger"/>
            <label for="8">Tiger</label>
            <input type="radio" name="q2" id="9" value="Deer"/>
            <label for="9">Deer</label>
            <input className="formSubmit" type="submit" value="SUBMIT" />
        </form>
    )
};

const Q3 = () => {
    return (
        <form id="question3" name="q3" onSubmit={(e) => handleAnswer(e, 3)} action="/q3" method="POST" className="quizForm">
            <h3>Question 3: Pick a number</h3>
            <input type="radio" name="q3" id="1" value="9"/>
            <label for="1">9</label>
            <input type="radio" name="q3" id="2" value="0"/>
            <label for="2">0</label>
            <input type="radio" name="q3" id="3" value="64"/>
            <label for="3">64</label>
            <input type="radio" name="q3" id="4" value="12"/>
            <label for="4">12</label>
            <input type="radio" name="q3" id="5" value="21"/>
            <label for="5">21</label>
            <input type="radio" name="q3" id="6" value="37"/>
            <label for="6">37</label>
            <input type="radio" name="q3" id="7" value="7"/>
            <label for="7">7</label>
            <input type="radio" name="q3" id="8" value="29"/>
            <label for="8">29</label>
            <input type="radio" name="q3" id="9" value="25"/>
            <label for="9">25</label>
            <input className="formSubmit" type="submit" value="SUBMIT" />
        </form>
    )
};

const Q4 = () => {
    return (
        <form id="question4" name="q4" onSubmit={(e) => handleAnswer(e, 4)} action="/q4" method="POST" className="quizForm">
            <h3>Question 4: Pick a superpower</h3>
            <input type="radio" name="q4" id="1" value="Time Manipulation"/>
            <label for="1">Time Manipulation</label>
            <input type="radio" name="q4" id="2" value="Time Freeze"/>
            <label for="2">Time Freeze</label>
            <input type="radio" name="q4" id="3" value="Superspeed"/>
            <label for="3">Superspeed</label>
            <input type="radio" name="q4" id="4" value="Invisibility"/>
            <label for="4">Invisibility</label>
            <input type="radio" name="q4" id="5" value="X-Ray Vision"/>
            <label for="5">X-Ray Vision</label>
            <input type="radio" name="q4" id="6" value="Hypnosis"/>
            <label for="6">Hypnosis</label>
            <input type="radio" name="q4" id="7" value="Self-Replication"/>
            <label for="7">Self-Replication</label>
            <input type="radio" name="q4" id="8" value="Telekinesis"/>
            <label for="8">Telekinesis</label>
            <input type="radio" name="q4" id="9" value="Superstrength"/>
            <label for="9">Superstrength</label>
            <input className="formSubmit" type="submit" value="SUBMIT" />
        </form>
    )
};

const Q5 = () => {
    return (
        <form id="question5" name="q5" onSubmit={(e) => handleAnswer(e, 5)} action="/q5" method="POST" className="quizForm">
            <h3>Question 5: Who do you think you will get?</h3>
            <input type="radio" name="q5" id="1" value="Nayeon"/>
            <label for="1">Nayeon</label>
            <input type="radio" name="q5" id="2" value="Jeongyeon"/>
            <label for="2">Jeongyeon</label>
            <input type="radio" name="q5" id="3" value="Momo"/>
            <label for="3">Momo</label>
            <input type="radio" name="q5" id="4" value="Sana"/>
            <label for="4">Sana</label>
            <input type="radio" name="q5" id="5" value="Jihyo"/>
            <label for="5">Jihyo</label>
            <input type="radio" name="q5" id="6" value="Mina"/>
            <label for="6">Mina</label>
            <input type="radio" name="q5" id="7" value="Dahyun"/>
            <label for="7">Dahyun</label>
            <input type="radio" name="q5" id="8" value="Chaeyoung"/>
            <label for="8">Chaeyoung</label>
            <input type="radio" name="q5" id="9" value="Tzuyu"/>
            <label for="9">Tzuyu</label>
            <input className="formSubmit" type="submit" value="SUBMIT" />
        </form>
    )
};

const Results = () => {
    return (
        <button type="button">SUBMIT QUIZ!</button>
    )
};

const init = () => {
    const homeButton = document.getElementById('homeButton');
    const q1 = document.getElementById('questionI');
    const q2 = document.getElementById('questionII');
    const q3 = document.getElementById('questionIII');
    const q4 = document.getElementById('questionIV');
    const q5 = document.getElementById('questionV');
    const results = document.getElementById('results');

    const root = createRoot(document.getElementById('app'));
    const rootAd = createRoot(document.getElementById('ad'));
    const rootRecord = createRoot(document.getElementById('check'));

    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <App /> );
        rootAd.render( <PlaceholderAd/> );
        return false;
    });

    q1.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <Q1 /> );
        rootAd.render( <PlaceholderAd/> );
    });

    q2.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <Q2 /> );
        rootAd.render( <PlaceholderAd/> );
    });

    q3.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <Q3 /> );
        rootAd.render( <PlaceholderAd/> );
    });

    q4.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <Q4 /> );
        rootAd.render( <PlaceholderAd/> );
    });

    q5.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <Q5 /> );
        rootAd.render( <PlaceholderAd/> );
    });

    results.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <Results /> );
        rootAd.render( <PlaceholderAd/> );
    })

    root.render( <App /> );
    rootAd.render( <PlaceholderAd /> );
    rootRecord.render( <AnswerRecords /> );
}

window.onload = init;