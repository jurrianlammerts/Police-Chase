class Timer{
    public game: Game;
    private timerID: number;
    private _time: number;
    private div: HTMLElement;
    private display: boolean;

    constructor(g, display){
        this.game = g;
        this.display = display;
        this._time = 0;

        if(this.display){
            this.createDiv();
        }
        this.timerID = setInterval(()=>this.timerUpdate(), 1000);
    }

    public get time(): number{
        return this._time;
    }

    private createDiv(): void{
        this.div = document.createElement('time');
        this.game.screen.appendChild(this.div);
        this.div.innerHTML = '0';
    }

    private timerUpdate(): void{
        if(this.game.running){
            this._time++;
            if(this.display){
                this.div.innerHTML = this._time.toString();
            }
        }

    }

    public destroy(): void{
        clearInterval(this.timerID);
        if(this.display){
            this.div.remove();
        }
    }
}