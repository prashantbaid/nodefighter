var keypress = require('keypress');
var chalk = require('chalk');
var tty = require('tty');
var fs = require('fs');

var splashScreen =

    "\n\n" +
    "█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗\n" +
    "╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝\n\n" +
    "        ███╗   ██╗ ██████╗ ██████╗ ███████╗\n" +
    "        ████╗  ██║██╔═══██╗██╔══██╗██╔════╝\n" +
    "        ██╔██╗ ██║██║   ██║██║  ██║█████╗\n" +
    "        ██║╚██╗██║██║   ██║██║  ██║██╔══╝\n" +
    "        ██║ ╚████║╚██████╔╝██████╔╝███████╗\n" +
    "        ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝\n" +
    "\n" +
    "███████╗██╗ ██████╗ ██╗  ██╗████████╗███████╗██████╗\n" +
    "██╔════╝██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝██╔══██╗\n" +
    "█████╗  ██║██║  ███╗███████║   ██║   █████╗  ██████╔╝\n" +
    "██╔══╝  ██║██║   ██║██╔══██║   ██║   ██╔══╝  ██╔══██╗\n" +
    "██║     ██║╚██████╔╝██║  ██║   ██║   ███████╗██║  ██║\n" +
    "╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝\n\n" +
    "█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗\n" +
    "╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝\n\n"


var direction = 'left';
var car = chalk.black.bgGreen("o") + chalk.bgBlue("||") + chalk.black.bgGreen("o");
var trackSpace = chalk.bgGreen("   ");
var lines = chalk.dim.bgBlack(" ") + chalk.bgYellow.black("|   |") + chalk.dim.bgBlack(" ");
var space = chalk.bgGreen("          ");
var racingCar = trackSpace + car + trackSpace;
var circuit = '';
var myCarPos = 17;
var compCar = [racingCar, space];
var animationCounter = 0;
var circuitBuilder = [];
var score = 0;
var level = 1;
var levelTimer = 0;
var interval = 100;
var startFlag = false;
var circuitLength = 20;
var zebra = chalk.white.bgGreen("||");
var continueFlag = false;
var highscore = 0;
var animator;


keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function(ch, key) {

    if (key && key.ctrl && key.name == 'c') {
        exitGame();
    }
    if (key && key.name) {
        switch (key.name) {
            case 'left':
                direction = 'left';
                break;
            case 'right':
                direction = 'right';
                break;
            case 'return':
                startGame();
                break;
            case 'x':
                exitGame();
                break;
            case 'space':
                displaySplashScreen();
                break;
            case 'X':
                exitGame();
                break;
        }
    }

});

process.stdin.setRawMode(true);
process.stdin.resume();

//splash screen
function displaySplashScreen() {
    circuit = '';
    endAnimation();
    process.stdout.write('\033c');
    console.log(chalk.red(splashScreen));
    console.log('\n' + chalk.bold.red('\t\tPress enter to start') + '\n\n')
    console.log(chalk.red('\t  Use left and right arrows to move'));
    console.log('\n\n' + chalk.dim.red('\t\t    Created  By') + '\n' + chalk.dim.red('\t\t   Prashant Baid'));
    startFlag = false;
}

displaySplashScreen();

//calls initializeGame to setup circuit
function startGame() {
    if (!startFlag) {
        initializeGame();
        startFlag = true;
    }
}

//set everything to default
function initializeGame() {
    score = 0;
    level = 1;
    interval = 100;
    lives = 3;
    circuit = '';
    levelTimer = 0;
    highscore = getHighScore();
    process.stdout.write('\033c');
    console.log(initializeCircuit());
    startAnimation(interval);

}


//build the tracks
function initializeCircuit() {
    for (var i = 0; i < circuitLength; i++) {
        circuitBuilder[i] = space + zebra + space;
        circuit += lines + circuitBuilder[i] + lines + '\n';
    }
    circuit += '\n\n\n\n\t    ' + chalk.bold.red('Press X to quit');
    circuit += '\n        ' + chalk.bold.red('Press spacebar to restart');
    return circuit;
}

//all done, start the game now
function startAnimation(interval) {
    animator = setInterval(gameLogic, interval);
}


//all the madness happens here
function gameLogic() {

    //counters
    animationCounter++;
    levelTimer++;
    score++;

    //to set space between two cars 
    if (animationCounter > 4) {
        animationCounter = 0;
    }

    //magic happens here
    launchCar(animationCounter);


    //increase the speed every 10s
    if (levelTimer > 100) {
        levelTimer = 0;
        level++;
        interval -= 10;
        resetAnimation();
    }



    //random stuff happens here ;)
    shuffle(compCar);

    //redraw
    circuit = '';
    process.stdout.write('\033[2f');
    console.log(drawCircuit());



}

//all the madness happens here
function gameLogic() {

    process.stdin.setRawMode(true);
    process.stdin.resume();
    animationCounter++;
    if (animationCounter > 4) {
        animationCounter = 0;
    }
    launchCar(animationCounter);
    score++;
    if (levelTimer > 100) {
        levelTimer = 0;
        level++;
        interval -= 10;
        resetAnimation();
    }
    levelTimer++;
    shuffle(compCar);
    circuit = '';

    process.stdout.write('\033[2f');
    console.log(drawCircuit());



}

//logic behind the car run by computer
function launchCar(animationCounter) {
    var circuitBlock;
    circuitBuilder.pop();

    if (animationCounter == 1)
        circuitBlock = compCar[0] + zebra + compCar[1];
    else
        circuitBlock = space + zebra + space;
    circuitBuilder.unshift(circuitBlock);
}


//restart animation
function resetAnimation() {
    endAnimation();
    startAnimation(interval);
}

//stop animation
function endAnimation() {
    clearInterval(animator);

}

//real gameplay happens here. TODO: make it beautiful
function drawCircuit() {

    for (var i = 0; i < circuitLength; i++) {

        if (i == myCarPos) {
            if (direction === 'left') {
                var myCarBlock = racingCar + zebra + space;
                if (circuitBuilder[i] === myCarBlock) {
                    if (score > highscore)
                        highscore = score;
                    dead();
                } else
                    circuit += lines + trackSpace + chalk.black.bgGreen("o") + chalk.bgRed("||") + chalk.black.bgGreen("o") + trackSpace + zebra + space + lines + '\n';
            } else if (direction === 'right') {
                var myCarBlock = space + zebra + racingCar;
                if (circuitBuilder[i] === myCarBlock) {
                    if (score > highscore)
                        highscore = score;
                    dead();
                } else
                    circuit += lines + space + zebra + trackSpace + chalk.black.bgGreen("o") + chalk.bgRed("||") + chalk.black.bgGreen("o") + trackSpace + lines + '\n';
            }
        }
        switch (i) {

            case 0:
                circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.bold.bgYellow.red(' SCORE ') + '\n';
                break;
            case 1:
                circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.red(score) + '\n';
                break;
            case 2:
                circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.bold.bgYellow.red(' LEVEL ') + '\n';
                break;
            case 3:
                circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.red(level) + '\n';
                break;
            case 4:
                circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.bold.bgYellow.red(' HIGHSCORE ') + '\n';
                break;
            case 5:
                circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.red(highscore) + '\n';
                break;
            default:
                circuit += lines + circuitBuilder[i] + lines + '\n';
        }
    }
    return circuit;
}


//bye bye
function exitGame() {
    process.stdout.write('\033c');
    process.exit(1);
}


//TODO: give the function a better name
function dead() {
    circuit = '';
    console.log(chalk.bold.bgBlack.red('\n\n\n\n\n\n\n\n\n             GAME OVER!             '));
    endAnimation();
    var highscore = {
        "highscore": score
    };
    fs.stat('highscore.json', function(err, stat) {
        if (err) {

            fs.writeFileSync('highscore.json', JSON.stringify(highscore));
        } else {
            var hs = JSON.parse(fs.readFileSync('highscore.json').toString());
            if (hs.highscore < score) {
                fs.writeFileSync('highscore.json', JSON.stringify(highscore));
                highscore = score;
            }
        }
    });

}




function getHighScore() {
    fs.stat('highscore.json', function(err, stat) {
        if (err) {
            highscore = 0;
        } else {
            var hs = JSON.parse(fs.readFileSync('highscore.json').toString());
            highscore = hs.highscore;
        }
    });
}



function shuffle(array) {
    var counter = array.length,
        temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}