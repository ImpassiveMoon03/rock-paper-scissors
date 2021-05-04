<!DOCTYPE html>
<html>
    <head>
        <title>ROCK! PAPER! SCISSORS! SHOOT!</title>
        <link rel="icon" href="./resources/images/scissors.png">
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <marquee id="header">Rock! Paper! Scissors! Shoot!</marquee>
        <div id="mainContent">
            <img id="rock" src="./resources/images/rock.png" height="100px" style="position: absolute; top: 300px;">
            <p class="label" id="rockLabel" style="position: absolute; top: 425px;">ROCK</p>
            <img id="paper" src="./resources/images/paper.png" height="100px" style="position: absolute; top: 300px;">
            <p class="label" id="paperLabel" style="position: absolute; top: 425px;">PAPER</p>
            <img id="scissors" src="./resources/images/scissors.png" height="100px" style="position: absolute; top: 300px;">
            <p class="label" id="scissorsLabel" style="position: absolute; top: 425px;">SCISSORS</p>

            <div id="scoreboard">0</div>
            <div id="eventlog">
                <ul id="events">

                </ul>
            </div>
            <input id="message" style="color: #292929; background-color: cyan" placeholder="Message">
            <button onclick="send()" id="send">Send</button>

            <script>
                window.addEventListener('load', () => {
                    let rock = document.getElementById('rock');
                    let paper = document.getElementById('paper');
                    let scissors = document.getElementById('scissors');

                    let rockLabel = document.getElementById('rockLabel');
                    let paperLabel = document.getElementById('paperLabel');
                    let scissorsLabel = document.getElementById('scissorsLabel');

                    rock.style.left = (window.innerWidth/4) - (rock.clientWidth/2)+'px'
                    paper.style.left = (window.innerWidth/2) - (paper.clientWidth/2)+'px'
                    scissors.style.left = ((window.innerWidth/4)*3) - (scissors.clientWidth/2)+'px'

                    rockLabel.style.left = (window.innerWidth/4) - (rockLabel.clientWidth/2)+'px'
                    paperLabel.style.left = (window.innerWidth/2) - (paperLabel.clientWidth/2)+'px'
                    scissorsLabel.style.left = ((window.innerWidth/4)*3) - (scissorsLabel.clientWidth/2)+'px'
                })

                window.addEventListener('resize', () => {
                    let rock = document.getElementById('rock');
                    let paper = document.getElementById('paper');
                    let scissors = document.getElementById('scissors');

                    let rockLabel = document.getElementById('rockLabel');
                    let paperLabel = document.getElementById('paperLabel');
                    let scissorsLabel = document.getElementById('scissorsLabel');

                    rock.style.left = (window.innerWidth/4) - (rock.clientWidth/2)+'px'
                    paper.style.left = (window.innerWidth/2) - (paper.clientWidth/2)+'px'
                    scissors.style.left = ((window.innerWidth/4)*3) - (scissors.clientWidth/2)+'px'

                    rockLabel.style.left = (window.innerWidth/4) - (rockLabel.clientWidth/2)+'px'
                    paperLabel.style.left = (window.innerWidth/2) - (paperLabel.clientWidth/2)+'px'
                    scissorsLabel.style.left = ((window.innerWidth/4)*3) - (scissorsLabel.clientWidth/2)+'px'
                })

                const username = prompt('Enter a username') || "Anon"

                document.getElementById('message').setAttribute('placeholder', `Message as ${username}`);
            </script>
        </div>
        <script src="/socket.io/socket.io.js"></script>
        <script src="js/client.js"></script>
    </body>
</html>
