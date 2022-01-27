let playerMonster = JSON.parse(sessionStorage.selectedMonster);
console.log(playerMonster)

const enemyHealthBar = document.getElementById("enemy-health");
const playerHealthBar = document.getElementById("player-health");

const attackBtn = document.getElementById("quickAttack");
const strongAttackBtn = document.getElementById("strongAttack");
const healBtn = document.getElementById("potion");

//enemies stats
const enemy1 = {
  "name": "Keeper of souls",
  "image": "enemy1",
  "initialHP": 140,
  "HP": 140,
  "attackValue": 20,
  "dodgeChance": 20
}

const enemy2 = {
  "name": "Necrodragon",
  "image": "enemy2",
  "initialHP": 150,
  "HP": 150,
  "attackValue": 25,
  "dodgeChance": 20
}

//grouping enemies and displaying them in correct order 
Array.prototype.move = function(i) {
  this.current = this.current + i
  return this[this.current];
};

const enemies = [enemy1, enemy2]
enemies.current = 0;

let currentEnemy = enemies[0];

//setting the game: displaying chosen monster
document.getElementById("player-header").innerHTML = `${playerMonster["name"]}`
document.getElementById("player-pic").innerHTML = `<img src="./${playerMonster["img"]}.png">`
document.getElementById("player-monster-name").innerHTML = `${playerMonster["name"]}`
document.getElementById("enemy-pic").innerHTML = `<img src="./${currentEnemy["image"]}.png">`

//initial health
let currentPlayerHP = playerMonster["HP"];
let currentEnemyHP = currentEnemy["HP"];

function adjustHealthBars() {
  enemyHealthBar.max = currentEnemy["initialHP"];
  enemyHealthBar.value = currentEnemyHP;
  playerHealthBar.max = playerMonster["initialHP"];
  playerHealthBar.value = currentPlayerHP;
}

function adjustHPCounter(){
  document.getElementById("current-player-HP").innerHTML = currentPlayerHP
  document.getElementById("current-enemy-HP").innerHTML = currentEnemyHP
  document.getElementById("max-player-HP").innerHTML = playerMonster["initialHP"];
  document.getElementById("max-enemy-HP").innerHTML = currentEnemy["initialHP"];
}

adjustHealthBars();
adjustHPCounter();

//battle log
let battleLog = [];

function logBattle(ev, val) {
  let logEntry = {
    event: ev,
    value: val,
  }
  let message;
  switch (ev) {
    case "PlayerAttack":
      message = `You attacked for ${logEntry.value}` + "<br />"
      break;
    case "StrongAttack":
      message = `You attacked for ${logEntry.value}` + "<br />"
      break;
    case "EnemyAttack":
      message = `Enemy attacked for ${logEntry.value}` + "<br />"
      break;
    case "PlayerHeal":
      message = `You healed for ${logEntry.value}, potions left: ${healNumber}` + "<br />"
      break;
    case "PlayerDodge":
        message = `You dodged the attack` + "<br />"
        break;
    case "EnemyDodge":
      message = `Enemy dodged your attack` + "<br />"
    break;
    case "GameOver":
      message = "Battle ended!"
      break;
  }
  battleLog.unshift(message);
}

function printLog() {
  document.getElementById("log").innerHTML = battleLog.join("")
}

//player & enemy attacks and dodge chance
function playerDodgeChance(){
  let MonsterdodgeChance = playerMonster["dodgeChance"];
  let dodge = Math.floor(Math.random() * 100)
  console.log(dodge)
  console.log(MonsterdodgeChance)
  if (MonsterdodgeChance >= dodge) {
    logBattle("PlayerDodge");
    endRound()
  }
  else{
    enemyTurn()
  }
}

function attackEnemy(mode) {
  let maxDamage;
  let logEvent;
  if(mode === "quickAttack") {
    maxDamage = playerMonster["attackValue"];
    logEvent = "PlayerAttack";
  }
  else if (mode === "strongAttack") {
    maxDamage = playerMonster["strongAttackValue"];
    logEvent = "StrongAttack";
  }
  const damage = dealEnemyDamage(maxDamage)
  currentEnemyHP -= damage;
  logBattle(logEvent, damage);
  playerDodgeChance()
}

function dealEnemyDamage(damage) {
  const dealtDamage = Math.floor(Math.random() * damage) + 1;
  enemyHealthBar.value = +enemyHealthBar.value - dealtDamage;
  return dealtDamage;
}

function enemyDodgeChance(mode) {
  if (mode === "quickAttack") {
    let ignoreDodge = Math.floor(Math.random() * 100)
    if (ignoreDodge <= 50) {
      attackEnemy(mode)
    }
    else {
      calculateEnemyDodge(mode);
    }
  }
  else {
    calculateEnemyDodge(mode);
  }
}

function calculateEnemyDodge(mode) {
  let EnemyDodgeChance = currentEnemy["dodgeChance"];
  let dodge = Math.floor(Math.random() * 100)
  if (EnemyDodgeChance >= dodge) {
    logBattle("EnemyDodge");
    enemyTurn()
  }
  else{
    attackEnemy(mode)
  }
}

function enemyTurn() {
  const playerDamage = dealPlayerDamage(currentEnemy["attackValue"]);
  currentPlayerHP -=playerDamage;
  logBattle("EnemyAttack", playerDamage);
  endRound();
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.floor(Math.random() * damage) + 1;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

attackBtn.addEventListener('click', function(){
  enemyDodgeChance("quickAttack")
});

strongAttackBtn.addEventListener("click", function(){
  enemyDodgeChance("strongAttack")
})

//potion button
const healValue = 15;
let healNumber = 3;

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
  healNumber = healNumber - 1;
}

healBtn.addEventListener("click", function(){
  let potionValue;
  if(currentPlayerHP >= playerMonster["initialHP"] - healValue){
    alert("You can't heal to more than your max initial health");
    potionValue = playerMonster["initialHP"] - currentPlayerHP;
  }
  else if(healNumber <= 0) {
    alert("You already used all your potions!")
  }
  else {
    potionValue = healValue;
  }
  increasePlayerHealth(potionValue);
  currentPlayerHP += potionValue;
  logBattle("PlayerHeal", healValue);
  enemyTurn()
})

//winning conditional
function endRound() {
  adjustHPCounter();
  printLog();
  if (currentEnemyHP <= 0 && currentPlayerHP > 0) {
    alert("You won!")
    document.getElementById("after-battle-won").classList.remove("after")
    document.getElementById("during-battle").classList.add("after")
  }
  else if (currentPlayerHP <=0 && currentEnemyHP > 0) {
    document.getElementById("after-battle-fail").classList.remove("after")
    document.getElementById("during-battle").classList.add("after")
  }
  else if(currentPlayerHP <=0 && currentEnemyHP <= 0) {
    alert("You have a draw!")
    document.getElementById("after-battle-fail").classList.remove("after")
    document.getElementById("during-battle").classList.add("after")
  }
}

document.getElementById("reset").addEventListener("click", reset)
document.getElementById("back-win").addEventListener("click", mainMenu)
document.getElementById("back-fail").addEventListener("click", mainMenu)
document.getElementById("next").addEventListener("click", nextEnemy)

function mainMenu(){
  window.location.href = "./index.html";
}

function reset() {
  currentPlayerHP = playerMonster["initialHP"];
  currentEnemyHP = currentEnemy["initialHP"];
  adjustHPCounter();
  adjustHealthBars();
  battleLog.length = 0;
  healNumber = 3;
  document.getElementById("during-battle").classList.remove("after")
  document.getElementById("after-battle-fail").classList.add("after")
  document.getElementById("log").innerHTML = ``;
}

function nextEnemy() {
  if(enemies.current === enemies.length - 1) {
    window.location.href = "./final_screen.html";
  }
  else{
    reset();
    currentEnemy = enemies.move(1)
    document.getElementById("enemy-pic").innerHTML = `<img src="./${currentEnemy["image"]}.png">`
    document.getElementById("enemy-name").innerHTML = currentEnemy["name"]
    document.getElementById("enemy-monster-name").innerHTML = currentEnemy["name"]
    document.getElementById("after-battle-won").classList.add("after")
    console.log(currentEnemy);
  }
}
