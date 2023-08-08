
//Initial References 
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resulText = document.getElementById("result-text");

//Options values fot buttons
let options = {
    fruits: [
        "Apple",
        "Blueberry",
        "Mandarin",
        "Pineapple",
        "Pomegranate",
        "Watermelon",
    ], 
    animals: [
        "headgehog",
        "Rhinoceros",
        "Squirrel",
        "panther",
        "Walrus",
        "Zebra",
    ],
    countries: [
        "India",
        "hungary",
        "Kyrgyzstan",
        "Switzerland",
        "Zimbabwe",
        "Dominica",
    ]
}; 


//Count
let winCount = 0;
let count =  0;

let chosenWord = "";


//Display options buttons
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select an Option</h3>`;
    let buttonCon = document.createElement("div");

    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }

    optionsContainer.appendChild(buttonCon);
}

//Block all the Buttons 
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = documnet.querySelectorAll(".letters");
    //disable all options
    optionsButtons.forEach((button) => {
        button.disabled = true;
    }); 

    // Disable all letters
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
}

//Word Generator 
const generateWord = (optionValue) =>  {
    let optionsButtons = document.querySelectorAll(".options");
    // If optionValue matches the button innerText then highlight the button
    optionsButtons.forEach((button) =>{
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    // Initially hide letters, clear previos word
    letterContainer.classList.remove("hide");
    userInputSection.innerHTML = "";

    let optionArray = options[optionValue];
    // chose random word
    chosenWord = optionArray[Math.floor(Math.random () * optionValue.length)];
    chosenWord = chosenWord.toUpperCase();
    console.log(chosenWord);

    //Replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g,'<span class="dashes">_</span>');

    // Display each element as span
    userInputSection.innerHTML = displayItem;
}

//Initial Function (Called when page loads/user presses new game )
const initializer = () => {
    winCount = 0;
    count = 0;
   
    //Initially erase all content and hide letteres and new game button
    
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    //For createing letter buttons 
    for (let i = 65; i < 91; i ++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //character button click
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes =  document.getElementsByClassName("dashes");
            //if array contains clciked calue replace the cached das with letter else dram on canvas 
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    //if character in array is same clicked button 
                    if (char === button.innerText) {
                        //replace dash whit letter
                        dashes[index].innerText = char;
                        //increment counter
                        winCount += 1;
                        //if winCount equals word length
                        if (winCount == charArray.length) {
                            resulText.innerHTML = `<h2 class='win-msg'> You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                            newGameContainer.classList.remove("hide");
                            //block all butons
                            //blocker();
                        }
                    }
                });
            } else {
                //lose count 
                count += 1;
                //for drawing man
                drawMan(count);
                //Count == 6 because head, body, left, arm, right arm, left leg, rigth leg
                console.log(count);
                if (count == 6){
                    resulText.innerHTML = `<h2 class='lose-msg'> You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    newGameContainer.classList.remove("hide");
                    //blocker();
                }
            }
            //disable cliked button
            button.disabled = true;
        });
    letterContainer.appendChild(button);
    } 
    displayOptions();
    //call to cancasCreator (for clearing pprevios canvas and creating initila canvas)
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
};

// Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d")
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    // For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    }
    
    const body = () => {
        drawLine (70, 40, 70, 80);
    };
    
    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };
    
    const rigthArm = () => {
        drawLine(70, 50, 90, 70);
    };
    
    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };
    
    const rigthLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame
    const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top Line 
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
    };

    return { initialDrawing, head, body, leftArm, rigthArm, leftLeg, rigthLeg };
};

// draw the man
const drawMan = (count) => {
    let { head, body, leftArm, rigthArm, leftLeg, rigthLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2: 
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rigthArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rigthLeg();
            break;
        default:
            break;
    }
}

// New Game
newGameButton.addEventListener("click", initializer)
window.onload = initializer;
