/**
 * Created by Funkiona on 2015-05-31.
 */


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

/* If fullscreen    later
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
*/

canvas.width = 800;
canvas.height = 700;

gamewindow = document.getElementById("gamewindow");
gamewindow.appendChild(canvas);

// Background image
var showBackgroundImage = true;
var backgroundImage = new Image();
backgroundImage.onload = function () {
    bgReady = true;
};
backgroundImage.src = null;

// Hero image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
    playerReady = true;
};
playerImage.src = "images/hero.png";

var arrowReady = [];
var arrowImage = new Image();
arrowImage.onload = function (x) {
    //arrowReady[x] = true;
};
arrowImage.src = "images/heroarrow.png";

var enemieReady = [];
var enemieImage = new Image();
enemieImage.onload = function () {
    //enemieReady[x] = true;
};
enemieImage.src = "images/E1.png";

