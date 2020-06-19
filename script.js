const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const levelBoard = document.querySelector('.level');
const goalBoard = document.querySelector('.goal');
const moles = document.querySelectorAll('.mole');
const button = document.getElementById('button');
let lastHole;
let timeUp=false;
let score=0;
let maxTime = 1000;
let minTime =700;
let gameTime = 10000;
let levelUpScore=Math.round(gameTime/1000)-1;
goalBoard.textContent = levelUpScore;
const hardenLevelBy = 0.1;
let level = 0;

function randomTime(min,max){
  return Math.round(Math.random() * (max-min)+min);
}

function randomHole(holes){
  const idx= Math.floor(Math.random()*holes.length);
  const hole=holes[idx];
  if(hole===lastHole)
    return randomHole(holes);

  lastHole=hole;
  return hole;
}

function peep(){
  const time= randomTime(minTime,maxTime);
  const hole= randomHole(holes);

  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) peep();
  },time);
}

function startGame(){
  button.disabled = true;
  scoreBoard.textContent=0;
  score=0;
  timeUp=false;
  peep();
  setTimeout(() => {
    timeUp=true;
    if(score >= levelUpScore){
      levelUp();
    }
    button.disabled = false;
  },gameTime);
}

function levelUp() {
    alert('Woohoo!! Next Level');
    maxTime *= (1 - hardenLevelBy);
    minTime *= (1 - hardenLevelBy);
    level++;
    if (levelUpScore > 2) levelUpScore--;
    levelBoard.textContent = level;
    goalBoard.textContent = levelUpScore;
}

function bonk(e){
  if(!e.isTrusted) return;

  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent=score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
