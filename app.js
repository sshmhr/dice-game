/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score,roundScore,activePlayer,dice;

function clear(){
    
    document.querySelector("#name-1").textContent = "Player - 2";
    document.querySelector("#name-0").textContent = "Player - 1";
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
    document.querySelector("#score-0").textContent = 0;
    document.querySelector("#score-1").textContent = 0;
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
}

function initialise(){
    clear();
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector(".dice").style.display = "none";
}

initialise();

function setRoundScore(score) {
    document.querySelector("#current-" + activePlayer).textContent =score;
}

function toggleActive(){
    // remove this line if you want to see 1 that stays
    document.querySelector(".dice").style.display = "none";
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}

document.querySelector(".btn-roll").addEventListener("click",function(){
    if(score[0]<100 && score[1]<100){
        dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector(".dice").style.display = "block";
        document.querySelector(".dice").src = "dice-"+dice+".png";
        if(dice!=1){
            roundScore=roundScore+dice;
            setRoundScore(roundScore);
        }else{
            roundScore=0;
            setRoundScore(0);
            toggleActive();
        }
    } else if (score[0] > 100) {
        document.querySelector("#name-0").textContent = "WINNER!";
        document.querySelector(".player-0-panel").classList.remove("active");
        document.querySelector(".player-0-panel").classList.add("winner");
    } else {
        document.querySelector("#name-1").textContent = "WINNER!";
        document.querySelector(".player-0-panel").classList.remove("active");
        document.querySelector(".player-0-panel").add("winner");
    }   
});

document.querySelector(".btn-hold").addEventListener("click",function(){
    document.querySelector(".dice").style.display = "none";
    if(score[0]<100&&score[1]<100){
        score[activePlayer]=score[activePlayer] + roundScore ;
        document.querySelector("#score-"+activePlayer).textContent = score[activePlayer]; 
        roundScore = 0;
        setRoundScore(roundScore);
        toggleActive();
    }
    else if (score[0]>100) {
        document.querySelector("#name-0").textContent="WINNER!";     
        document.querySelector(".player-0-panel").classList.remove("active"); 
        document.querySelector(".player-0-panel").classList.add("winner"); 
    }else{
        document.querySelector("#name-1").textContent = "WINNER!"; 
        document.querySelector(".player-0-panel").classList.remove("active");              
        document.querySelector(".player-0-panel").add("winner");              
    }   
});

document.querySelector(".btn-new").addEventListener("click",initialise);