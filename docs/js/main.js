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
var GameObject = (function () {
    function GameObject() {
    }
    return GameObject;
}());
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.running = false;
        _this.Vehicle = new Array();
        _this.screen = document.getElementsByTagName('screen')[0];
        _this.screenBox = _this.screen.getBoundingClientRect();
        _this.createRoads();
        _this.menu = new Menu(_this);
        requestAnimationFrame(function () { return _this.gameLoop(); });
        return _this;
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
}(GameObject));
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(screenBox) {
        var _this = _super.call(this) || this;
        _this.screenBox = screenBox;
        _this.x = 1 / 2 * _this.screenBox.width;
        _this.y = 1 / 2 * _this.screenBox.height;
        _this.width = 50;
        _this.height = 100;
        _this._speed = 10;
        _this.createCar();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
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
        console.log(this.screenBox.bottom);
        switch (event.keyCode) {
            case 65:
                if (!(this.x - this.width < this.screenBox.left)) {
                    this.x -= this.width;
                }
                break;
            case 68:
                if (!(this.x + (0.16 * this.screenBox.right) > this.screenBox.right)) {
                    this.x += this.width;
                }
                break;
            case 87:
                if (!(this.y - 70 < 0)) {
                    this.y -= 80;
                }
                break;
            case 83:
                if (!(this.y + this.screenBox.bottom * 0.348 > this.screenBox.bottom)) {
                    this.y += 80;
                }
                break;
        }
    };
    Player.prototype.move = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Player;
}(GameObject));
var PoliceCar = (function (_super) {
    __extends(PoliceCar, _super);
    function PoliceCar(game) {
        var _this = _super.call(this) || this;
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
    PoliceCar.prototype.update = function () {
        this.x += this.speed;
        if (this.x > window.innerWidth) {
            this.div.remove();
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    PoliceCar.prototype.createPoliceCar = function () {
        this.div = document.createElement('policecar');
        var road = document.getElementById('road');
        road.appendChild(this.div);
    };
    return PoliceCar;
}(GameObject));
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