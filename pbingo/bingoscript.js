const squaresNum = 9;

const texts = [
	"Kiedyś to było...",
	"Literówka w prezentacji",
	"Spóźnienie",
	"Problemy z rzutnikiem",
	"Czy są jakieś pytania?",
	"\"włAnczać\"\n/\"wyłAnczać\"",
	"Szkalowanie zdalnego nauczania",
	"Prowadzący linuksiarz",
	"Nadużywanie \"prawda\""
];

const bingoIndexes = [
	["square0", "square1", "square2"], ["square3", "square4", "square5"], 
	["square6", "square7", "square8"], ["square0", "square3", "square6"], 
	["square1", "square4", "square7"], ["square2", "square5", "square8"],
	["square0", "square4", "square8"], ["square2", "square4", "square6"],
];

let squaresToDo = [];
let doneSquares = [];

function newCard() {
	let textsCopy = texts.slice();
	doneSquares.splice(0, doneSquares.length);
	squaresToDo.splice(0, squaresToDo.length);
	setBingoOrNot();

	for(var i=0; i < squaresNum; i++) {
		textsCopy = setSquare(i, textsCopy);
	}

	localStorage.setItem('squaresToDo', JSON.stringify(squaresToDo));
	localStorage.setItem('doneSquares', JSON.stringify(doneSquares));
}

function newPlay() {
	if (localStorage.hasOwnProperty("squaresToDo") 
	 && localStorage.hasOwnProperty("doneSquares")) 
	{ 
		loadLocalStorage();
		setBingoOrNot(); 
	}
	else { newCard(); }
}

function loadLocalStorage() {
	squaresToDo = JSON.parse(localStorage.getItem('squaresToDo'));
	doneSquares = JSON.parse(localStorage.getItem('doneSquares'));

	for(let i=0; i < squaresNum; i++) {
		document.getElementById("square"+i).innerHTML = squaresToDo[i];
	}
	for(let i=0; i < doneSquares.length; i++){
		let element = document.getElementById(doneSquares[i]);
		element.className = "done";
	}
}

function setSquare(thisSquare, textsCopy) {
	let currSquare = "square" + thisSquare;
	let newNum = getRandomInt(0, textsCopy.length-1);
	let text = textsCopy.splice(newNum, 1);

	document.getElementById(currSquare).innerHTML = text;
	document.getElementById(currSquare).className = "undone";

	squaresToDo.push(text);

	return textsCopy;
}

function getNewNum() {
	return Math.floor(Math.random() * 75);
	
}

function markDoneUndone(id) {
	let clas = document.getElementById(id).className;
	if(clas == "undone")	{ markDone(id);   }
	else					{ markUndone(id); }
	setBingoOrNot();
	localStorage.setItem('doneSquares', JSON.stringify(doneSquares));
}

function setBingoOrNot()
{
	if(checkIfBingo())
	{
		document.getElementById("header_text").style.display = "block";
	}
	else
	{
		document.getElementById("header_text").style.display = "none";		
	}
}

function markDone(id) {
	let element = document.getElementById(id);
	element.className = "done";
	doneSquares.push(id);
}

function markUndone(id) {
	let element = document.getElementById(id);
	element.className = "undone";

	const index = doneSquares.indexOf(id);
	if (index > -1) {
  		doneSquares.splice(index, 1);
	}
}

function arrayContainsAll(myArray, modelArray) {
    for (let i = 0; i < modelArray.length; i++){
        if (myArray.indexOf(modelArray[i]) === -1) { return false; }
    }
    return true;
}

function checkIfBingo() {
	if(doneSquares.length >= 3)
	{
		for(let arr of bingoIndexes)
		{
			if(arrayContainsAll(doneSquares, arr)) { return true; }
		}
	}
	return false;
}

function anotherCard() {
	newCard();
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.ceil(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }