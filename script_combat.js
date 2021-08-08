let playerMonster = JSON.parse(sessionStorage.selectedMonster);
console.log(playerMonster)

const enemyHealthBar = document.getElementById('enemy-health');
const playerHealthBar = document.getElementById('player-health');

const attackBtn = document.getElementById('quickAttack');
const strongAttackBtn = document.getElementById('strongAttack');
const healBtn = document.getElementById('potion');

//enemies stats
let enemy1 = {
  "image": "enemy1",
  "initialHP": 140,
  "HP": 140,
  "attackValue": 25
}

let enemy2 = {
"image": "enemy2",
"initialHP": 150,
"HP": 150,
"attackValue": 20
}

//setting the game: displaying chosen monster
document.getElementById("player-header").innerHTML = `${playerMonster["name"]}`
document.getElementById("player-pic").innerHTML = `<img src="./${playerMonster["img"]}.png">`
document.getElementById("player-monster-name").innerHTML = `${playerMonster["name"]}`
document.getElementById("enemy-pic").innerHTML = `<img src="./enemy1.png">`

//initial health
function adjustHealthBars() {
  enemyHealthBar.max = enemy1["initialHP"];
  enemyHealthBar.value = enemy1["HP"];
  playerHealthBar.max = playerMonster["initialHP"];
  playerHealthBar.value = playerMonster["HP"];
}

adjustHealthBars();

//reset button
function resetGame(monsterValue, enemyValue) {
  playerHealthBar.value = playerMonster["initialHP"];
  enemyHealthBar.value = enemy1["initialHP"];
}

//winning conditional
function endRound() {
  const playerDamage = dealPlayerDamage(enemy1["attackValue"]);
  playerMonster["HP"] -=playerDamage;
  logBattle(logEventEnemyAttack, playerDamage);
  printLog();
  if (enemy1["HP"] <= 0 && playerMonster["HP"] > 0) {
    alert("You won!")
    showButtons();
  }
  else if (playerMonster["HP"] <=0 && enemy1["HP"] > 0) {
    alert("You lost!")
    showButtons();
  }
  else if(playerMonster["HP"] <=0 && enemy1["HP"] <= 0) {
    alert("You have a draw!")
    showButtons();
  }
}

//battle log

const logEventPlayerAttack = "PLAYER_ATTACK";
const logEventStrongAttack = "PLAYER_STRONG_ATTACK";
const logEventEnemyAttack = "ENEMY_ATTACK";
const logEventPlayerHeal = "PLAYER_HEAL";
const logEventGameOver = "GAME_OVER";

let battleLog = [];

function logBattle(ev, val) {
  let logEntry = {
    event: ev,
    value: val,
  }
  switch (ev) {
    case logEventPlayerAttack:
      logEntry;
      break;
    case logEventStrongAttack:
      logEntry;
      break;
    case logEventEnemyAttack:
      logEntry;
      break;
    case logEventPlayerHeal:
      logEntry;
      break;
    case logEventGameOver:
      logEntry;
      break;
  }
  battleLog.push(logEntry);
}

function printLog() {
  for (const i of battleLog) {
    console.log(i)
  }
}


//player & enemy attacks
function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  enemyHealthBar.value = +enemyHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

const modeAttack = "quickAttack"
const modeStrongAttack = "strongAttack"

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if(mode === modeAttack) {
    maxDamage = playerMonster["attackValue"];
    logEvent = logEventPlayerAttack;
  }
  else if (mode === modeStrongAttack) {
    maxDamage = playerMonster["strongAttackValue"];
    logEvent = logEventStrongAttack;
  }
  const damage = dealMonsterDamage(maxDamage)
  enemy1["HP"] -= damage;
  logBattle(logEvent, damage);
  console.log(logEvent)
  endRound();
}

attackBtn.addEventListener('click', function(){
  attackMonster("quickAttack")
});

strongAttackBtn.addEventListener("click", function(){
  attackMonster("strongAttack")
})

//dodge chance


//potion button
const healValue = 15;

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
  dealPlayerDamage();
}

healBtn.addEventListener("click", function(){
  let potionValue;
  if(playerMonster["HP"] >= playerMonster["initialHP"] - healValue){
    alert("You can't heal to more than your max initial health");
    potionValue = playerMonster["initialHP"] - playerMonster["HP"];
  }
  else {
    potionValue = healValue;
  }
  increasePlayerHealth(potionValue);
  playerMonster["HP"] += potionValue;
  logBattle(logEventPlayerHeal, healValue);
  endRound();
})

//reset button
function reset() {
  playerMonster["HP"] = playerMonster["initialHP"]
  enemy1["HP"] = enemy1["initialHP"]
  resetGame(playerMonster["initialHP"], enemy1["initialHP"]);
  document.getElementById("during-battle").classList.remove("after")
  document.getElementById("after-battle-fail").classList.add("after")
}

//buttons after battle

function showButtons() {
  if (enemy1["HP"] <= 0 && playerMonster["HP"] > 0) {
    document.getElementById("after-battle-won").classList.remove("after")
    document.getElementById("during-battle").classList.add("after")
  }
  else if (playerMonster["HP"] <=0 && enemy1["HP"] > 0) {
    document.getElementById("after-battle-fail").classList.remove("after")
    document.getElementById("during-battle").classList.add("after")
  }
  else if(playerMonster["HP"] <=0 && enemy1["HP"] <= 0) {
    document.getElementById("after-battle-fail").classList.remove("after")
    document.getElementById("during-battle").classList.add("after")
  }
}

document.getElementById("reset").addEventListener("click", reset)
document.getElementById("back-win").addEventListener("click", mainMenu)
document.getElementById("back-fail").addEventListener("click", mainMenu)

function mainMenu(){
  window.location.href = "./index.html";
}