let playerMonster = JSON.parse(sessionStorage.selectedMonster);

document.getElementById("final-pic").innerHTML = `<img src="./${playerMonster["img"]}.png">`
document.getElementById("back-win").addEventListener("click", mainMenu)

function mainMenu(){
    window.location.href = "./index.html";
}