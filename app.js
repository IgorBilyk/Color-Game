//set up global variables
let 
    //get header to insert color rgb and first block
    //button new game
    btnNewGame 	= document.querySelector('#newGame'),
    //button easy game
    btnEasyGame = document.querySelector('#easyGame'),
    //button hard game
    btnHardGame = document.querySelector('#hardGame'),
	//output for rgb color in header section
	rgbColor 	= document.querySelector('#rgbColor'),
	//first block
	block1 		= document.querySelector('.block-1'),
	//all firsts 3  blocks 
	blocks 		= document.querySelectorAll('.block'),
	//get all seconds 3 blocks
	divs 		= document.querySelectorAll('.second-block'),
	//concat 2 arrays of blocks  
	allDivs = [...blocks, ...divs],
	//variables for function randomColor 
    color1 = 0,
    color2 = 0,
    color3 = 0,
    //counter variable for tracking numbers of clicks on block
    counter 	 = 0,
    // variable for checking easy modo
    isEasyModo 	 = false,
    //paragraph for output cogratulation text
    congText 	 = document.querySelector('.congText'),
    //paragraph for output of numbers of attempts
    counterText  = document.querySelector('.counterText'),
    wrappersDivs = document.querySelector('.wrapper-divs');

//------------------------------------------- set up all necessaries functions  

 //Get random color   
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Generate rgb color and insert into header
function randomNumber() {
	//declare 3 variables to assign to each own color
	let result = 0;
	color1 = randomInteger(0,255);
	color2 = randomInteger(0,255);
	color3 = randomInteger(0,255);
	//return value with rgb color rgb(00,00,00)
	return  result = `${color1}, ${color3}, ${color3}`
	
}

// function to change colors of divs 
function setColor () {
	if(isEasyModo){

	    for(var i = 0; i < blocks.length; i++){
			blocks[i].style.backgroundColor = `rgb(${randomNumber()})`;
	}

	}else{
		for(var i = 0; i < allDivs.length; i++){
			allDivs[i].style.backgroundColor = `rgb(${randomNumber()})`;
	}

	}


	value();

}
//insert color value 

function insertValue (value) {

	rgbColor.innerHTML = `${value}`;
}

//second insert value function 

 let value = function () {
 	if(isEasyModo) {
		insertValue(`${blocks[randomInteger(0, blocks.length -1)].style.backgroundColor}`);
	
 	}else{
 		insertValue(`${allDivs[randomInteger(0, allDivs.length -1)].style.backgroundColor}`);

 	}

}

//function for removing congratulation text

function removeText () {
	counterText.innerHTML = '';
	congText.style.color = 'transparent';

}

//checking for easy modo 
 
function hardModo () {
	if(isEasyModo){
		for(var i = 0; i < divs.length; i++ ){
			divs[i].style.display = 'block';

		}
		isEasyModo = false;
		setColor();
		return;
 }
}


//checking for hard modo 
 
function easyModo () {
	if(!isEasyModo){
		for(var i = 0; i < divs.length; i++ ){
				divs[i].style.display = 'none';

			}
			isEasyModo = true;
			setColor();
			return;
	 }
}

//Button easy game to place only 3 divs 

btnEasyGame.addEventListener('click', easyModo);


//Button hard game to place all 6 divs 

btnHardGame.addEventListener('click', hardModo);

//check where user clicked and show to him result

document.addEventListener('click', (event) => {
    let textColor = rgbColor.innerText.toLowerCase();
	if(event.target.tagName === 'DIV'){
		counter++;
			if(event.target.style.backgroundColor === textColor){
				for(var i = 0; i < allDivs.length; i++){
					allDivs[i].style.backgroundColor = textColor;
					congText.style.color = 'red';
					//adding text when user guess color
					(counter < 3 )? counterText.innerHTML = `Good job!!! </br> You only have made ${counter} attempts`: counterText.innerHTML = `You guest on ${counter}'s attemps`;
				    
				}
				counter = 0;
			}else{
				if(event.target.tagName === 'DIV'){
				event.target.style.backgroundColor = 'transparent';
				
				}
			}
		}
})


//Call function set color when user refresh a page
setColor();

//Main function runs when user click the button NEw Game
btnNewGame.addEventListener('click', () => {
	setColor();
	value();
	removeText();
})
