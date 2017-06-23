/// <reference path="GameObject.ts"/>

class Game extends GameObject {
	//Variables
	public screen: Element;
	public hitbox: any;
	public screenBox: ClientRect;
	public running: boolean = false;
	private points: number;
	private menu: Menu;
	public timer: Timer;
	private roads: Array<Road>;
	private Vehicle:Array<PoliceCar> = new Array<PoliceCar>();
	public car: Player;


	constructor(){
		super();

		// create screenbox
		this.screen = document.getElementsByTagName('screen')[0];
        this.screenBox = this.screen.getBoundingClientRect();
		this.createRoads();		
		this.menu = new Menu(this);
        requestAnimationFrame(() => this.gameLoop());
	}

	// start game
	public start(): void {
		this.points = 0;
		this.running = true;
		this.timer = new Timer(this, true);
		this.car = new Player(this.screenBox);
	
	}

	// start Gameloop
	private gameLoop(): void{
		if(this.running){
		    this.updateObjects();
		}
		requestAnimationFrame(()=> this.gameLoop())
	}

	// update the objects
	private updateObjects(): void{
	    this.updateRoad();
		this.car.move();
	}

	// create road
    private createRoads(): void{
        let height = this.screenBox.height;
        this.roads = [];
        for(let i = 0; i < 3; i++){
            let roadHeight = height*i-height;
            let road = new Road(this, roadHeight);
            this.roads.push(road);
        }
    }

	// update road
    private updateRoad(){
	    for(let i = 0; i < this.roads.length; i++){
	        this.roads[i].update();
        }
    }	
}
