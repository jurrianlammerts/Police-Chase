class Car{
    private div: HTMLElement;
    private onkeydown: void;
    protected _speed: number;
    public game: Game;

    public width:number;
    public height:number;

    public x:number;
    public y:number;

    constructor(){
        this.width = 50;
        this.height = 50;

        this.x = 400;
        this.y = 200;

        this._speed = 5;
        this.createCar();
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
    }

    get speed(): number{
        return this._speed;
    }

    private createCar(): void{
        this.div = document.createElement('car');
        let screen = document.getElementById('screen');
        screen.appendChild(this.div);
    }

    private collisionDetection():void{
        let screen = document.getElementById('screen').getBoundingClientRect();

        // const screen = {
        //     x: 20, 
        //     y: 10, 
        //     width: 10, 
        //     height: 10
        // }

        if (this.x < screen.x + screen.width &&
        this.x + this.width > screen.x &&
        this.y < screen.y + screen.height &&
        this.height + this.y > screen.y) {
            console.log('BOOOOOM!')
        }
    }

    private onKeyDown(event:KeyboardEvent):void{
        switch(event.keyCode){
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
    }

    public move():void {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}
