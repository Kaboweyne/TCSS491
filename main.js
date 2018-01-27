var dimensions = [110,100,100,100,95,90,90,110]
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    offset = -.1*this.currentFrame();
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset + this.startX, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "#29fd5b";
    ctx.fillRect(0,500,800,300);
    Entity.prototype.draw.call(this);
}

/*Animation(spriteSheet, frameWidth, frameHeight, sheetWidth,
frameDuration, frames, loop, scale, xOffset, yOffset, saveLast, leftOrRight)*/
/*
	For reverse do: OverallSpriteWidth - regularXoffset - frameWidth.
*/
function Scorpion(game) {
	//this.x = x;
	//this.y = y;
	//this.game = game;
    //this.spritesheet = spritesheet;
    //function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) 
    //this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/GokuSS.png"),58, 128, 7, 0.10, 7, true, 2, 88, 23, false, "right");
    //this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/scorpion.png"), 88, 23 , 58, 128, .2,7, true, false);
	// this.moveAnimation = new Animation(spritesheet,
	// 	57.5, 128, 8, 0.10, 8, true, 2, 18, 182, false, "right");
	// this.crouchAnimation = new Animation(spritesheet,
	// 	57.5, 128, 2, 0.10, 2, false, 2, 984, 23, true, "right");

	// this.moveLeftAnimation = new Animation(revesrseSprite,
	// 	57.5, 128, 8, 0.10, 8, true, 2, 1743.5, 182, false, "left");

	// this.idleLeftAnimation = new Animation(revesrseSprite,
	// 	58, 128, 7, 0.10, 7, true, 2, 1673, 23, false, "left");

	// this.crouchLeftAnimation = new Animation(revesrseSprite,
	// 	57.5, 128, 2, 0.10, 2, false, 2, 777.5, 23, true, "left");
	
	// this.currentAnimation = this.idleAnimation;
	// this.speed = 5;
	// this.ctx = game.ctx;

	// this.movingRight = false;
	// this.idling = true;
	// this.crouching = false;
	// this.movingLeft = false;
    // this.facing = "R";
    Entity.call(this, game, 0, 400);
}
function Goku(game) {
    //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 0, 0, 206, 110, 0.02, 30, true, true);
   // (spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
   this.animation = new Animation(ASSET_MANAGER.getAsset("./img/GokuSS.png"), 3, 890, 110, 121, .2, 6, true, true);
   this.kickAnimation = new Animation(ASSET_MANAGER.getAsset("./img/GokuSS.png"), 0, 2383, 163, 158,.1, 6, false, false);
   this.kickC1Animation = new Animation(ASSET_MANAGER.getAsset("./img/GokuSS.png"), 0, 2383, 163, 158,.1, 6, false, false);

   this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/GokuSS.png"), 0, 1415, 108, 162, .1, 8, false, false);
   this.leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/GokuSS.png"), 0, 1710, 140, 120, .2, 3, false, false);
   this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/GokuSS.png"), 0, 1840, 114, 143, .2, 3, false, false);
    this.jumping = false;
    this.kicking = false;
    this.m_left = false;
    this.radius = 100;
    this.ground = 400;
    Entity.call(this, game, 0, 400);
}

Goku.prototype = new Entity();
Scorpion.prototype = new Entity();
Goku.prototype.constructor = Goku;
Scorpion.prototype.constructor = Scorpion;

var count = 0;
Scorpion.prototype.update = function () {
    if(this.idleAnimation.isDone())
    {
        this.idleAnimation.elapsedTime = 0;
    }
    Entity.prototype.update.call(this);
}

Goku.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.game.kick) this.kicking = true;
    if(this.game.left){ this.m_left = true;} //else {this.m_left = false;}
    if(this.game.right) this.m_right = true;
    
   // this.animation.elapsedTime = 1;

    //console.log("I'm kicking " + this.kicking);
    //console.log("I'm jumping " + this.jumping);
    if(this.kicking) {
       //console.log("I got here");
        if (this.kickAnimation.isDone()) {
            this.kickAnimation.elapsedTime = 0;
            this.kicking = false;
        }
    }
    if(this.m_left) { 
        if (this.leftAnimation.isDone()) {
            this.leftAnimation.elapsedTime = 0;
            this.m_left = false;
        }
     

        
        
        
        
        var leftDistance = this.leftAnimation.elapsedTime / this.leftAnimation.totalTime;
        var totalDistance = 10;
        this.x -= leftDistance+5;
    }
    if(this.m_right) { 
        if (this.rightAnimation.isDone()) {
            this.rightAnimation.elapsedTime = 0;
            this.m_right = false;
        }
     

        
        
        
        
        var rightDistance = this.rightAnimation.elapsedTime / this.rightAnimation.totalTime;
        var totalDistance = 10;
        this.x += rightDistance+5;
    }  
    /* this.speed * this.game.clocktick
    Use this to calculate speed
    */


    //} else {
    //     console.log("I got here");
    //     this.leftAnimation.elapsedTime = 0;
    //     this.m_left = false;
    // }

    
    if (this.jumping) {
        
        //console.log("I got here");
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
        }

        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
       // this.jumpAnimation.frameWidth -= 
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
    Entity.prototype.update.call(this);
}

Scorpion.prototype.draw = function (ctx) {
    this.idleAnimation.drawFrame(this.game.clockTick,ctx,this.x + 200, this.y);
    Entity.prototype.draw.call(this);
}
Goku.prototype.draw = function (ctx) {
    //time = this.leftAnimation.elapsedTime;
    
    if (this.jumping) {
        
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 517, this.y - 34);
        var that = this;
        if(this.kicking) {
            this.jumping = false;
            this.kickAnimation.drawFrame(this.game.clockTick, ctx, this.x+500, this.y);
            console.log(this.kickAnimation.isDone());
            if(this.kicking == false) {
                //this.jumping
                
               // console.log(this.jumpAnimation.elapsedTime);
                //this.jumping = true; 
            }
            
            //this.jumpAnimation.elapsedTime = this.ga
            
        }
    }
    else if(this.kicking) {
        this.kickAnimation.drawFrame(this.game.clockTick, ctx, this.x+500, this.y);
    }
    else if (this.m_left) {
        this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x+500, this.y);
    }
    
    else if (this.m_right) {
        this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x+500, this.y);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, (this.x)+500, this.y);
    }
    
    // }else {
    //     this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    // }
    
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/RobotUnicorn.png");
ASSET_MANAGER.queueDownload("./img/GokuSS.png");
ASSET_MANAGER.queueDownload("./img/scorpion.png");
ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var goku = new Goku(gameEngine);
    //var scorpion = new Scorpion(gameEngine);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(goku);
    //gameEngine.addEntity(scorpion);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
