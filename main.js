// life is easy //
function $_(selector, context) {
    return (context || document).querySelectorAll(selector);
}
function $(selector, context) {
    return (context || document).querySelector(selector);
}
// life is easy //


// Game Start //
function submitForm(e){
    
    e.preventDefault();

    winRoundsNL.forEach(e => gameData.target += e.checked ? +e.value : 0);

    startN.style.opacity = 0;
    startN.style.clipPath = 'circle(0)';

    gameData.userName = userNameN.value || "Default User";
    $('#user h4').innerText = gameData.userName;
    $('.result #user-score-result > p strong').innerText = gameData.userName;


    $('#vs').style.backgroundColor = "";
    $('#vs .count').innerText = 0;


    updateUI();
};


function resetGame(){

    gameData.userName= "",
    gameData.userScore= 0,
    gameData.computerScore= 0,
    gameData.roundNumber= 0,
    gameData.target= 0


    startN.style.opacity = 1;
    startN.style.clipPath = 'circle(100%)';
    $('.result').classList.remove('active');

}

function getResult(){
    if(gameData.target == gameData.computerScore || gameData.target == gameData.userScore){

        $('.result').classList.add('active');
        $('#user-score-result .scoreCount').innerText = gameData.userScore;
        $('#computer-score-result .scoreCount').innerText = gameData.computerScore;

        if(gameData.userScore < gameData.computerScore){
            $('.result h2').innerText= "Better luck next time!";
        }else if(gameData.userScore > gameData.computerScore){
            $('.result h2').innerText= "Congrats! You Win!";
            
        };

    }
};

function getTopper(){
    if(gameData.userScore < gameData.computerScore){
        $('#vs').style.backgroundColor = "red";
        $('#vs .count').innerText = gameData.computerScore;
        
    }else if(gameData.userScore > gameData.computerScore){
        $('#vs').style.backgroundColor = "blue";
        $('#vs .count').innerText = gameData.userScore;
        
    }else{$('#vs').style.backgroundColor = "";}
    
    getResult();
}

function updateUI(text){

    userScore.innerText = gameData.userScore;
    computerScore.innerText = gameData.computerScore;


    $('#user-progress').style.width = gameData.userScore/gameData.target * 100 + '%';
    $('#computer-progress').style.width = gameData.computerScore/gameData.target * 100 + '%';

    setTimeout(resetCurrentPlay, 500)


    if(!text) return;
    getTopper();
    $('.current-play').classList.add('active');
    statusDisplay.innerText = text;
}


function updateScore(userWin, computerWin, winner){
    
    gameData.userScore += userWin ? 1 : 0;
    gameData.computerScore += computerWin ? 1 : 0;
    
    return updateUI(winner)
}

function getComputerSelection(){
    let random = Math.floor(Math.random() * choices.length);

    computerSelection = choices[random];
    $('#computer-play use').setAttribute('xlink:href', computerSelection);

    return computerSelection

}

function getPlayerSelection(e){

    playerSelection = e.target.getAttribute('xlink:href');
    $('#user-play use').setAttribute('xlink:href', playerSelection);

    return playerSelection;


}

function getWinner(e){

    PlayerSelection = getPlayerSelection(e);
    ComputerSelection = getComputerSelection();

    if(PlayerSelection != ComputerSelection){
        if(
            ((PlayerSelection == choices[1]) && (ComputerSelection == choices[2])) ||
            ((PlayerSelection == choices[2]) && (ComputerSelection == choices[0])) ||
            ((PlayerSelection == choices[0]) && (ComputerSelection == choices[1]))
            ){
            return updateScore(true, false, 'You Won!') //Player won

        }else{
            return updateScore(false, true, 'You Lose!') //Computer won
        }
    }else{
        return updateScore(false, false, 'Draw!') //Draw
}}

// Selector //
const formN = $('form');
const userNameN = $('#userName')
const startN = $('.start');
const resetButton = $('#replay');
const roundDisplay = $('#vs .count');
const statusDisplay = $('.current-play .current-result');
const userScore = $('#user-score');
const computerScore = $('#computer-score');



// SelectorAll //
const winRoundsNL = $_('#radioBtn input');
const gameInput = Array.from($_('#next-play use'));

// Initial Define //
const gameData = {
    userName: "",
    userScore: 0,
    computerScore: 0,
    roundNumber: 0,
    target: 0
}

const choices = ['#paper-icon', '#rock-icon', '#scissors-icon'];

// EventListeners //
formN.addEventListener('submit', submitForm);
userNameN.addEventListener('keyup', () => $('#user h4').innerText = userName.value || "User");
gameInput.forEach(e => e.addEventListener('click', getWinner));
resetButton.addEventListener('click', resetGame);


// css not working fine due to different in size and rotation //
gameInput.forEach(e => e.addEventListener('mouseenter', (e) => e.target.parentElement.classList.add("hover")));
gameInput.forEach(e => e.addEventListener('mouseleave', (e) => e.target.parentElement.classList.remove("hover")));


function resetCurrentPlay(){
    statusDisplay.innerText = "Let's Go!";
    $('.current-play').classList.remove('active');
    

}


