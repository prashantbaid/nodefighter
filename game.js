var keypress = require('keypress');
var chalk = require('chalk');
var tty = require('tty');
var fs = require('fs');

var splashScreen = 

"\n\n"
 +                                                                                                                       
"█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗\n"+
"╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝\n\n"+ 
"        ███╗   ██╗ ██████╗ ██████╗ ███████╗\n"+                  
"        ████╗  ██║██╔═══██╗██╔══██╗██╔════╝\n"+                  
"        ██╔██╗ ██║██║   ██║██║  ██║█████╗\n"+                    
"        ██║╚██╗██║██║   ██║██║  ██║██╔══╝\n"+                    
"        ██║ ╚████║╚██████╔╝██████╔╝███████╗\n"+                  
"        ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝\n"+                  
"\n"+                                           
"███████╗██╗ ██████╗ ██╗  ██╗████████╗███████╗██████╗\n"+ 
"██╔════╝██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝██╔══██╗\n"+
"█████╗  ██║██║  ███╗███████║   ██║   █████╗  ██████╔╝\n"+
"██╔══╝  ██║██║   ██║██╔══██║   ██║   ██╔══╝  ██╔══██╗\n"+
"██║     ██║╚██████╔╝██║  ██║   ██║   ███████╗██║  ██║\n"+
"╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝\n\n"+
"█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗\n"+
"╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝\n\n"





keypress(process.stdin);

var direction = 'left';




var car = chalk.black.bgGreen("o")+chalk.bgBlue("||")+chalk.black.bgGreen("o");
var trackSpace = chalk.bgGreen("   ");
var tree = chalk.green.bgBlack("*@*");
var lines = chalk.dim.bgYellow(" ") + chalk.bgBlack.gray("|     |") + chalk.dim.bgYellow(" ");
var space = chalk.bgGreen("          ");
var racingCar = trackSpace + car + trackSpace;
var circuit = '';
var myCarPos = 15;
var compCar = [racingCar, space];
var treeGenerator = [chalk.bgBlack("   "), tree];
var animationCounter = 0;
var circuitBuilder = [];
var score = 0;
var level = 1;
var levelTimer = 0;
var interval = 100;
var startFlag = false;
var circuitLength = 18;
var message = '';
var message2 = '';
var zebra = chalk.white.bgGreen("||");
var continueFlag = false;
var highscore = 0;


function displaySplashScreen() {
  circuit = '';
  endAnimation();
  process.stdout.write('\033c');
  console.log(chalk.red(splashScreen));
  console.log('\n'+ chalk.bold.red('\t\tPress enter to start') + '\n\n')
  console.log(chalk.red('\t  Use left and right arrows to move'));
  console.log('\n\n'+ chalk.bold.red('\t\t     Created By ') + '\n' + chalk.bold.red('\t\t   Prashant Baid'));
  startFlag = false;
}

displaySplashScreen();


// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  
  if (key && key.ctrl && key.name == 'c') {
      exitGame();
  }
  switch(key.name) {
    case 'left' : direction = 'left';
                  break;
    case 'right': direction = 'right';
                  break;
    case 'return': startGame();
                  break;
    case 'x': exitGame();
              break;
    case 'space': displaySplashScreen();
              break;
    case 'X': exitGame();
              break;
  }
  //if(key && key.ctrl && (key.name == 'left' || key.name == 'right'))
    //getDirection(key.name);
}); 

process.stdin.setRawMode(true);
process.stdin.resume();
function exitGame() {
  process.stdout.write('\033c');
  process.exit(1);
}

function initializeCircuit() {
  for(var i = 0; i <circuitLength; i++) {
    circuitBuilder[i] = space + zebra + space;
    circuit += lines + circuitBuilder[i] + lines + '\n';  
  }
  circuit += '\n\n\n\n\t    ' + chalk.bold.red('Press X to quit');
  circuit += '\n        ' + chalk.bold.red('Press spacebar to restart');
  return circuit;
}

function startGame() {
  if(!startFlag) {
    initializeGame();
    startFlag = true;
  }
}

//var arenaBluePrint = lines + compCar[0] + compCar[1] + lines + '\n';

function launchCar(animationCounter) {
  var circuitBlock;
  circuitBuilder.pop();

 // circuitBuilder.pop();
 // circuitBuilder.pop();
 if(animationCounter == 1)
    circuitBlock = compCar[0] + zebra + compCar[1];
  else
    circuitBlock = space + zebra + space;
 // circuitBuilder.unshift(lines + space + space + lines + '\n')
  circuitBuilder.unshift(circuitBlock);
 // circuitBuilder.unshift(lines + space + space + lines + '\n');
}

function drawCircuit() {


 process.stdin.setRawMode(true);
  process.stdin.resume();
  //circuitBuilder[0] = circuitBuilder[0] + "  SCORE";
 // circuitBuilder[1] += "  1";
 // circuitBuilder[2] += "  LIVES";
 // circuitBuilder[3] += "  2";


  for(var i = 0; i <circuitLength; i++) {

    if(i == myCarPos) {
          if(direction === 'left') {
            var myCarBlock = racingCar + zebra + space;
             if(circuitBuilder[i] === myCarBlock) {
                if(score > highscore)
                  highscore = score;
                dead();
             }
              
             else
              circuit += lines + trackSpace + chalk.black.bgGreen("o")+chalk.bgRed("||")+chalk.black.bgGreen("o") + trackSpace + zebra + space + lines + '\n';
          }
          else if(direction === 'right') {
            var myCarBlock = space + zebra + racingCar;
             if(circuitBuilder[i] === myCarBlock) {
              if(score > highscore)
                  highscore = score;
              dead();
             }
               
             else
              circuit += lines + space + zebra + trackSpace + chalk.black.bgGreen("o")+chalk.bgRed("||")+chalk.black.bgGreen("o") + trackSpace + lines + '\n'; 
          }
        }
      switch(i) {

        case 0: circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.bold.red('SCORE') + '\n';
                break;
        case 1: circuit += lines + circuitBuilder[i] + lines + '   '+ chalk.red(score) + '\n';
                break;
        case 2: circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.bold.red('LEVEL') + '\n';
                break;
        case 3: circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.red(level) + '\n';
                break;
        case 4: circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.bold.red('HIGHSCORE') + '\n';
                break;
        case 5: circuit += lines + circuitBuilder[i] + lines + '   ' + chalk.red(highscore) + '\n';
                break;
        default: circuit += lines + circuitBuilder[i] + lines + '\n';
      }
  }
  return circuit;
}
var animator;
function endAnimation() {
  clearInterval(animator);

}

function resetAnimation() {
  endAnimation();
  startAnimation(interval);
}

function dead() {
  circuit = '';
  console.log(chalk.bold.red('\n\n\n\n\n\n\n\n\t\tGAME OVER'));
  endAnimation();
  var highscore = {"highscore" : score};
  fs.stat('highscore.json', function(err, stat) {
    if(err) {
      
      fs.writeFileSync('highscore.json', JSON.stringify(highscore));
    }
    else {
      var hs = JSON.parse(fs.readFileSync('highscore.json').toString());
      if(hs.highscore < score) {
        fs.writeFileSync('highscore.json', JSON.stringify(highscore));
        highscore = score;
      }
    }
  });
  
}


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

function getHighScore() {
  fs.stat('highscore.json', function(err, stat) {
    if(err) {
      highscore = 0;
    }
    else {
      var hs = JSON.parse(fs.readFileSync('highscore.json').toString());
      highscore = hs.highscore;
    }
  });
}

function startAnimation(interval) {
  animator = setInterval(gameLogic, interval );
}

function gameLogic() {

  process.stdin.setRawMode(true);
  process.stdin.resume();
  //lines = chalk.dim.bgYellow(" ") + chalk.bgBlack("| ") + treeGenerator[0] + chalk.bgBlack(" |") + chalk.dim.bgYellow(" ");
    animationCounter++;
    if(animationCounter > 4) {
      animationCounter = 0;
    }
    launchCar(animationCounter);
    score++;
    if(levelTimer > 150) {
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

function getDirection(dir) {
   
  direction = dir;

}

function shuffle(array) {
    var counter = array.length, temp, index;

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

//initializeGame();

