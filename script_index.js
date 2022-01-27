//monster stats
let selectedMonster;

const monster1 = {
    "name": "Chimera",
    "img": "monster1",
    "initialHP": 120,
    "HP": 120,
    "attackValue": 25,
    "strongAttackValue": 30,
    "dodgeChance": 30
}

const monster2 = {
    "name": "Basilisk",
    "img": "monster2",
    "initialHP": 130,
    "HP": 130,
    "attackValue": 20,
    "strongAttackValue": 25,
    "dodgeChance": 50 
}

const monster3 = {
    "name": "Griffin",
    "img": "monster3",
    "initialHP": 110,
    "HP": 110,
    "attackValue": 17,
    "strongAttackValue": 22,
    "dodgeChance": 60 
}

//selecting monsters after clicking on their images
var images = document.getElementsByName('image')
var radios = document.getElementsByName('chosenMonster');

radios.forEach(e => e.addEventListener("click", selectImage))
images[0].addEventListener("click", selectMonster1)
images[1].addEventListener("click", selectMonster2)
images[2].addEventListener("click", selectMonster3)

function selectMonster1() {
    radios[0].checked = true;
    selectImage()
}

function selectMonster2() {
    radios[1].checked = true;
    selectImage()
}

function selectMonster3() {
    radios[2].checked = true;
    selectImage()
}

function selectImage() {
    if(radios[0].checked){
        images.forEach(e => e.classList.remove("active"))
        images[0].classList.add("active")
        radios.forEach(e => e.classList.remove("monster-chosen"))
        radios[0].classList.add("monster-chosen")
    }
    else if(radios[1].checked){
        images.forEach(e => e.classList.remove("active"))
        images[1].classList.add("active")
        radios.forEach(e => e.classList.remove("monster-chosen"))
        radios[1].classList.add("monster-chosen")
    }
    else if(radios[2].checked){
        images.forEach(e => e.classList.remove("active"))
        images[2].classList.add("active")
        radios.forEach(e => e.classList.remove("monster-chosen"))
        radios[2].classList.add("monster-chosen")
    }
}

//storing selected monster
document.getElementById("start").addEventListener("click", storeSelection)

function storeSelection() {
    for (const radiobutton of radios) {
        if (radiobutton.checked) {
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    console.log(radios[i].value)  
                    switch (radios[i].value) {
                        case "monster1":
                            selectedMonster = monster1;
                        break;
                        case "monster2":
                            selectedMonster = monster2;
                        break;
                        case "monster3":
                            selectedMonster = monster3;
                        break;
                    }
                }
            }
            sessionStorage.setItem("selectedMonster", JSON.stringify(selectedMonster))
            console.log(selectedMonster)
            window.location.href = "./combat.html";
        }
    }
}