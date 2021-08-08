//monster stats
let selectedMonster;

let monster1 = {
    "name": "Chimera",
    "img": "monster1",
    "initialHP": 120,
    "HP": 120,
    "attackValue": 25,
    "strongAttackValue": 35,
    "dodgeChance": 30
}

let monster2 = {
    "name": "Basilisk",
    "img": "monster2",
    "initialHP": 140,
    "HP": 140,
    "attackValue": 20,
    "strongAttackValue": 30,
    "dodgeChance": 50 
}

let monster3 = {
    "name": "Griffin",
    "img": "monster3",
    "initialHP": 100,
    "HP": 100,
    "attackValue": 15,
    "strongAttackValue": 25,
    "dodgeChance": 70 
}

//selecting monsters after clicking on their images
document.getElementById("img1").addEventListener("click", selectMonster1)
document.getElementById("img2").addEventListener("click", selectMonster2)
document.getElementById("img3").addEventListener("click", selectMonster3)

function selectMonster1() {
    document.getElementById("monster1").checked = true;
    selectImage()
}

function selectMonster2() {
    document.getElementById("monster2").checked = true;
    selectImage()
}

function selectMonster3() {
    document.getElementById("monster3").checked = true;
    selectImage()
}

function selectImage() {
    if(document.getElementById("monster1").checked){
        document.getElementById("img1").classList.add("active")
        document.getElementById("img2").classList.remove("active")
        document.getElementById("img3").classList.remove("active")
    }
    else if(document.getElementById("monster2").checked){
        document.getElementById("img2").classList.add("active")
        document.getElementById("img1").classList.remove("active")
        document.getElementById("img3").classList.remove("active")
    }
    else if(document.getElementById("monster3").checked){
        document.getElementById("img3").classList.add("active")
        document.getElementById("img1").classList.remove("active")
        document.getElementById("img2").classList.remove("active")
    }
}

//storing selected monster
document.getElementById("start").addEventListener("click", storeSelection)

var radios = document.getElementsByName('chosenMonster');
function storeSelection() {
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            console.log(radios[i].value)  
            switch (radios[i].value) {
                case "monster1":
                    selectedMonster = monster1;
                    sessionStorage.setItem("selectedMonster", JSON.stringify(selectedMonster))
                    console.log(selectedMonster)
                    window.location.href = "./combat.html";
                break;
                case "monster2":
                    selectedMonster = monster2;
                    sessionStorage.setItem("selectedMonster", JSON.stringify(selectedMonster))
                    console.log(selectedMonster)
                    window.location.href = "./combat.html";
                break;
                case "monster3":
                    selectedMonster = monster3;
                    sessionStorage.setItem("selectedMonster", JSON.stringify(selectedMonster))
                    console.log(selectedMonster)
                    window.location.href = "./combat.html";
                break;
            }
        }
    }
}