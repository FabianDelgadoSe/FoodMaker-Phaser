class Instructions extends Phaser.Scene {
    constructor() {
        super("instructions");   
    }

    init(){
       
    }

    preload(){
        this.load.image("background", "assets/background.jpg");
        this.load.audio("audio_music", "assets/BackgroundMusic.mp3");
    }

    create(){
        
        console.log("escena instrucciones");
        

        window.musicBackground = this.music = this.sound.add("audio_music");

        var musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek : 0,
            loop : true,
            delay: 0
        }

        //this.music.pauseOnBlur = false;
        //this.music.play(musicConfig);

        musicBackground.pauseOnBlur = false;
        musicBackground.play(musicConfig);

        //Fondo Menu
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(game.config.width, game.config.height);
        this.background.tint = 0x7a7a7a;
        
        var style = { font: "bold 80px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        this.textIns = this.add.text(config.width/2, config.height * 0.05, "Instructions: \n \n " +
        "1. Use Left & Right arrows to move \n 2.  Avoid falling on the table \n 3. Crush the indicated ingredients \n 4. Get 10 points to win!", style);

        var newScale = (config.width * 0.7) / this.textIns.width;

        this.textIns.setScale(newScale);
        this.textIns.setOrigin(0.5,0);


        var style2 = { font: "80px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        this.tapToContinue = this.add.text(config.width/2, config.height/1.1, "Tap to continue...", style2);
        this.tapToContinue.setOrigin(0.5,0);

        var newScaleTap = (config.width * 0.25) / this.tapToContinue.width;

        this.tapToContinue.setScale(newScaleTap);


        this.input.on("pointerup", () => {
            this.scene.start("playGame");
        });
        
    }

    update(){
       
    }
    

    
    
}