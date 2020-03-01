class WinningScene extends Phaser.Scene{
    constructor(){
        super("winningScreen");
    }

    init(hasWon){
        console.log(hasWon.won);
        this.winning = null;
        this.winning = hasWon.won;
    }

    

    create(){
        console.log("escene win");
        //Fondo Menu
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(game.config.width, game.config.height);
        this.background.tint = 0x7a7a7a;

        var style = { font: "bold 120px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        if(this.winning == true){
            this.textIns = this.add.text(config.width/2, config.height/2, "You win!", style);
            var newScale = (config.width * 0.5) / this.textIns.width;
        }else{
            this.textIns = this.add.text(config.width/2, config.height/2, "Better luck next time!", style);
            var newScale = (config.width * 0.7) / this.textIns.width;
        }

        

        this.textIns.setScale(newScale);
        this.textIns.setOrigin(0.5);

        var style2 = { font: "80px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        this.tapToContinue = this.add.text(config.width/2, config.height/1.1, "Tap to continue...", style2);
        this.tapToContinue.setOrigin(0.5,0);

        var newScaleTap = (config.width * 0.25) / this.tapToContinue.width;

        this.tapToContinue.setScale(newScaleTap);


        this.winning = false;

        this.input.on("pointerup", () => {
            this.registry.destroy(); // destroy registry
            this.events.off();
            this.scene.start("finalScreen");
        });
    }

}