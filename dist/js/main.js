var Car = (function () {
    function Car() {
        var _this = this;
        this.width = 50;
        this.height = 50;
        this.x = 400;
        this.y = 200;
        this._speed = 5;
        this.createCar();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Object.defineProperty(Car.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    Car.prototype.createCar = function () {
        this.div = document.createElement('car');
        var screen = document.getElementById('screen');
        screen.appendChild(this.div);
    };
    Car.prototype.collisionDetection = function () {
        var screen = document.getElementById('screen').getBoundingClientRect();
        if (this.x < screen.x + screen.width &&
            this.x + this.width > screen.x &&
            this.y < screen.y + screen.height &&
            this.height + this.y > screen.y) {
            console.log('BOOOOOM!');
        }
    };
    Car.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 65:
                this.x -= this.width;
                break;
            case 68:
                this.x += this.width;
                break;
            case 87:
                this.y -= 15;
                break;
            case 83:
                this.y += 15;
                break;
        }
    };
    Car.prototype.move = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.running = false;
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
        this.car = new Car();
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