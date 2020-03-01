var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    scene: [Menu, Instructions, Scene1, FinalScene, WinningScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
    
}

var game = new Phaser.Game(config);


//width: window.innerWidth,
//height: window.innerHeight,