
var ballGravity = false;
var prevScore = 0;
var topScore = 0;
var gameOver = true;
var gameReset = true;





class Vec
{
  constructor(x = 0, y = 0)
  {
    this.x = x;
    this.y = y;
  }
}

class Rect
{
  constructor(w, h)
  {
    this.pos = new Vec();
    this.size = new Vec(w, h);
  }
  get left()
  {
    return this.pos.x - this.size.x / 2;
  }
  get right()
  {
    return this.pos.x + this.size.x / 2;
  }
  get top()
  {
    return this.pos.y - this.size.y / 2;
  }
  get bottom()
  {
    return this.pos.y + this.size.y / 2;
  }
}

class Net extends Rect
{
  constructor()
  {
    super(210,55);
    this.vel = new Vec();
  }
}
class Ball extends Rect
{
  constructor()
  {
    super(20,20);
    this.vel = new Vec();
  }
}
class Player extends Rect
 {
   constructor()
   {
      super(60, 200);
      this.vel = new Vec();
   }
 }
class Main
{
  constructor(canvas)
  {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this.net = new Net();
    this.net.pos.x = this._canvas.width/2;
    this.net.pos.y = this._canvas.height - this._canvas.height/10 ;
    this.net.vel.x = 0;
    this.net.vel.y = 0;
    this.ball = new Ball();
    this.ball.pos.x = this._canvas.width/6;
    this.ball.pos.y = this._canvas.height - this._canvas.height/3;
    this.ball.vel.x = 0;
    this.ball.vel.y = 0;
    this.players = [
      new Player(),
      new Player(),
      ];
      this.players[0].pos.x = 40;
      this.players[1].pos.x = this._canvas.width -40;
      this.players.forEach(player => {
        player.pos.y = this._canvas.height - this._canvas.height/3;
      });
      this.players[0].vel.y = 0;

    let lastTime;
    const callback = (millis) => {
        if (lastTime) {
          this.update((millis - lastTime) / 1000);
        }
        lastTime = millis;
        requestAnimationFrame(callback);
      };
      callback();
  }
 collide(player, ball)
  {
    if (player.left < ball.right && player.right > ball.left &&
        player.top < ball.bottom && player.bottom > ball.top) {
        ballGravity = false;
        if(this.ball.vel.x <= 0){
        if(gameOver === false){
        prevScore += 1;
         }
        this.ball.vel.x = 1.5 *(this.net.pos.x -(this.ball.pos.x));
         }else{
        this.ball.vel.x = 1.5 *(this.net.pos.x -(this.ball.pos.x));
        }
        if(this.ball.vel.y > 0){
        this.ball.vel.y = 1.5*(this.net.pos.y - (this.ball.pos.y));
          }else{
        this.ball.vel.y = 1.5*(this.net.pos.y - (this.ball.pos.y));
        
          }
      }
  }
draw(){
    this._context.fillStyle = '#000000';
    this._context.fillRect(0,0, this._canvas.width, this._canvas.height);
    this.drawnet(this.net);
    this.drawball(this.ball);
    this.drawplayer0(this.players[0]);
    this.drawplayer1(this.players[1]);
  }
  drawplayer0(rect){
    this._context.fillStyle = '#ffffff';
    this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
  drawplayer1(rect){
    this._context.fillStyle = '#ffffff';
    this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
  drawnet(rect){
    this._context.fillStyle = '#ffffff';
    this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
  drawball(rect){
    this._context.fillStyle = '#ffffff';
    this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

update(dt) {
    displayResults();
   if (gameOver === true){
   this.ball.vel.x = 0;
   this.ball.vel.y = 0;
   this.players[0].vel.x = 0;
   this.players[0].vel.y = 0;
   }
   this.ball.pos.y += (this.ball.vel.y * dt);
   this.ball.pos.x += (this.ball.vel.x * dt);
   this.players[0].pos.y += (this.players[0].vel.y * dt);
   this.players[0].pos.x += (this.players[0].vel.x * dt);
   
    if(ballGravity === true){
    this.ball.vel.y += (11);
    }
    if(this.players[0].pos.y < this._canvas.height - this._canvas.height/3){
    this.players[0].vel.y += (30);
    }
    
    if (prevScore > topScore){
     topScore = prevScore;
    }
   
    if(this.net.bottom > this.ball.top && this.net.top < this.ball.bottom && this.net.right > this.ball.left && this.net.left < this.ball.right ) {
      randomNetPos();
      ballGravity = true;
      if(this.ball.vel.x > 0){
        this.ball.vel.x = (this.ball.vel.x + 200);
        }
      if(this.ball.vel.x < 0){
        this.ball.vel.x = (this.ball.vel.x - 200);
        }
     
      if(this.ball.vel.y > 0){
        this.ball.vel.y = -(this.ball.vel.y + 250);
        }
    }

    if(this.net.pos.x > this._canvas.width){
     this.net.pos.x =  this._canvas.width;
     }
    if(this.net.pos.x < 0){
     this.net.pos.x = 0;
     }
     
    if(this.players[0].pos.y > this._canvas.height - this._canvas.height/3){
     this.players[0].vel.y =  -0.1 * (this.players[0].vel.y);
    }
    if(this.players[0].pos.y < 0){
     this.players[0].vel.y =  -this.players[0].vel.y;
    }
    if(this.players[0].pos.x > this._canvas.width){
     this.players[0].pos.x =  this._canvas.width;
     }
    if(this.players[0].pos.x < 0){
     this.players[0].pos.x = 0;
     }
     
    if(this.ball.right > this._canvas.width - 5 || this.ball.left < 0) {
      gameOver = true;
    }
    if(this.ball.top < 0) {
      this.ball.vel.y = -this.ball.vel.y;
    }
    if(this.ball.bottom > this._canvas.height){
     gameOver = true;
    }
    
    if (gameOver === false){
     document.onkeydown = checkKey;
    }else{
      document.onkeydown = null;
      }
    this.players[1].pos.y = this.ball.pos.y;
    this.players.forEach(player => this.collide(player, this.ball));
    this.draw();
  }
}

const canvas = document.getElementById('mainCanvas');
const STUFF = new Main(canvas);


      
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
   
      STUFF.players[0].vel.y = STUFF.players[0].vel.y -650;
    }else{
     if (e.keyCode == '83') {
      STUFF.players[0].vel.y = STUFF.players[0].vel.y +300;
     }
  }
}
  
  
function displayResults(){

document.getElementById("Results").innerHTML = "Score: " + prevScore + " Top Score: " + topScore;

}
var startButton = document.getElementById('startButton');
var resetButton = document.getElementById('resetButton');
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);


function resetGame(){

  prevScore = 0;
  gameOver = true;
  gameReset = true;
  ballGravity = false;
  displayResults();
    STUFF.net.pos.x = STUFF._canvas.width/2;
    STUFF.net.pos.y = STUFF._canvas.height - STUFF._canvas.height/10;
    STUFF.net.vel.x = 0;
    STUFF.net.vel.y = 0;
    STUFF.ball.pos.x = STUFF._canvas.width/6;
    STUFF.ball.pos.y = STUFF._canvas.height - STUFF._canvas.height/3;
    STUFF.ball.vel.x = 0;
    STUFF.ball.vel.y = 0;
    STUFF.players[0].pos.x = 40;
    STUFF.players[1].pos.x = STUFF._canvas.width -40;
    STUFF.players[0].pos.y = STUFF._canvas.height - STUFF._canvas.height/3;
    STUFF.players[1].pos.y = STUFF._canvas.height - STUFF._canvas.height/3;
}
function startGame(){
  if(gameReset === true){
  prevScore = 0;
  gameOver = false;
  STUFF.ball.vel.x = -800;
  gameReset = false;
  }
}

function randomNetPos(){
  STUFF.net.pos.x = Math.floor((Math.random() -0.5) * 400)+600;

}