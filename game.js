var keypress = require('keypress');
var tty = require('tty');

keypress(process.stdin);

var direction = 'left';

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
  getDirection(key.name);
}); 

if (typeof process.stdin.setRawMode == 'function') {
  process.stdin.setRawMode(true);
} else {
  tty.setRawMode(true);
}
process.stdin.resume();


var arr =[".", "o", "O", "o"];
var lines = "  ||  ";
var lspace = "   ";
var space = "   ";
var car = "[]";
var noCar = "  ";
var arena = '';


function drawArena() {
for(var i = 0; i <15; i++) {
    if(i == 7) {
      if(direction === 'left')
        arena += lines + car + space + lines + '\n';
      else
        arena += lines + space + car + lines + '\n'; 
    }
  	 
    else
     arena += lines +  noCar + space +  lines + '\n';
  }
  return arena;
}


(function()
        {
            setInterval(function() {
            arena = '';  

              process.stdout.write('\033c');
              console.log(drawArena()); 
            }, 100 );
        })(); 

function getDirection(dir) {
   
  direction = dir;

}

