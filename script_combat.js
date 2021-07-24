const selectedMonster = sessionStorage.getItem("playerMonster");

const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');

const attackBtn = document.getElementById('quickAttack');
const strongAttackBtn = document.getElementById('strongAttack');
const healBtn = document.getElementById('potion');
const logBtn = document.getElementById('log-btn');

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

const healValue = 15;

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(monsterValue, enemyValue) {
  playerHealthBar.value = monsterValue;
  monsterHealthBar.value = enemyValue;
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}

//enemies stats
let enemy1 = {
    "initialHP": 120,
    "HP": 120,
    "attackValue": 15
}
let enemy2 = {
  "HP": 150,
  "attackValue": 20
}

adjustHealthBars(monster1["HP"]);

//winning conditional
function endRound() {
  const playerDamage = dealPlayerDamage(enemy1["attackValue"]);
  monster1["HP"] -=playerDamage;
  if (enemy1["HP"] <= 0 && monster1["HP"] > 0) {
    alert("You won!")
    reset();
  }
  else if (monster1["HP"] <=0 && enemy1["HP"] > 0) {
    alert("You lost!")
    reset();
  }
  else if(monster1["HP"] <=0 && enemy1["HP"] <= 0) {
    alert("You have a draw!")
    reset();
  }
}

//attacks event listeners
const modeAttack = "attack"

const modeStrongAttack = "strong attack"

function attackMonster(mode) {
  let maxDamage;
  if(mode === modeAttack) {
    maxDamage = monster1["attackValue"];
  }
  else if (mode === modeStrongAttack) {
    maxDamage = monster1["strongAttackValue"];
  }
  const damage = dealMonsterDamage(maxDamage)
  enemy1["HP"] -= damage;
  endRound();
}

attackBtn.addEventListener('click', function(){
  attackMonster("attack")
});

strongAttackBtn.addEventListener("click", function(){
  attackMonster("strongAttack")
})

//potion event listener
healBtn.addEventListener("click", function(){
  let potionValue;
  if(monster1["HP"] >= monster1["initialHP"] - healValue){
    alert("You can't heal to more than your max initial health");
    potionValue = monster1["initialHP"] - monster1["HP"];
  }
  else {
    potionValue = healValue;
  }
  increasePlayerHealth(potionValue);
  monster1["HP"] += potionValue;
  endRound();
})

//reset button
function reset() {
  monster1["HP"] = monster1["initialHP"]
  enemy1["HP"] = enemy1["initialHP"]
  resetGame(monster1["initialHP"], enemy1["initialHP"]);
}