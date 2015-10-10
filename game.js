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
function initializeCircuit() {
  for(var i = 0; i <10; i++) {
    circuitBuilder[i] = lines + space + space + lines + '\n';
    circuit += circuitBuilder[i];  
  }
  return circuit;
}

//var arenaBluePrint = lines + compCar[0] + compCar[1] + lines + '\n';

function launchCar(animationCounter) {
  var circuitBlock;
  circuitBuilder.pop();

 // circuitBuilder.pop();
 // circuitBuilder.pop();
 if(animationCounter == 2)
    circuitBlock = lines + compCar[0] + compCar[1] + lines + '\n';
  else
    circuitBlock = lines + space + space + lines + '\n';
 // circuitBuilder.unshift(lines + space + space + lines + '\n')
  circuitBuilder.unshift(circuitBlock);
 // circuitBuilder.unshift(lines + space + space + lines + '\n');
}

function drawCircuit() {

  

  for(var i = 0; i <10; i++) {
    if(i == 7) {
          if(direction === 'left')
            circuit += lines + car + space + lines + '\n';
          else
            circuit += lines + space + car + lines + '\n'; 
        }
    circuit += circuitBuilder[i];
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


(function()
        {   process.stdout.write('\033c');
            console.log(initializeCircuit());
            setInterval(function() {
              animationCounter++;
              if(animationCounter > 5) {
                toggle = !toggle;
                animationCounter = 0;
              }
              launchCar(animationCounter);
                

              shuffle(compCar);
              // }
                
              // else
              //   carPos++;
              circuit = '';  

              process.stdout.write('\033[2f');
              console.log(drawCircuit()); 
            }, 100 );
        })(); 

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

