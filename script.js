

//Computer Play will return either "Rock", 'Paper' or "Scissors"
function computerPlay(){
    let random = Math.floor(Math.random() * choices.length);
    return choices[random];

}

//Whatever user input it should be convert into capital case to make sure case insensitivity
//other option is regex
function toCapitalCase(playerSelection){
    if(playerSelection){
        return playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase();
    }
    
}

//check if playerSelection is valid option

function isValid(userInput){
    return choices.includes(userInput);
}

//function comparison and return the result of each match
function playRound(playerSelection, computerSelection) {
    
    //Whatever user input it should be convert into capital case to make sure case insensitivity
    playerSelection = toCapitalCase(playerSelection);
    
    if(isValid(playerSelection)){
        let pS = playerSelection;
        let cS = computerSelection;
    
        // checking if tie not
        if(pS != cS){
            if(
                //if pS won
                ((pS == "Rock") && (cS == "Scissors")) ||
                ((pS == "Scissors") && (cS == "Paper")) ||
                ((pS == "Paper") && (cS == "Rock"))
                ){

                points.playerScore += 1;
                return `Congratulation! ${pS} beats ${cS}`
            }
            else{
                //if cS won
                points.computerScore += 1;
                return `You Lose! ${cS} beats ${pS}`
            }

        }
        else{
            // if Tie
            return `Tie! Both chosen ${cS}!`
        }

    }
    //if Wrong input
    return "Please Enter Valid Input"
    
}
    
    

//function for count playRound max 5 and return
    //store result of each round
    //Winner at the end

function game(){

    

    let gameOver = false;

    while(!gameOver){
        //user prompt to get input from user
        const playerSelection = prompt(`It's your turn (choices are "Rock", "Paper" and "Scissors")`);
        const computerSelection = computerPlay();
        
        console.log(playRound(playerSelection, computerSelection));

        gameOver = points.playerScore == 5 || points.computerScore == 5;
    }

    //final verdict 
    console.table(points);
    let result = points.playerScore - points.computerScore

    if(result > 0){
        return `Congrats! You won by ${result} points`;
    }else {
        return `You lose by ${Math.abs(result)} points`;
    }
}


//Options "Rock", 'Paper' or "Scissors"
const choices = ['Rock', 'Paper', 'Scissors'];

//const points [player, computer], InitialValue
const points = {
    playerScore:0,
    computerScore:0
};

console.log(game());
