var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

var circleStart: number = 0;
var circleEnd: number = 2*Math.PI;

var xBorderWest: number = 5;
var xBorderEast: number = 1275;
var yBorderNorth: number = 5;
var yBorderSouth: number = 715;

var objX: number = 100;
var objY: number = 200;
var objW: number = 200;
var objH: number = 100;

var inWorldBtnSize: number = 50;
var inWorldBtnX: number = objX + inWorldBtnSize;
var inWorldBtnY: number = objY + inWorldBtnSize;
var inWorldBtnActive: number = 0;

function gameLoop() {
    
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.rect(xBorderWest,yBorderNorth,1270,710);
    ctx.stroke();
    

    ctx.fillStyle = "gray";
    ctx.fillRect(objX,objY,objW,objH);
    
    ctx.fillStyle = "red";
    ctx.fillRect(inWorldBtnX, inWorldBtnY, inWorldBtnSize, inWorldBtnSize);
    
    //Player
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(player.getX(), player.getY(), player.getDiameter(), circleStart, circleEnd);
    ctx.fillStyle = "white";
    ctx.stroke();
    
    
}

class Player {
    private x: number;
    private y: number;
    private xVel: number;
    private yVel: number;
    private diameter: number;
    constructor(x: number = 0, y: number = 0, xVel:number = 10,yVel:number = 10, diameter:number = 10) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.diameter = diameter;
    }
    
    //GET
    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }
    public getxVel(): number {
        return this.xVel;
    }
    public getyVel(): number {
        return this.yVel;
    }
    public getDiameter(): number {
        return this.diameter;
    }
    
    //SET
    public setX(newX: number): void {
        this.x = newX ;
    }
    public setY(newY: number): void {
        this.y = newY;
    }
    
    public move(direction: string) {
        switch(direction){
            case 'up': {
                if(isColliding(direction)){
                    return;
                }
                this.y -= 2;
                return;
            }
            case 'down': {
                if(isColliding(direction)){
                    return;
                }
                this.y += 2;
                return;
            }
            case 'left': {
                if(isColliding(direction)){
                    return;
                }
                this.x -= 2;
                return;
            }
            case 'right': {
                if(isColliding(direction)){
                    return;
                }
                this.x += 2;
                return;
            }
        }
    }
}

class cKeyboardInput {
    public keyCallback: { [keycode: number]: (arg: string) => void; } = {};
    public keyDown: { [keycode: number]: boolean; } = {};
    private callbackArgs: { [keycode: number]: string; } = {};
    constructor() {
        document.addEventListener('keydown', this.keyboardDown);
        document.addEventListener('keyup', this.keyboardUp);
    }

    public addKeycodeCallback = (keycode: number, f: (arg: string) => void, arg: string): void => {
        this.keyCallback[keycode] = f;
        this.callbackArgs[keycode] = arg;
        this.keyDown[keycode] = false;
    }

    public keyboardDown = (event: KeyboardEvent): void => {
        if (this.keyCallback[event.keyCode] != null) {
            event.preventDefault();
        }
        this.keyDown[event.keyCode] = true;
    }

    public keyboardUp = (event: KeyboardEvent): void => {
        this.keyDown[event.keyCode] = false;
    }

    public inputLoop = (): void => {
        for (var key in this.keyDown) {
            var is_down: boolean = this.keyDown[key];

            if (is_down) {
                var callback: (arg: string) => void = this.keyCallback[key];
                if (callback != null) {
                    player.move(this.callbackArgs[key]);
                }
            }
        }
    }
}

function isColliding(direction: string): boolean{
    function collisionOffset(): number{
        switch (direction){
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

var keyInput: cKeyboardInput;

var player: Player;

window.onload = () => {

    alert("Hello");

    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
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
}



/*
 * OLD
 * COMPILE WITH COMMAND: 'tsc app/app.ts' IN BASH
 */
