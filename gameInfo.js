/**
 * Created by Funkiona on 2015-06-02.
 */


var canvaswidth = 800;
var canvasheight = 700;


var player = {
    health: 100,
    x: canvaswidth/2,
    y: canvasheight/2
}

var arrows = [];
var enemies = [];


var LVL = 0;

exports.player = player;
exports.enemies = enemies;
exports.arrows = arrows;

function createNewEnemies() {

    LVL += 1;
    //Create an enemie for each LVL
    for(var x = 0; x < LVL; x++) {
        var tempEnemie = {
            health: 100,
            x: 32 + (Math.random() * (canvaswidth - 64)),
            y: 32 + (Math.random() * (canvasheight - 64))
        }

        enemies.push(tempEnemie);
    }
}


exports.sendGame = function() {
    createNewEnemies();



    gameInfo = {
        map: 'images/Bgimage.jpg',
        playerHP: player.health,
        playerX: player.x,
        playerY: player.y,
        LVL: LVL
    }
    return gameInfo;
}


exports.reset = function() {

    console.log("here");

    var resetPlayer = {
       //playerX: canvas.width /2,
        //playerY: canvas.height /2
    }
    //return resetPlayer;
}


exports.getCurrentEnemies = function() {
    return enemies;
}

exports.move = function(dir) {
    // player holding up
    if (dir === 'up' && player.y > 0) player.y -= 5;

    // player holding down
    if(dir === 'down' && player.y < canvasheight) player.y += 5;

    // player holding left
    if (dir === 'left' && player.x > 0) player.x -= 5;

    // player holding right
    if (dir === 'right' && player.x < canvaswidth ) player.x += 5;
}

exports.update = function() {

    time = 0.0333;

    //If there is arrows in the air
    if(arrows.length > 0) {
        for(var x = 0; x < arrows.length; x++) {
            arrows[x].x += arrows[x].Vx * time;
            arrows[x].y += arrows[x].Vy * time;

            //If arrow is outside canvas
            if(arrows[x].x < 0 || arrows[x].x > canvaswidth || arrows[x].y < 0 || arrows[x].y > canvasheight) {
                arrows.splice(x, 1);
                break;
            }

            //Look if any enemie is hit
            for(var i = 0; i < enemies.length; i++) {
                //If arrow hit enemie  (bad htibox)
                if (
                    arrows[x].x <= (enemies[i].x + 50)
                    && enemies[i].x <= (arrows[x].x + 0)
                    && arrows[x].y <= (enemies[i].y + 50)
                    && enemies[i].y <= (arrows[x].y + 50)
                ) {
                    enemies[i].health -= arrows[x].dmg;
                    arrows.splice(x, 1);
                    break;
                }
            }
        }
    }   //End of arrows

    //If any enemie is alive
    for (var i = 0; i < enemies.length; i++) {

        //Look if enemie needs to move
        if (enemies[i].x > player.x + 35) {
            enemies[i].x -= 1;
        }
        if (enemies[i].x + 70 < player.x) {
            enemies[i].x += 1;
        }
        if (enemies[i].y > player.y + 35) {
            enemies[i].y -= 1;
        }
        if (enemies[i].y + 60 < player.y) {
            enemies[i].y += 1;
        }

        if (
            enemies[i].x <= (player.x + 35)
            && player.x <= (enemies[i].x + 70)
            && enemies[i].y <= (player.y + 35)
            && player.y <= (enemies[i].y + 60)
        ) {
            player.health -= 1;
        }

        //Enemie dead?
        if (enemies[i].health <= 0) {
            enemies.splice(i, 1);
        }

    }
    if(enemies.length === 0 && LVL !== 0){
        createNewEnemies();
    }

}

exports.attack = function(mouseX, mouseY) {


    var tempArrow = {
        speed: 500,
        dmg: 100,
        x: 0,
        y: 0,
        Vx: 0,
        Vy: 0

    }

    tempArrow.x = player.x;
    tempArrow.y = player.y;

    var deltaX = 0;
    var deltaY = 0;


    //If click is abbow and to the right of player
    if (player.x < mouseX && player.y > mouseY) {

        deltaX = mouseX - player.x;
        deltaY = player.y - mouseY;

        CosPlusSin = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
        var hypotenuse = Math.sqrt(CosPlusSin);

        var angle = deltaX / hypotenuse;
        var angle1 = deltaY / hypotenuse;

        tempArrow.Vx = tempArrow.speed * angle;
        tempArrow.Vy = -tempArrow.speed * angle1;
    }

    //If click is abbow and to the left of player
    if (player.x > mouseX && player.y > mouseY) {

        deltaX = player.x - mouseX;
        deltaY = player.y - mouseY;

        CosPlusSin = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
        var hypotenuse = Math.sqrt(CosPlusSin);

        var angle = deltaX / hypotenuse;
        var angle1 = deltaY / hypotenuse;

        tempArrow.Vx = -tempArrow.speed * angle;
        tempArrow.Vy = -tempArrow.speed * angle1;
    }

    //If click is bellow and to the left of player
    if (player.x > mouseX && player.y < mouseY) {

        deltaX = player.x - mouseX;
        deltaY = player.y - mouseY;

        CosPlusSin = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
        var hypotenuse = Math.sqrt(CosPlusSin);

        var angle = deltaX / hypotenuse;
        var angle1 = deltaY / hypotenuse;

        tempArrow.Vx = -tempArrow.speed * angle;
        tempArrow.Vy = -tempArrow.speed * angle1;
    }

    //If click is bellow and to the right of player
    if (player.x < mouseX && player.y < mouseY) {

        deltaX = player.x - mouseX;
        deltaY = player.y - mouseY;

        CosPlusSin = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
        var hypotenuse = Math.sqrt(CosPlusSin);

        var angle = deltaX / hypotenuse;
        var angle1 = deltaY / hypotenuse;

        tempArrow.Vx = -tempArrow.speed * angle;
        tempArrow.Vy = -tempArrow.speed * angle1;
    }


    arrows.push(tempArrow);


    console.log(arrows[0]);
    //arrowReady.push(true);

    return arrows;
}