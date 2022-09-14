const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; 
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
//all hero name 
const heroname = 
["Swordman Health","Warrioress Health","Warrior Health","Ninja Health","Hero Health"];

var countH = 3;
var countSA = 10;
var counts = 0;
var count = 0;

let chosenMaxLife = 300;
let battleLog = [];
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEvent = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth };
        
    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEvent.target = 'MONSTER';
    } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEvent.target = 'MONSTER';
    } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        logEvent.target = 'PLAYER';
    } else if (ev === LOG_EVENT_PLAYER_HEAL) {logEvent.target = 'PLAYER'; }
    battleLog.push(logEvent);}
    
//before start game loading page
setTimeout(function move() {
 var elem = document.querySelector("#progress-bar");   
  var width = 1;
  var id = setInterval(frame, 8);
  function frame() {
    if (width >= 100) {
      clearInterval(id);}
   else {
   width++; 
   elem.style.width = width + '%'; 
   elem.innerHTML = width * 1  + '%';}}}, 10)
      
// hide game loading page
var loading = document.querySelector('.loading');
var gA =document.querySelector('.game-name');
var lA = document.querySelector('.loader');

setTimeout(function hideLoader(){
    setTimeout(function(){
        gA.classList.add('game-name-hide');
        lA.classList.add('loader-hide');
    }, 1200);
    setTimeout(function () {
        loading.children[0].classList.add('hideLoad');
        loading.children[1].classList.add('hideLoad');
    }, 1800);
   setTimeout(function () {
        loading.parentNode.removeChild(loading);
    }, 3400);}, 800)
/****End game loading page******/

//- all reset on by click button 
function re(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);}
//default hero name   
function dheroname(){
  var pic = "Media/hero.png";
  document.getElementById('myhero').src = pic.replace();
  document.getElementById("hero-name").innerHTML = heroname[4];}  
//heal btn on
function resetheal(){
count = 0;
var tbtn=document.getElementById('heal-btn');
 if(count >= 0){
   tbtn.disabled = false;}}
//super attack btn on
function resetsa(){
counts = 0;
var sabtn=document.getElementById('strong-attack-btn');
if(counts == 0){
sabtn.disabled = false;}}
//super attack reset 0
function countsa(){
countSA = 10;
if(countSA == 10){
document.getElementById('count-sa').innerHTML = countSA;}}
//heal count reset 0
function counth(){
countH = 3;
if(countH == 3){
document.getElementById('count-h').innerHTML = '0' + countH;}}
//off music if reset click
function offmusical(){
var music=document.getElementById("myAudio");
music.pause();
music.currentTime = 0;}
  
//game history remove 
function resethistory(){
  var childNodes = document.getElementById("box").getElementsByTagName('*');
for (var node of childNodes) {
    node.style.display = 'none';}}
    
//all reset btn end
//*****************************************//

//play again game after results 
function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);}
    
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamge = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamge;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamge, currentMonsterHealth, currentPlayerHealth);
//if hero win battle     
if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
Swal.fire('You won the battle! 🎉');
navigator.vibrate(10);
//super attack & heal reset 0
count = 0;
var tbtn=document.getElementById('heal-btn');
if(count == 0){
tbtn.disabled = false;}
counts = 0;
var sabtn=document.getElementById('strong-attack-btn');
if(counts == 0){
sabtn.disabled = false;}
//super attack & heal count reset 0
countSA = 10;
if(countSA == 10){
document.getElementById('count-sa').innerHTML = countSA;}
countH = 3;
if(countH == 3){
document.getElementById('count-h').innerHTML = countH;}
//create history 
var box = document.createElement('div');
  box.classList.add('myDiv');
  box.innerHTML = 'You Won! 🎉';
  document.getElementById('box').appendChild(box);
  
writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth);}
//if hero lose battle 
else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
Swal.fire('You lose! ☠️');
navigator.vibrate(10);
//super attack & heal reset 0
count = 0;
var tbtn=document.getElementById('heal-btn');
if(count == 0){
tbtn.disabled = false;}
counts = 0;
var sabtn=document.getElementById('strong-attack-btn');
if(counts == 0){
sabtn.disabled = false;}
//super attack & heal count reset 0
countSA = 10;
if(countSA == 10){
document.getElementById('count-sa').innerHTML = countSA;}
countH = 3;
if(countH == 3){
document.getElementById('count-h').innerHTML = countH;}
//create history 
var box = document.createElement('div');
  box.classList.add('myDiv');
  box.innerHTML = 'You Lose! ☠️';
  document.getElementById('box').appendChild(box);
  
writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON', currentMonsterHealth, currentPlayerHealth);} 
//if battle draw 
else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
      Swal.fire('Battle draw! 🤕');
navigator.vibrate(10);
//super attack & heal reset 0
count = 0;
var tbtn=document.getElementById('heal-btn');
if(count == 0){
tbtn.disabled = false;}
counts = 0;
var sabtn=document.getElementById('strong-attack-btn');
if(counts == 0){
sabtn.disabled = false;}
//super attack & heal count reset 0
countSA = 10;
if(countSA == 10){
document.getElementById('count-sa').innerHTML = countSA;}
countH = 3;
if(countH == 3){
document.getElementById('count-h').innerHTML = countH;}
//create history 
var box = document.createElement('div');
box.classList.add('myDiv');
box.innerHTML = 'Battle Draw! 🤕';
document.getElementById('box').appendChild(box);

writeToLog(LOG_EVENT_GAME_OVER, 'A DRAW', currentMonsterHealth, currentPlayerHealth);}

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();}}

function attackMonster(mode) {
    let maxDamage;
    let logEvent;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;}
    else if (mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;}
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();}

//attack and super attack all functions 
function attackHandler() {
    attackMonster(MODE_ATTACK);
  navigator.vibrate(6);}
function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
navigator.vibrate(12);
//count one by one super attack
counts += 1;
var sabtn=document.getElementById('strong-attack-btn');
if (counts >= 10){
  sabtn.disabled = true;
  navigator.vibrate(12);
  Swal.fire({
  position: 'top-end',
  title: 'Strong Attack is over',
  showConfirmButton: false,
  timer: 1600});}}

// super attck & heal count and show inside btn
function saclick(){
  countSA -= 1;
if(countSA >= 0){
document.getElementById('count-sa').innerHTML = '0' + countSA;}}
function hclick(){
  countH -= 1;
if(countH >= 0){
document.getElementById('count-h').innerHTML = '0' + countH;}}

// heal button all function
function healPlayerHandler() {
  navigator.vibrate(4);
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
 Swal.fire({
   title: "<h5>You can't heal to more than your max initial health.</h5>",});
        healValue = chosenMaxLife - currentPlayerHealth;} 
      else { healValue = HEAL_VALUE;} 
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
//count one by one heal
count += 1;
var hbtn=document.getElementById('heal-btn');
if (count >= 3){
  hbtn.disabled = true;
  navigator.vibrate(12);
  Swal.fire({
  position: 'top-end',
  title: 'Heal is over',
  showConfirmButton: false,
  timer: 1500})}
  endRound();}
  
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);

//choose hero avatar
function hpic1(){ 
  var pic = "Media/swordman.png";
  document.getElementById('myhero').src = pic.replace()
  document.getElementById("hero-name").innerHTML = heroname[0];}
function hpic2(){ 
  var pic = "Media/female warrior.png";
  document.getElementById('myhero').src = pic.replace()
  document.getElementById("hero-name").innerHTML = heroname[1];}
function hpic3(){ 
  var pic = "Media/warrior.png";
  document.getElementById('myhero').src = pic.replace()
  document.getElementById("hero-name").innerHTML = heroname[2];}
function hpic4(){ 
  var pic = "Media/ninja.png";
  document.getElementById('myhero').src = pic.replace()
  document.getElementById("hero-name").innerHTML = heroname[3];}


function fade(){
   var ani = document.getElementById("container");
   ani.classList.add("fading");
   setTimeout(function(){ ani.style.display = "none"; }, 600);
   
 //play music
var music=document.getElementById("myAudio").play();}

//button inside settings to on-off music
function s_on_music(){
var music=document.getElementById("myAudio");
     music.play();}
function s_off_music(){
var music=document.getElementById("myAudio");
     music.pause();
     music.currentTime = 0;}

//setting theme colour for website 
  const themes = {
  blue: {
      '--primary': '#0099ff',
      '--secondary' : '#33adff',
      '--player_bg' : '#80dfff', },
  tomato: {
      '--primary': 'tomato',
      '--secondary': '#FF7F50',
      '--player_bg': '#FFA07A',},
  pink: {
    '--primary': '#ff4da6',
    '--secondary': '#ff69b4',
    '--player_bg': '#ff99cc', },
  green: {
    '--primary': '#339961',
    '--secondary': '#40bf79',
    '--player_bg': ' #33ff99',
  },
  Purple: {
    '--primary': '#BA55D3',
    '--secondary': '#DA70D6',
    '--player_bg': '#ff99ff', },
  dblu: {
      '--primary': '#0099ff',
      '--secondary' : '#33adff',
      '--player_bg' : '#80dfff', 
      '--white': 'white',
      '--gray': 'gray',
      '--monster_bar': '#ff4d4d',
      '--control_btn': '#ff0062',
      '--setting_menu': '#474747',},
};
[...document.querySelectorAll('.color-button')].forEach(el => {
 el.addEventListener('click', () => {
const theme = themes[el.dataset.theme];
for (var variable in theme) {
document.documentElement.style.setProperty(variable, theme[variable]);
        };} );});
// end theme colour
