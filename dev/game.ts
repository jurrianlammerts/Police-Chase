/// <reference path="car.ts"/>

class Game {
	//Variables
	public screen: Element;
	public screenBox: ClientRect;
	public running: boolean = false;
	private points: number;
	private menu: Menu;
	public timer: Timer;
	private roads: Array<Road>;
	public car: Car;


	constructor(){
		this.screen = document.getElementsByTagName('screen')[0];
        this.screenBox = this.screen.getBoundingClientRect();
		this.createRoads();		
		this.menu = new Menu(this);

        requestAnimationFrame(() => this.gameLoop());
	}

	public start(): void {
		this.points = 0;
		this.running = true;
		this.timer = new Timer(this, true);
		this.car = new Car();
	}


	private gameLoop(): void{
		if(this.running){
		    this.updateObjects();
		}
		requestAnimationFrame(()=> this.gameLoop());
	}


	private updateObjects(): void{
	    this.updateRoad();
		this.car.move();
	}

    private createRoads(): void{
        let height = this.screenBox.height;
        this.roads = [];
        for(let i = 0; i < 3; i++){
            let roadHeight = height*i-height;
            let road = new Road(this, roadHeight);
            this.roads.push(road);
        }
    }

    private updateRoad(){
	    for(let i = 0; i < this.roads.length; i++){
	        this.roads[i].update();
        }
		
    }	
}
