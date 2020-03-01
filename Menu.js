class Menu extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    

    init(){
        this.maxSizeLogo = 400;
        this.minSizeLogo = 200;
        this.maxPanelX = 400;
        this.minPanelX = 300;
        this.maxPanelY = 600;
        this.maxButtonX = 285;
        this.maxButtonY = 73.5;

        this.tempButtonX = 0;
        this.tempButtonY = 0;

        this.isOn = true;
    }

    preload(){
        this.load.image("background", "assets/background.jpg");
        this.load.image("panel", "assets/Panel.png");
        this.load.image("logo", "assets/logo.png");
        this.load.image("button", "assets/Button.png");
        this.load.audio("audio_music", "assets/BackgroundMusic.mp3");
        this.load.image("audioON", "assets/AudioIconON");
        this.load.image("audioOFF", "assets/AudioIconOFF");
    }

    create(){
        
        

        console.log("escena menu");
        //this.scene.start("instructions");
        //Fondo Menu
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(game.config.width, game.config.height);
       
        // Panel blanco
        this.panel = this.add.image(config.width/2, config.height/2, "panel");
        this.panel.displayWidth = game.config.width/2;
        if(game.config.width/2 > this.maxPanelX){
            this.panel.displayWidth = this.maxPanelX;
        }
        if(game.config.width/2 < this.minPanelX){
            this.panel.displayWidth = this.minPanelX;
        }
        this.panel.displayHeight = game.config.height/1.2;
        if(game.config.height/1.2 > this.maxPanelY){
            this.panel.displayHeight = this.maxPanelY;
        }
        
        // Your logo here
        this.logo = this.add.image(config.width/2, this.panel.y - this.panel.displayHeight/5, "logo");
        this.logo.displayWidth = this.panel.displayWidth/1.5;
        if(this.panel.displayWidth/1.5 > this.maxSizeLogo){
            this.logo.displayWidth = this.maxSizeLogo;
        }
        if(this.panel.displayWidth/1.5 < this.minSizeLogo){
            this.logo.displayWidth = this.minSizeLogo;
        }
        this.logo.scaleY = this.logo.scaleX;

        //Title
        var style = { font: "bold 40px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        this.title = this.add.text(config.width/2, this.panel.y + this.panel.displayHeight/8, "FoodMaker", style);
        this.title.setOrigin(0.5);
        //this.title.world.x = config.width/2;
        
        //Button
        this.button = this.add.image(config.width/2, this.panel.y + this.panel.displayHeight/3.2, "button");
        this.button.displayWidth = this.panel.displayWidth/1.5;
        this.button.displayHeight = this.button.displayHeight*1.5;
        this.tempButtonX = this.button.displayWidth;
        this.tempButtonY = this.button.displayHeight;
       
        this.button.tint = 0x000000;

        //TextButton
        var style = { font: " 35px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        this.title = this.add.text(config.width/2, this.button.y, "Play now", style);
        this.title.setOrigin(0.5);
        this.tempTextTittleX = this.title.displayWidth;
        this.tempTextTittleY = this.title.displayHeight;
       
        this.button.setInteractive();

        this.button.on("pointerover",() => {
            //buttonPlay
            this.button.displayWidth = this.tempButtonX * 1.1;
            this.button.displayHeight = this.tempButtonY * 1.1;

            //textPlay
            this.title.setScale(1.1);            
        });

        this.button.on("pointerout",() => {
            this.button.displayWidth = this.tempButtonX;
            this.button.displayHeight = this.tempButtonY;

            //textPlay
            this.title.setScale(1);            
        });

        this.button.on("pointerup", () => {
            this.scene.start("instructions");
        });
        

        //SOUND BUTTON
        //this.soundButton = this.add.image(config.width - (config.width*5)/100, config.height - (config.height*5)/100, "audioON").setOrigin(1,1);
        this.soundButton = this.add.image(config.width, config.height, "audioON");
        this.soundButton.setScale(0.65);
        this.soundButton.setOrigin(1,1);
        this.soundButton.x = config.width  - (config.width*2.5)/100;

        this.soundButton.setInteractive();

        this.soundButton.on("pointerup", () => {
            if(this.isOn == true){
                this.soundButton.setTexture("audioOFF");
                game.sound.mute = true;
                this.isOn = false;
            }else{
                this.soundButton.setTexture("audioON");
                game.sound.mute = false;
                this.isOn = true;
            }
        });
        
    }

    update(){
       
    }
    
}




