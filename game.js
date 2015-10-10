var keypress = require('keypress');
var tty = require('tty');

keypress(process.stdin);

var direction = 'left';

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  
  if (key && key.ctrl && key.name == 'c') {
    process.stdout.write('\033c');
    process.exit(1);
  }
  getDirection(key.name);
}); 

if (typeof process.stdin.setRawMode == 'function') {
  process.stdin.setRawMode(true);
} else {
  tty.setRawMode(true);
}
process.stdin.resume();


var lines = "  ||  ";
var space = "    ";
var car = " [] ";
var circuit = '';
var carPos = 0;
var compCar = [" [] ", "    "];
var animationCounter = 0;
var circuitBuilder = [];
var toggle = false;
var score = 0;
var lives = 3;
var level = 1;
var levelTimer = 0;
var interval = 100;

function initializeCircuit() {
  for(var i = 0; i <10; i++) {
    circuitBuilder[i] = lines + space + space + lines;
    circuit += circuitBuilder[i] + '\n';  
  }
  return circuit;
}

//var arenaBluePrint = lines + compCar[0] + compCar[1] + lines + '\n';

function launchCar(animationCounter) {
  var circuitBlock;
  circuitBuilder.pop();

 // circuitBuilder.pop();
 // circuitBuilder.pop();
 if(animationCounter == 1)
    circuitBlock = lines + compCar[0] + compCar[1] + lines;
  else
    circuitBlock = lines + space + space + lines;
 // circuitBuilder.unshift(lines + space + space + lines + '\n')
  circuitBuilder.unshift(circuitBlock);
 // circuitBuilder.unshift(lines + space + space + lines + '\n');
}

function drawCircuit() {

  //circuitBuilder[0] = circuitBuilder[0] + "  SCORE";
 // circuitBuilder[1] += "  1";
 // circuitBuilder[2] += "  LIVES";
 // circuitBuilder[3] += "  2";


  for(var i = 0; i <10; i++) {

    if(i == 7) {
          if(direction === 'left') {
            var myCarBlock = lines + car + space + lines;
             if(circuitBuilder[i] === myCarBlock)
               gameOver();
             else
              circuit += lines + car + space + lines + '\n';
          }
          else {
            var myCarBlock = lines + space + car + lines;
             if(circuitBuilder[i] === myCarBlock)
               gameOver();
             else
              circuit += lines + space + car + lines + '\n'; 
          }
        }
      switch(i) {

        case 0: circuit += circuitBuilder[i] + '\tSCORE' + '\n';
                break;
        case 1: circuit += circuitBuilder[i] + '\t'+score + '\n';
                break;
        case 2: circuit += circuitBuilder[i] + '\tLIVES' + '\n';
                break;
        case 3: circuit += circuitBuilder[i] + '\t' + lives + '\n';
                break;
        case 4: circuit += circuitBuilder[i] + '\tLEVEL' + '\n';
                break;
        case 5: circuit += circuitBuilder[i] + '\t' + level + '\n';
                break;
        case 5: circuit += circuitBuilder[i] + '\t' + level + '\n';
                break;
        default: circuit += circuitBuilder[i] + '\n';
      }
    //  circuit += circuitBuilder[i] + '\tSCORE' +  '\n';

  }
  //circuit = circuitBuilder.toString();
  //carPos = i;
    
  //   if(i == carPos) 
  //     circuit += lines + compCar[0] + compCar[1] + lines + '\n';	 
  //   else
  //     circuit += lines +  noCar + space +  lines + '\n';
  // }
  return circuit;
}
var animator;
function endAnimation() {
  clearInterval(animator);

}


function initializeGame() {   
  process.stdout.write('\033c');
  console.log(initializeCircuit());
  endAnimation(interval);
  
}

function startAnimation(interval) {
  animator = setInterval(gameLogic, interval );
}

function gameLogic() {
    animationCounter++;
    if(animationCounter > 3) {
      toggle = !toggle;
      animationCounter = 0;
    }
    launchCar(animationCounter);
    score++;
    if(levelTimer > 100) {
      levelTimer = 0;
      level++;
      interval -= 10;
      gameOver();
      startAnimation(interval);
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

initializeGame();

