class Menu{
	private game: Game;
	private startButtonDiv: HTMLElement;

	private menuButtonDiv: HTMLElement;
	private isMenuOpened: boolean;

	private menuDiv: HTMLElement;



	constructor(game: Game){
		this.game = game;
		this.createStartButton();
		this.createMenuButton();
		this.createMenu();
	}

	private createStartButton(): void{
		this.startButtonDiv = document.createElement('start');
		this.startButtonDiv.innerHTML = 'START';
		this.game.screen.appendChild(this.startButtonDiv);
		this.startButtonDiv.addEventListener('click', (e: MouseEvent) => this.startButtonClickHandler(e));
		this.startButtonDiv.addEventListener('touchdown', (e: MouseEvent) => this.startButtonClickHandler(e));
	}

	private createMenuButton(){
	    this.menuButtonDiv = document.createElement('menuButton');
        this.game.screen.appendChild(this.menuButtonDiv);
        this.menuButtonDiv.addEventListener('click', (e: MouseEvent) => this.menuButtonClickHandler(e));
        this.menuButtonDiv.addEventListener('touchdown', (e: MouseEvent) => this.menuButtonClickHandler(e));
        this.menuButtonDiv.style.display = 'none';
        this.isMenuOpened = false;
    }

    private createMenu(): void{
	    this.menuDiv = document.createElement('menu');

	    // Continue button
        let continueButton = document.createElement('menuContinue');
        continueButton.classList.add('menu');
        continueButton.innerHTML = 'Continue';
        continueButton.addEventListener('click', (e: MouseEvent) => this.menuButtonClickHandler(e));
        continueButton.addEventListener('touchdown', (e: MouseEvent) => this.menuButtonClickHandler(e));

        this.menuDiv.appendChild(continueButton);


	    // Quit button
	    let quitButton = document.createElement('menuQuit');
	    quitButton.classList.add('menu');
	    quitButton.innerHTML = 'Quit';
	    quitButton.addEventListener('click', (e: MouseEvent) => this.onQuit(e));
	    quitButton.addEventListener('touchdown', (e: MouseEvent) => this.onQuit(e));

	    this.menuDiv.appendChild(quitButton);

	    // Append the menu and Hide it.
	    this.game.screen.appendChild(this.menuDiv);
        this.menuDiv.style.display = 'none';
        this.menuDiv.style.transform = "translateX(-200%)";
        this.menuDiv.style.display = 'block';
    }

	private startButtonClickHandler(event: any): void{
		if(event.target.nodeName == "START"){

			//make the start button disappear
			this.startButtonDiv.style.transform = "translateY(calc(-50vh - 25px))";
            this.menuButtonDiv.style.display = 'block';

			//Start the game
			this.game.start();
		}
	}

	private menuButtonClickHandler(event: any){
        if(event.target.nodeName == "MENUBUTTON" || event.target.nodeName == "MENUCONTINUE" ){
            if(this.isMenuOpened){
                this.hideMenu();
                this.game.running = true;
                this.isMenuOpened = false;
            }else{
                this.displayMenu();
                this.game.running = false;
                this.isMenuOpened = true;
            }
        }
    }

	//Make the menu display again
	private displayStart(): void{
		this.menuDiv.style.zIndex = '10';
		this.startButtonDiv.style.transform = "translateY(0)";
	}

	private displayMenu(): void{
        this.menuDiv.style.display = 'block';
		this.menuDiv.style.zIndex = '10';
        this.menuDiv.style.transform = "translateX(0)";
    }

    private hideMenu(): void{
        this.menuDiv.style.display = 'block';
        this.menuDiv.style.transform = "translateX(-200%)";
    }

    private onQuit(e: any): void{
	    this.game.running = false;
	    this.menuButtonDiv.style.display = 'none';
	    this.hideMenu();
        this.isMenuOpened = false;
	    this.game.timer.destroy();
	    this.displayStart()
    }
}