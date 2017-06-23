/// <reference path="GameObject.ts"/>

class Vehicles extends GameObject{
    private speed: number = 0;
    private level: Level;

    constructor(game: Game){
        super();
  
        this.y = 100;
        this.x = 100;
        this.width = 168;
        this.height = 108;
        this.speed = Math.random() * 2 + 2;
        this.createPoliceCar();
        this.update();
    }

    public update(): void {
        this.x += this.speed;
        if (this.x > window.innerWidth) {
            this.div.remove();
        }

        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    public createPoliceCar(): void{
        this.div = document.createElement('policecar');
        let road = document.getElementById('road');
        road.appendChild(this.div);
    }

}

