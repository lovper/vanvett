var canvas;
var ctx;
var circleStart = 0;
var circleEnd = 2 * Math.PI;
var xBorderWest = 5;
var xBorderEast = 1275;
var yBorderNorth = 5;
var yBorderSouth = 715;
var objX = 100;
var objY = 200;
var objW = 200;
var objH = 100;
var inWorldBtnSize = 50;
var inWorldBtnX = objX + inWorldBtnSize;
var inWorldBtnY = objY + inWorldBtnSize;
var inWorldBtnActive = 0;
function gameLoop() {
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.rect(xBorderWest, yBorderNorth, 1270, 710);
    ctx.stroke();
    ctx.fillStyle = "gray";
    ctx.fillRect(objX, objY, objW, objH);
    ctx.fillStyle = "red";
    ctx.fillRect(inWorldBtnX, inWorldBtnY, inWorldBtnSize, inWorldBtnSize);
    //Player
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(player.getX(), player.getY(), player.getDiameter(), circleStart, circleEnd);
    ctx.fillStyle = "white";
    ctx.stroke();
}
var Player = /** @class */ (function () {
    function Player(x, y, xVel, yVel, diameter) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (xVel === void 0) { xVel = 10; }
        if (yVel === void 0) { yVel = 10; }
        if (diameter === void 0) { diameter = 10; }
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.diameter = diameter;
    }
    //GET
    Player.prototype.getX = function () {
        return this.x;
    };
    Player.prototype.getY = function () {
        return this.y;
    };
    Player.prototype.getxVel = function () {
        return this.xVel;
    };
    Player.prototype.getyVel = function () {
        return this.yVel;
    };
    Player.prototype.getDiameter = function () {
        return this.diameter;
    };
    //SET
    Player.prototype.setX = function (newX) {
        this.x = newX;
    };
    Player.prototype.setY = function (newY) {
        this.y = newY;
    };
    Player.prototype.move = function (direction) {
        switch (direction) {
            case 'up': {
                if (isColliding(direction)) {
                    return;
                }
                this.y -= 2;
                return;
            }
            case 'down': {
                if (isColliding(direction)) {
                    return;
                }
                this.y += 2;
                return;
            }
            case 'left': {
                if (isColliding(direction)) {
                    return;
                }
                this.x -= 2;
                return;
            }
            case 'right': {
                if (isColliding(direction)) {
                    return;
                }
                this.x += 2;
                return;
            }
        }
    };
    return Player;
}());
var cKeyboardInput = /** @class */ (function () {
    function cKeyboardInput() {
        var _this = this;
        this.keyCallback = {};
        this.keyDown = {};
        this.callbackArgs = {};
        this.addKeycodeCallback = function (keycode, f, arg) {
            _this.keyCallback[keycode] = f;
            _this.callbackArgs[keycode] = arg;
            _this.keyDown[keycode] = false;
        };
        this.keyboardDown = function (event) {
            if (_this.keyCallback[event.keyCode] != null) {
                event.preventDefault();
            }
            _this.keyDown[event.keyCode] = true;
        };
        this.keyboardUp = function (event) {
            _this.keyDown[event.keyCode] = false;
        };
        this.inputLoop = function () {
            for (var key in _this.keyDown) {
                var is_down = _this.keyDown[key];
                if (is_down) {
                    var callback = _this.keyCallback[key];
                    if (callback != null) {
                        player.move(_this.callbackArgs[key]);
                    }
                }
            }
        };
        document.addEventListener('keydown', this.keyboardDown);
        document.addEventListener('keyup', this.keyboardUp);
    }
    return cKeyboardInput;
}());
function isColliding(direction) {
    function collisionOffset() {
        switch (direction) {
            case 'up': {
                return Math.abs(yBorderNorth - player.getY() - player.getDiameter());
            }
            case 'down': {
                return Math.abs(yBorderSouth - player.getY() - player.getDiameter());
            }
            case 'left': {
                return Math.abs(xBorderWest - player.getX() - player.getDiameter());
            }
            case 'right': {
                return Math.abs(xBorderEast - player.getX() - player.getDiameter());
            }
        }
    }
    return (collisionOffset() <= 10);
}
var keyInput;
var player;
window.onload = function () {
    alert("Hello");
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    keyInput = new cKeyboardInput();
    player = new Player();
    // PRESS LEFT ARROW OR 'A' KEY
    keyInput.addKeycodeCallback(37, player.move, 'left');
    keyInput.addKeycodeCallback(65, player.move, 'left');
    // PRESS UP ARROW OR 'W' KEY
    keyInput.addKeycodeCallback(38, player.move, 'up');
    keyInput.addKeycodeCallback(87, player.move, 'up');
    // PRESS RIGHT ARROW OR 'D' KEY
    keyInput.addKeycodeCallback(39, player.move, 'right');
    keyInput.addKeycodeCallback(68, player.move, 'right');
    // PRESS DOWN ARROW OR 'S' KEY
    keyInput.addKeycodeCallback(40, player.move, 'down');
    keyInput.addKeycodeCallback(83, player.move, 'down');
    gameLoop();
};
/*
 * OLD
 * COMPILE WITH COMMAND: 'tsc app/app.ts' IN BASH
 */
//# sourceMappingURL=app.js.map