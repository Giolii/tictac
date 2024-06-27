
//Board Object
const gameboard = (function(){
  board = ['','','','','','','','','',];
  winners = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
  ];
  const squares = document.querySelectorAll('.square');

  const markSquare = (i,marker)=>{
    board[i] = marker
  };
  const resetBoard = function(){
    board = ['','','','','','','','','',];
  }

  const display = ()=>{
    squares.forEach((square,i) => {
    square.innerHTML = board[i];
  });
  }
  return {display,squares,markSquare,winners,resetBoard};
})()

//Players
function addPlayer(name,marker){
  let moves = [];
  const clickSquare = function(i){
    if(i !== undefined){
    gameboard.markSquare(i,marker);
    moves.push(i)
    console.log(`${name} push ${i}`)
    myGame.whoWin(gameboard.winners,moves,name);
      }}
  const resetMoves = function(){
    moves = []
  }
  let timesWinner = 0;
  const winGame = function(){
    timesWinner++;
  }
  const showWin = function(){
    return timesWinner;
  }
    return{name,marker,clickSquare,moves,resetMoves,winGame,showWin}
}
//Game Logic
function game(){
  const player1box = document.querySelector('.player1')
  const player2box = document.querySelector('.player2')
  const resetButton = document.querySelector('.reset');
  let moves = 0;
  let player1,player2;
  // let p1 = '';
  // let p2 = '';

  // const player1 = addPlayer(p1,'X');
  // const player2 = addPlayer(p2,'O');

  const askPlayers = function(){
    const p1 = prompt("Player 1 name:").trim().toUpperCase();
    const p2 = prompt("Player 2 name:").trim().toUpperCase();
    if (!p1 || !p2){
      alert("You need to add the player's name");
      askPlayers()
    } else { 
      declarePlayers(p1,p2);}
  }

  const declarePlayers = function(p1,p2){
       player1 = addPlayer(p1,'X');
       player2 = addPlayer(p2,'O');
      return {player1,player2}
     };


  const showScore = function(){
    player1box.innerText = `${player1.name} SCORE: ${player1.showWin()}`;
    player2box.innerText = `${player2.name} SCORE: ${player2.showWin()} `;
  }
  const start = function(){
    askPlayers();
    showScore();
    whoPlay();
    reset();

  }
  
  const whoPlay = function(){
    //Send players mark and index to change
    gameboard.squares.forEach((square,index)=>{
      square.addEventListener('click',()=>{
    if((moves % 2 == 0)&&(square.innerHTML === '')){
      moves++;
      player1.clickSquare(index);
    } else if((moves %2 !== 0)&&(square.innerHTML === ''))  {
      moves++;
      player2.clickSquare(index);
    }
    gameboard.display();
  })})
  }
  const compareArrays = function(subArray,mainArray){
    return subArray.every(elem => mainArray.includes(elem));
  };
  const arrayOfArrays = function(arrArr,arr){
    for (let i = 0; i < arrArr.length; i++) {
      if(compareArrays(arrArr[i],arr)){
        console.log('WIN');
        return true;
      }
    }
  }
  
  const whoWin = function(one,two,name){
    if(arrayOfArrays(one,two)){
      console.log(`name:${name}`);
      resetButton.innerText = `${name} WIN!`;
      (name === player1.name) ? player1.winGame() :player2.winGame();
      showScore();
      console.log(player1.showWin(),player2.showWin())
      // player1box.innerText = `${p1} SCORE: ${player1.showWin()}`;
      // player2box.innerText = `${p2} SCORE: ${player2.showWin()} `;
      gameboard.squares.forEach((div) => {
      div.style.pointerEvents = 'none';
      })
    } else {
      draw();
    }
  }
  const resetCountMoves = function(){
    moves = 0;
  }

  const reset = function(){
    resetButton.addEventListener('click',()=>{
      gameboard.resetBoard();
      gameboard.squares.forEach((div) => {
      div.style.pointerEvents = 'auto';
    })
    player1.resetMoves();
    player2.resetMoves();
    gameboard.display();
    resetCountMoves();
    resetButton.innerText = `RESET`;
    })
  }

  const draw = function(){
    if((moves === 9)){
      console.log("DRAW")
      resetButton.innerText = `DRAW!`;
      gameboard.squares.forEach((div) => {
        div.style.pointerEvents = 'none';
      })
    }
  }
  return{whoPlay,whoWin,resetCountMoves,start
  }}
const myGame = game();
myGame.start()