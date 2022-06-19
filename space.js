const prompt = require('prompt-sync')();

// A random number function with min and max values
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function spaceBattle() {
    // The USS Hello World Object
    let usshw = {
        hull: 20,
        firepower: 5,
        accuracy: 0.7
    };

    // Create an array of Alien Ships Objects
    let alships = [];
    // Use loop to create an array of Alien Ship objects
    // Use random number function to create random values for
    // hull, firepower and accuracy
    for (let i = 0; i < 6; i++) {
        alships[i] = {
            hull: Math.floor(randomNumber(3, 6)),
            firepower: Math.floor(randomNumber(2, 4)),
            accuracy: randomNumber(0.6, 0.8)
        }
    }

    console.log('%c spacebattle', 'font-size: 40px; font-style: italic; color: blue; border: 1px solid grey;')

    let action = "H";
    // Repeat until there are alien ships left in
    // the array or if the user retreats by entering R
    while (alships.length > 0 && action == "H") {
        // Display information about ship hull and 
        // remaining alien ships
        console.log('USS Hello World: ', usshw);
        console.log(`${alships.length} Alien ships remaining.`);
        for (let i = 0; i < alships.length; i++) {
            console.log(`Ship ${(i + 1)}: `, alships[i])
        }

        // Ask if user wants to hit or retreat
        let action = prompt("Do you want to hit (H) the next ship or retreat (R)? ")

        if (action == "H") {
            console.log("%c You are attacking an Alien!", 'font-style: italic; color: green;');

            // Hit alien ship if accuracy is good
            if (Math.random() < usshw.accuracy) {
                console.log("%c Alien ship has been hit!", 'font-style: italic; color: green;');
                alships[0].hull -= usshw.firepower;
            }
            else {
                // Accuracy was not good so we missed the ship
                console.log("%c You missed Alien ship!", 'font-style: italic; color: green;');
            }

            // If Alien ship is still running then
            // it will hit back
            if (alships[0].hull > 0) {
                console.log("%c Alien ship is attacking!", 'font-style: italic; color: red;');

                // If alien ship hits back with accuracy
                if (Math.random() < alships[0].accuracy) {
                    console.log("%c You have been hit!", 'font-style: italic; color: red;');
                    usshw.hull -= alships[0].firepower;

                    //If USS Hello World hull is 0 then game over
                    if (usshw.hull <= 0) {
                        console.log("USS Hello World: ", usshw);
                        console.log("%c Hull is damaged. Game over!", 'font-style: bold; color: red;');
                        return;
                    }
                }
                else {
                    // Alien ship did not meet accuracy and missed
                    console.log("%c Alien ship missed!", 'font-style: italic; color: green;');
                }
            }
            else {
                // Remove the destroyed alien ship
                // from the array
                alships.shift();
            }
        }
        else {
            // If user entered R then exit from the loop
            break;
        }
    }

    // If there are no more ships left then
    // display victory message
    if (alships.length == 0) {
        console.log("You won! The world is safe!")
    }
}

// Start the game by calling the function
spaceBattle();