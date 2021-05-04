
const sock = io();

sock.on('message', (text) => {
    console.log(text);
    writeEvent(text);
})

sock.on('usermessage', (text) => {
    console.log(text);
    writeMessage(text);
})

sock.on('score', (score) => {
    writeScore(score);
});


const writeScore = (score) => {
    const scorebox = document.getElementById('scoreboard');
    scorebox.innerHTML = score;
};

const writeEvent = (text) => {
    //ul element
    const parent = document.querySelector('#events')

    //li element
    const el = document.createElement('li')
    el.innerHTML = text;
    el.setAttribute('class', 'events')
    if(document.getElementById('current')){
        document.getElementById('current').removeAttribute('id')
    }
    el.setAttribute('id', 'current');

    parent.appendChild(el);

    document.getElementById('current').scrollIntoView(true);
};

const writeMessage = (text) => {
    //ul element
    const parent = document.querySelector('#events')

    //li element
    const el = document.createElement('li')
    el.innerHTML = text;
    el.setAttribute('class', 'userMessage')
    if(document.getElementById('current')){
        document.getElementById('current').removeAttribute('id')
    }
    el.setAttribute('id', 'current');

    parent.appendChild(el);

    document.getElementById('current').scrollIntoView(true);
};

function send(){
    let input = document.getElementById('message');
    let text = `${username}>> ${input.value}`;
    
    input.value = '';

    sock.emit('usermessage', text)
}

const addButtonListeners = () => {
    ['rock', 'paper', 'scissors'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
            sock.emit('turn', id);
        });
    });
};

document.addEventListener('keypress', (e) => {
    if(e.keyCode === 13){
        send();
    }
})

writeEvent(`Welcome to Rock Paper Scissors`)
addButtonListeners();
