let playerOne = '<img src="./assets/images/jetonJaune.jpg">';
let playerTwo = '<img src="./assets/images/jetonRouge.jpg">';
let winRyu = '<img id="ryu_img" src ="./assets/images/winryu.gif">';
let winChunli = '<img id="chunLi_img" src="./assets/images/winchungli.gif">';
let scorePlayerOne = 0;
let scorePlayerTwo = 0;
let lap = 1;
let gameOver = false;




const winConditions = [
  //les victoires horizontales
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
  //les victoires verticales
  [0, 7, 14, 21],
  [7, 14, 21, 28],
  [14, 21, 28, 35],
  [1, 8, 15, 22],
  [8, 15, 22, 29],
  [15, 22, 29, 36],
  [2, 9, 16, 23],
  [9, 16, 23, 30],
  [16, 23, 30, 37],
  [3, 10, 17, 24],
  [10, 17, 24, 31],
  [17, 24, 31, 38],
  [4, 11, 18, 25],
  [11, 18, 25, 32],
  [18, 25, 32, 39],
  [5, 12, 19, 26],
  [12, 19, 26, 33],
  [19, 26, 33, 40],
  [6, 13, 20, 27],
  [13, 20, 27, 34],
  [20, 27, 34, 41],
  //les victoires diagonales haut -> droite
  [0, 8, 16, 24],
  [1, 9, 17, 25],
  [2, 10, 18, 26],
  [3, 11, 19, 27],
  [7, 15, 23, 31],
  [8, 16, 24, 32],
  [9, 17, 25, 33],
  [10, 18, 26, 34],
  [14, 22, 30, 38],
  [15, 23, 31, 39],
  [16, 24, 32, 40],
  [17, 25, 33, 41],
  //les victoires diagonales haut -> gauche
  [6, 12, 18, 24],
  [5, 11, 17, 23],
  [4, 10, 16, 22],
  [3, 9, 15, 21],
  [13, 19, 25, 31],
  [12, 18, 24, 30],
  [11, 17, 23, 29],
  [10, 16, 22, 28],
  [20, 26, 32, 38],
  [19, 25, 31, 37],
  [18, 24, 30, 36],
  [17, 23, 29, 35],
];

//-------------------------------------------------------------------------------------------------
//FONCTION POUR JOUER (contient tour des joueur et condition pour pouvoir placer un jeton)
function play(elem){
  if(gameOver == false){
    if(elem.innerHTML == ""){
      if(lap % 2 != 0){
        elem.innerHTML = playerOne;
          playAudioRyu();
      }else{
        elem.innerHTML = playerTwo;
          playAudioChunLi();
      };
          checkWin();
          lap++;
    };
  };
};

//-----------------------------------------------------------------------------------------------
//FONCTION POUR SAVOIR QUI GAGNE
let divScores=document.querySelectorAll(".score");
function checkWin(){
  let cells = document.querySelectorAll(".cases");
  //parcours chaque condition gagnante (chaque tableau) du tableau winConditions:
  for(let i = 0; i < winConditions.length; i++){
    //  si la cellule à l'index spécifié de la première condition gagnante n'est pas vide:
    if(cells[winConditions[i][0]].innerHTML != ""){
      //si les cellules  à l index 0,1,2,3 de la condition gagnante parcourue à l index i contiennent le même contenu:
      if(cells[winConditions[i][0]].innerHTML
          == cells[winConditions[i][1]].innerHTML && cells[winConditions[i][1]].innerHTML
          == cells[winConditions[i][2]].innerHTML && cells[winConditions[i][2]].innerHTML
          == cells[winConditions[i][3]].innerHTML){
         //si la 1ere cellule de la conditions gagnante == playerOne:  
         if(cells[winConditions[i][0]].innerHTML == playerOne){
           //rajoute +1 à la valeur de scorePlayerOne:
           scorePlayerOne++;
           
           //condition pour afficher les scores et le gif dans d'autre container quand la résolution de l'écran <=1024px( pr le responsive format tablettes et mobile):
           if (window.innerWidth <= 1024) {
             document.querySelector("#scorePlayerOne_mobile").innerHTML = "SCORE RYU : " + scorePlayerOne;
             setTimeout(function(){
              document.querySelector("#gif_mobile").innerHTML = winRyu
             },800);
             document.querySelector("#scorePlayerTwo_mobile").innerHTML = "SCORE CHUN LI : " + scorePlayerTwo;
              //ajoute un bg à chaque élément de la classe "score":
             divScores.forEach(score=>{
               score.style.backgroundColor = "rgba(0, 0, 0, 0.350)";
             });
            }else{
             document.querySelector("#scorePlayerOne").innerHTML = "SCORE RYU : " + scorePlayerOne;
             setTimeout(function(){
               document.querySelector("#ryuGif").innerHTML = winRyu
              },800);
             document.querySelector("#scorePlayerTwo").innerHTML = "SCORE CHUN LI : " + scorePlayerTwo;
              //ajoute un bg à chaque élément de la classe "score":
              divScores.forEach(score=>{
               score.style.backgroundColor = "rgba(0, 0, 0, 0.350)";
             });
            }
          
           //affichage de la chaîne de caractère "YOU WIN" dans l'élément selectionné
           setTimeout(function(){
             document.querySelector("#YouWin").innerHTML = "YOU WIN !"
           },800);                         
           gameOver = true;
          //joue la fonction PlayAudioYouWin au bout de 1000ms 
           setTimeout(playAudioYouWin, 1000);  
         }else{
           scorePlayerTwo++;
           if (window.innerWidth <= 1024) {
             document.querySelector("#scorePlayerTwo_mobile").innerHTML = "SCORE RYU : " + scorePlayerOne;
             setTimeout(function(){ 
              document.querySelector("#gif_mobile").innerHTML = winChunli
             },1000);
             document.querySelector("#scorePlayerOne_mobile").innerHTML = "SCORE CHUN LI : " + scorePlayerTwo;
           }else{
             document.querySelector("#scorePlayerTwo").innerHTML = "SCORE CHUN LI : " + scorePlayerTwo;
             setTimeout(function(){ 
               document.querySelector("#chunliGif").innerHTML = winChunli
              },1000);
            document.querySelector("#scorePlayerOne").innerHTML = "SCORE RYU : " + scorePlayerOne;
           }
           setTimeout(function(){
             document.querySelector("#YouWin").innerHTML = "YOU WIN !"
           },800);                         
           gameOver = true;
           setTimeout(playAudioYouWin, 800);
           setTimeout(playAudioYata, 1000); 
          };
       };
    };
  };
};

// FONCTION RESET
// on crée une fonction reset pour relance la partie à 0 avec nombre de tour "lap", à nouveau= à 1 (car c'est à nouveau le 1er tour  )
function reset(){
  let cells = document.querySelectorAll(".cases");
  for(let i = 0; i < cells.length; i++){
    cells[i].innerHTML = "";
  };
  playAudioSelect();
  lap = 1;
  gameOver = false;
  document.querySelector("#YouWin").innerHTML = "";
  document.querySelector("#chunliGif").innerHTML = "";
  document.querySelector("#ryuGif").innerHTML = "";
  document.querySelector("#gif_mobile").innerHTML = "";
};

//----------------------------------------------------------------------------------------
// FONCTIONS AUDIO
const playAudioRyu = () => {
  const audio = new Audio();
  audio.src = "./assets/mp3/ryu.mp3";
  audio.play();
};

const playAudioChunLi = () => {
  const audio = new Audio();
  audio.src = "./assets/mp3/chunli.mp3";
  audio.play();
};

const playAudioYouWin = () => {
  const audio = new Audio();
  audio.src = "./assets/mp3/youwin.mp3";
  audio.play();
};

const playAudioSelect = () => {
  const audio = new Audio();
  audio.src = "./assets/mp3/select.mp3";
  audio.play();
};

const playAudioYata = () => {
  const audio = new Audio();
  audio.src = "./assets/mp3/yata.mp3";
  audio.play();
};

//-------------------------------------------THE END ---------------------------------------------------