class Road{
    private div: HTMLElement;
    private _downSpeed: number;
    public game: Game;
    private posY: number;

    constructor(game, height){
        this.game = game;
        this.posY = height;
        this.createRoad();
    }

    public set downSpeed(newSpeed){
        this._downSpeed = newSpeed;
    }

    private createRoad(): void{
        this.div = document.createElement('road');
        this.div.style.transform = 'translateY(' + this.posY + 'px)';
        this.game.screen.appendChild(this.div);
    }

    public update(): void{
        this.downSpeed = this.game.car.speed;
        if(this.posY >= this.game.screenBox.height){
            this.posY = -this.game.screenBox.height+this._downSpeed+10;
        }else{
            this.posY+=this._downSpeed;
        }
        this.div.style.transform = 'translateY(' + this.posY + 'px';
    }
}
