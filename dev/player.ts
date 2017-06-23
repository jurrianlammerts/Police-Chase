class Player extends GameObject{
    public viewport: HTMLElement;
    public onkeydown: void;
    public _speed: number;
    
    public screenBox:any;


    constructor(screenBox: any){
        super();

        this.screenBox = screenBox;

        this.x = 1/2 * this.screenBox.width;
        this.y = 1/2 * this.screenBox.height;
        
        this.width = 50;
        this.height = 100;

        this._speed = 10;

        this.createCar()
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
    }

    get speed(): number{
        return this._speed;
    }

    public createCar(): void{
        this.div = document.createElement('car');
        let screen = document.getElementById('screen');
        screen.appendChild(this.div);
    }

    private onKeyDown(event:KeyboardEvent):void{
        console.log(this.screenBox.bottom)        
        
        switch(event.keyCode){
        // Left
        case 65:
            if(!(this.x-this.width < this.screenBox.left)){
                this.x -= this.width;
		    }
            break;     
        // Right
        case 68:
            if(!(this.x + (0.16 * this.screenBox.right) > this.screenBox.right)){
                this.x += this.width;  
		    }
            break;
        // Up
        case 87:
            if(!(this.y - 70 < 0)){
                 this.y -= 80;
            }
            break;
        // Down
        case 83:
            if(!(this.y + this.screenBox.bottom * 0.348 > this.screenBox.bottom)){
                 this.y += 80;
            }
            break;
        }
    }

    public move():void {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}
