class Player extends GameObject{
    public viewport: HTMLElement;
    public onkeydown: void;
    public _speed: number;
    
    public screenBox:any;


    constructor(screenBox: any){
        super();

        this.x = 400;
        this.y = 300;
        
        this.screenBox = screenBox;
        
        this.width = 40;
        this.height = 20;

        this._speed = 5;

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
        // console.log(this.y, this.x);
        switch(event.keyCode){
        // Left
        case 65:
            if(!(this.x-45 < this.screenBox.left)){
                this.x -= this.width;
		    }
            break;    
        // Right
        case 68:
            if(!(this.x+135 > this.screenBox.right)){
                this.x += this.width;  
		    }
            break;
        // Down
        case 87:
            if(!(this.y > this.screenBox.bottom + this.height)){
                // this.y -= this.height;
            }
            break;
        // Up
        case 83:
            if(!(this.y < this.screenBox.top + this.height)){
                // this.y += this.height;
            }
            break;
        }
    }

    public move():void {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}
