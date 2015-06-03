/**
 * Created by Funkiona on 2015-05-31.
 */

//Store most imporant game info
var player = {};
var enemie = [];
var arrows = [];
var LVL = 0;


function makeHBar(xPos, yPos, hp, width){

    ctx.fillStyle = "black";
    ctx.fillRect(xPos -5, yPos -20, width + 10, 10);

    ctx.fillStyle = "red";
    var healthP =  hp / 100;

    ctx.fillRect(xPos -5, yPos -20, healthP * width + 10, 10);
}

var render = function () {

    //Display Background image
    if(showBackgroundImage) {
        ctx.drawImage(backgroundImage, 0, 0);
    }

    //Display player and player HP bar
    if(playerReady) {
        ctx.drawImage(playerImage, player.x, player.y);
        makeHBar(player.x, player.y, player.health, 32);
    }


    //Display enemie and enemie HP var
    for(var x = 0; x < enemie.length; x++){
        ctx.drawImage(enemieImage, enemie[x].x, enemie[x].y);
        makeHBar(enemie[x].x, enemie[x].y, enemie[x].health, 67);

    }


    for(var x = 0; x < arrows.length; x++){
        ctx.drawImage(arrowImage, arrows[x].x, arrows[x].y);
    }

    {   //Display LVL
        ctx.fillStyle = "black";
        ctx.font = "24px Helvetica";
        ctx.fillText(LVL, 10, 20);
    }
}   //End of render


function draw(fps) {
    setTimeout(function() {
        requestAnimationFrame(draw);


        fps30 = 0.0333;

        //keyActions();

        //render();
        // Drawing code goes here
    }, 1000 / fps);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


//draw();
