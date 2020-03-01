class FinalScene extends Phaser.Scene{
    constructor(){
        super("finalScreen");
    }

    init(){
        this.maxSizeLogo = 400;
        this.minSizeLogo = 200;
        this.maxPanelX = 800;
        this.minPanelX = 300;
        this.maxPanelY = 500;
        this.maxButtonX = 285;
        this.maxButtonY = 73.5;
        this.tempButtonX = 0;
        this.tempButtonY = 0;
        this.tempButtonAX = 0;
        this.tempButtonAY = 0;
        this.scaleXText = 0.40;
        this.scaleXText2 = 0.47;
        this.minButtonX = 180;
    }

    preload(){
        this.load.image("background", "assets/background.jpg");
        this.load.image("button", "assets/Button.png");
    }

    create(){
        
        console.log("escena Final");
        
       this.stopMusic(window.musicBackground);
        
        //Fondo Menu
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(game.config.width, game.config.height);
        this.background.tint = 0x7a7a7a;

        // Panel blanco
        this.panel = this.add.image(config.width/2, config.height/2, "panel");
        this.panel.displayWidth = game.config.width/1.5;
        if(game.config.width/1.5 > this.maxPanelX){
            this.panel.displayWidth = this.maxPanelX;
        }
        if(game.config.width/1.5 < this.minPanelX){
            this.panel.displayWidth = this.minPanelX;
        }

        this.panel.displayHeight = game.config.height/3;
        if(game.config.height/3 > this.maxPanelY){
            this.panel.displayHeight = this.maxPanelY;
        }

        //Thanks for playing text
        
        var style3 = { font: "bold 70px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};      
        this.title = this.add.text(config.width/2, this.panel.y - this.panel.displayHeight/3, "Thanks for playing!", style3);         
        this.title.setOrigin(0.5);

        
        var newScale = (this.panel.displayWidth * 0.6) / this.title.width;
        if(newScale < this.scaleXText){
            newScale = this.scaleXText;
        }
        this.title.setScale(newScale);

        //Create a game in just 5 minutes!
        var style3 = { font: "32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        this.title = this.add.text(config.width/2, this.panel.y - this.panel.displayHeight/6, "Create a game in just 5 minutes!!", style3);
        this.title.setOrigin(0.5,0);

        
        var newScale = (this.panel.displayWidth * 0.52) / this.title.width;
        console.log(newScale);
        if(newScale < this.scaleXText2){
            newScale = this.scaleXText2;
        }
        this.title.setScale(newScale);
        this.title.setWordWrapWidth(this.panel.displayWidth, true);

        //Button
        this.button = this.add.image(config.width/2, this.panel.y + this.panel.displayHeight/5.5, "button");
        this.button.displayWidth = this.panel.displayWidth/3;
        if( this.panel.displayWidth/3 <  this.minButtonX){
            this.button.displayWidth = this.minButtonX;
        }
        this.button.scaleY = this.button.scaleX;
        this.tempButtonX = this.button.displayWidth;
        this.tempButtonY = this.button.displayHeight;
        this.button.tint = 0xb8e879;

        this.button.setInteractive();

        this.button.on("pointerover",() => {
            this.button.tint = 0x8ab84d;
        });

        this.button.on("pointerout",() => {
            this.button.tint = 0xb8e879;
        });

        this.button.on("pointerup", () => {
            window.open('https://withkoji.com', '_blank');
        });


        this.scene.stop("winningScreen");
        this.scene.stop("playGame");
        

        //Button Play Again
        this.buttonAgain = this.add.image(config.width/2, this.panel.y + this.panel.displayHeight/1.35, "button");
        this.buttonAgain.displayWidth = this.panel.displayWidth/3;
        if( this.panel.displayWidth/3 <  this.minButtonX){
            this.buttonAgain.displayWidth = this.minButtonX;
        }
        this.buttonAgain.scaleY = this.buttonAgain.scaleX;
        this.tempButtonAX = this.buttonAgain.displayWidth;
        this.tempButtonAY = this.buttonAgain.displayHeight;
        this.buttonAgain.tint = 0x49e6e0;

        this.buttonAgain.setInteractive();

        this.buttonAgain.on("pointerover",() => {
            this.buttonAgain.tint = 0x21c4be;
        });

        this.buttonAgain.on("pointerout",() => {
            this.buttonAgain.tint = 0x49e6e0;
        });

        this.buttonAgain.on("pointerup", () => {
            this.scene.start("instructions");
        });

        //TextButton Get Started
        var style4 = { font: "40px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        this.titleStarted = this.add.text(config.width/2, this.button.y - 3, "Get Started", style4);
        this.titleStarted.setOrigin(0.5);

        
        var newScale = (this.button.displayWidth * 0.55) / this.titleStarted.width;

        this.titleStarted.setScale(newScale);

        //TextButton Play Again
        var style4 = { font: "40px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        this.titleAgain = this.add.text(config.width/2, this.buttonAgain.y - 3, "Play Again", style4);
        this.titleAgain.setOrigin(0.5);

        var newScale = (this.buttonAgain.displayWidth * 0.55) / this.titleAgain.width;

        
        this.titleAgain.setScale(newScale);


    }

    stopMusic(music){
        music.stop();
    }


}