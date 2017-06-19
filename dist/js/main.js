var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = (function () {
    function Player(screenBox) {
        var _this = this;
        this.x = 400;
        this.y = 300;
        this.screenBox = screenBox;
        this.width = 40;
        this.height = 20;
        this._speed = 3;
        this.createCar();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Object.defineProperty(Player.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.createCar = function () {
        this.div = document.createElement('car');
        var screen = document.getElementById('screen');
        screen.appendChild(this.div);
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 65:
                if (!(this.x - 45 < this.screenBox.left)) {
                    this.x -= this.width;
                }
                break;
            case 68:
                if (!(this.x + 135 > this.screenBox.right)) {
                    this.x += this.width;
                }
                break;
            case 87:
                if (!(this.y > this.screenBox.bottom + this.height)) {
                    this.y -= this.height;
                }
                break;
            case 83:
                if (!(this.y < this.screenBox.top + this.height)) {
                    this.y += this.height;
                }
                break;
        }
    };
    Player.prototype.move = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Player;
}());
var GameObject = (function () {
    function GameObject(tag, parent) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }
    return GameObject;
}());
var Vehicles = (function (_super) {
    __extends(Vehicles, _super);
    function Vehicles(game) {
        var _this = _super.call(this, "policecar", document.body) || this;
        _this.speed = 0;
        _this.y = 100;
        _this.x = 100;
        _this.width = 168;
        _this.height = 108;
        _this.speed = Math.random() * 2 + 2;
        _this.createPoliceCar();
        _this.update();
        return _this;
    }
    Vehicles.prototype.update = function () {
        this.x += this.speed;
        if (this.x > window.innerWidth) {
            this.div.remove();
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Vehicles.prototype.createPoliceCar = function () {
        this.div = document.createElement('policecar');
        var road = document.getElementById('road');
        road.appendChild(this.div);
    };
    return Vehicles;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.running = false;
        this.Vehicle = new Array();
        this.screen = document.getElementsByTagName('screen')[0];
        this.screenBox = this.screen.getBoundingClientRect();
        this.createRoads();
        this.menu = new Menu(this);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.start = function () {
        this.points = 0;
        this.running = true;
        this.timer = new Timer(this, true);
        this.car = new Player(this.screenBox);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.running) {
            this.updateObjects();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.updateObjects = function () {
        this.updateRoad();
        this.car.move();
    };
    Game.prototype.createRoads = function () {
        var height = this.screenBox.height;
        this.roads = [];
        for (var i = 0; i < 3; i++) {
            var roadHeight = height * i - height;
            var road = new Road(this, roadHeight);
            this.roads.push(road);
        }
    };
    Game.prototype.updateRoad = function () {
        for (var i = 0; i < this.roads.length; i++) {
            this.roads[i].update();
        }
    };
    return Game;
}());
var Level = (function () {
    function Level() {
    }
    return Level;
}());
window.addEventListener('load', function () {
    var game = new Game();
});
var Menu = (function () {
    function Menu(game) {
        this.game = game;
        this.createStartButton();
        this.createMenuButton();
        this.createMenu();
    }
    Menu.prototype.createStartButton = function () {
        var _this = this;
        this.startButtonDiv = document.createElement('start');
        this.startButtonDiv.innerHTML = 'START';
        this.game.screen.appendChild(this.startButtonDiv);
        this.startButtonDiv.addEventListener('click', function (e) { return _this.startButtonClickHandler(e); });
        this.startButtonDiv.addEventListener('touchdown', function (e) { return _this.startButtonClickHandler(e); });
    };
    Menu.prototype.createMenuButton = function () {
        var _this = this;
        this.menuButtonDiv = document.createElement('menuButton');
        this.game.screen.appendChild(this.menuButtonDiv);
        this.menuButtonDiv.addEventListener('click', function (e) { return _this.menuButtonClickHandler(e); });
        this.menuButtonDiv.addEventListener('touchdown', function (e) { return _this.menuButtonClickHandler(e); });
        this.menuButtonDiv.style.display = 'none';
        this.isMenuOpened = false;
    };
    Menu.prototype.createMenu = function () {
        var _this = this;
        this.menuDiv = document.createElement('menu');
        var continueButton = document.createElement('menuContinue');
        continueButton.classList.add('menu');
        continueButton.innerHTML = 'Continue';
        continueButton.addEventListener('click', function (e) { return _this.menuButtonClickHandler(e); });
        continueButton.addEventListener('touchdown', function (e) { return _this.menuButtonClickHandler(e); });
        this.menuDiv.appendChild(continueButton);
        var quitButton = document.createElement('menuQuit');
        quitButton.classList.add('menu');
        quitButton.innerHTML = 'Quit';
        quitButton.addEventListener('click', function (e) { return _this.onQuit(e); });
        quitButton.addEventListener('touchdown', function (e) { return _this.onQuit(e); });
        this.menuDiv.appendChild(quitButton);
        this.game.screen.appendChild(this.menuDiv);
        this.menuDiv.style.display = 'none';
        this.menuDiv.style.transform = "translateX(-200%)";
        this.menuDiv.style.display = 'block';
    };
    Menu.prototype.startButtonClickHandler = function (event) {
        if (event.target.nodeName == "START") {
            this.startButtonDiv.style.transform = "translateY(calc(-50vh - 25px))";
            this.menuButtonDiv.style.display = 'block';
            this.game.start();
        }
    };
    Menu.prototype.menuButtonClickHandler = function (event) {
        if (event.target.nodeName == "MENUBUTTON" || event.target.nodeName == "MENUCONTINUE") {
            if (this.isMenuOpened) {
                this.hideMenu();
                this.game.running = true;
                this.isMenuOpened = false;
            }
            else {
                this.displayMenu();
                this.game.running = false;
                this.isMenuOpened = true;
            }
        }
    };
    Menu.prototype.displayStart = function () {
        this.menuDiv.style.zIndex = '10';
        this.startButtonDiv.style.transform = "translateY(0)";
    };
    Menu.prototype.displayMenu = function () {
        this.menuDiv.style.display = 'block';
        this.menuDiv.style.zIndex = '10';
        this.menuDiv.style.transform = "translateX(0)";
    };
    Menu.prototype.hideMenu = function () {
        this.menuDiv.style.display = 'block';
        this.menuDiv.style.transform = "translateX(-200%)";
    };
    Menu.prototype.onQuit = function (e) {
        this.game.running = false;
        this.menuButtonDiv.style.display = 'none';
        this.hideMenu();
        this.isMenuOpened = false;
        this.game.timer.destroy();
        this.displayStart();
    };
    return Menu;
}());
var Road = (function () {
    function Road(game, height) {
        this.game = game;
        this.posY = height;
        this.createRoad();
    }
    Object.defineProperty(Road.prototype, "downSpeed", {
        set: function (newSpeed) {
            this._downSpeed = newSpeed;
        },
        enumerable: true,
        configurable: true
    });
    Road.prototype.createRoad = function () {
        this.div = document.createElement('road');
        this.div.style.transform = 'translateY(' + this.posY + 'px)';
        this.game.screen.appendChild(this.div);
    };
    Road.prototype.update = function () {
        this.downSpeed = this.game.car.speed;
        if (this.posY >= this.game.screenBox.height) {
            this.posY = -this.game.screenBox.height + this._downSpeed + 10;
        }
        else {
            this.posY += this._downSpeed;
        }
        this.div.style.transform = 'translateY(' + this.posY + 'px';
    };
    return Road;
}());
var Timer = (function () {
    function Timer(g, display) {
        var _this = this;
        this.game = g;
        this.display = display;
        this._time = 0;
        if (this.display) {
            this.createDiv();
        }
        this.timerID = setInterval(function () { return _this.timerUpdate(); }, 1000);
    }
    Object.defineProperty(Timer.prototype, "time", {
        get: function () {
            return this._time;
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.createDiv = function () {
        this.div = document.createElement('time');
        this.game.screen.appendChild(this.div);
        this.div.innerHTML = '0';
    };
    Timer.prototype.timerUpdate = function () {
        if (this.game.running) {
            this._time++;
            if (this.display) {
                this.div.innerHTML = this._time.toString();
            }
        }
    };
    Timer.prototype.destroy = function () {
        clearInterval(this.timerID);
        if (this.display) {
            this.div.remove();
        }
    };
    return Timer;
}());
//# sourceMappingURL=main.js.map