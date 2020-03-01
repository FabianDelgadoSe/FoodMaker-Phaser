class Scene1 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    init(){
        this.timer = 100;
        this.jumpDuration = 200;
        this.flagJump = false;
        this.isJumping = false;
        this.oldRandom = 0;
        this.currentRandom = 0;
        this.spawnPlayerTimer = 350;
        this.playerSpawned = false;
        this.playerSpeed = 200;
        this.flagSpawn = false;

        this.timeToEndGame = 200;
        this.gameEnded = false;

        this.fruitToCrush = 0;
        this.scoreToWin = 10;
        this.score = 0;
        this.gameResult = true;
        this.initialTime = 0;
        this.gameTime = 35;
        this.timedEvent;

        this.playerFruitCol;        
        this.playerTableCol;
    }

    preload(){
        this.load.image("background", "assets/background.jpg");
        this.load.image("table", "assets/table.png");
        this.load.image("card1", "assets/BlueBerryCard.png");
        this.load.image("card2", "assets/BlackBerryCard.png");
        this.load.image("card3", "assets/StrawBerryCard.png");
        this.load.image("blueberry", "assets/BlueBerry.png");
        this.load.image("blackberry", "assets/BlackBerry.png");
        this.load.image("strawberry", "assets/strawberry.png");
        this.load.image("mark", "assets/Mark.png");
        this.load.image("playerFalling", "assets/fallPlayer.png");
        this.load.image("playerUp", "assets/jumpPlayer.png");
        this.load.audio("audio_splash", "assets/FruitSplash.mp3");
        this.load.audio("audio_wrong", "assets/Incorrect.mp3");
        this.load.audio("audio_lose", "assets/Lose.mp3");
        
    }    

    create(){

        this.score = 0;
        this.initialTime = this.gameTime;
        console.log("escena Game");
        this.projectiles = this.add.group();
        this.players = this.add.group();
        
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //Fondo Menu
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.background.setDisplaySize(game.config.width, game.config.height);
        this.background.tint = 0x7a7a7a;
        
        //Mesa
        this.table = this.physics.add.image(config.width/2, config.height/2 + config.height/3.2, "table");
        this.table.displayWidth = config.width + config.width/2;

        //Carta central (BLUEBERRY)
        this.blueberry = this.add.image(config.width/2, config.height/2 + config.height/2.37, "card1");
        this.blueberry.setScale(1.2);
        this.blueberry.depth = 500;
        this.blueberry.angle = 10;

        //Carta izquierda (BLACKBERRY)
        this.blackberry = this.add.image(this.blueberry.x - this.blueberry.displayWidth*1.2, this.blueberry.y, "card2");
        this.blackberry.setScale(1.2);
        this.blackberry.depth = 500;
        this.blackberry.angle = -7;

        //Carta derecha (STRAWBERRY)
        this.strawberry = this.add.image(this.blueberry.x + this.blueberry.displayWidth*1.2, this.blueberry.y, "card3");
        this.strawberry.setScale(1.2);
        this.strawberry.depth = 500;
        this.strawberry.angle = -3;


        //Spawn mark
        this.spawner = this.add.image(config.width + 10, this.table.y - this.table.displayHeight/2, "mark");
       
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.createFruit();

        //Score Text
        var style2 = { font: "bold 40px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle", align : "center"};
        this.scoreText = this.add.text(20, 20, "0", style2);
        this.scoreText.setOrigin(0.5);

        //Timer Text
        var styleTimer = { font: "bold 40px Arial", fill: "#fff", boundsAlignH: "right", boundsAlignV: "top", align : "right"};
        this.timerText = this.add.text(config.width-50, 20, this.initialTime.toString(), styleTimer);
        this.timerText.setOrigin(0.5);

        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

        this.tableGroup = this.add.group();
        this.tableGroup.add(this.table);

        var playerFruitCollision = this.physics.add.collider(this.projectiles, this.players, function(projectile, player){
            projectile.scoreCheck(this);
            projectile.destroy();
            player.startJumping(true);
        })
        this.playerFruitCol = playerFruitCollision;       

        var playerTableCollision = this.physics.add.collider(this.players, this.tableGroup, function(player, table){
            table.body.moves = false;
            player.startJumping(false);
            player.endGame();          
        })
        this.playerTableCol = playerTableCollision;

        this.pickFruit();

        //Sounds
        this.correctSound = this.sound.add("audio_splash");
        this.incorrectSound = this.sound.add("audio_wrong");
        this.loseSound = this.sound.add("audio_lose");
    }

    removeCollisions(){
        this.loseSound.play();
        this.playerFruitCol.destroy();
        this.playerTableCol.destroy();
    }

    giveFruitVar(fruit, type){
        fruit.setFruit(type, this);
    }

    checkForScore(type){
        if(type == this.fruitToCrush){
            this.score += 1;
            this.playSoundFruit(true);
            this.pickFruit();
        }else{
            this.playSoundFruit(false);
        }
    }

    playSoundFruit(correct){
        if(correct == true){
            this.correctSound.play();
        }else{
            this.incorrectSound.play();
        }
    }

    checkWin(){
        if(this.score >= this.scoreToWin){
            return true;
        }else{
            return false;
        }
    }

    makePlayerDraggable(player){
        this.input.setDraggable(this.players.getChildren()[0]);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            //gameObject.y = dragY;
    
        });
    }


    pickFruit(){
        var randomCard = this.currentRandom = Math.floor(Math.random() * 3) + 1;
        switch(randomCard){
            case 1:
                this.blueberry.setScale(1.5);
                this.blackberry.setScale(1.2);
                this.strawberry.setScale(1.2);
                this.fruitToCrush = 1;
            break;
            case 2:
                this.blueberry.setScale(1.2);
                this.blackberry.setScale(1.5);
                this.strawberry.setScale(1.2);
                this.fruitToCrush = 2;
            break;
            case 3:
                this.blueberry.setScale(1.2);
                this.blackberry.setScale(1.2);
                this.strawberry.setScale(1.5);
                this.fruitToCrush = 3;
            break;
        } 
    }

    endGame(){
        this.gameResult = this.checkWin();
        this.scene.start("winningScreen",  {won: this.gameResult});
    }

    createFruit(){
        var fruit = new Fruit(this);
    }

    moveFruit(fruit, speed){
        fruit.x -= speed;
    }

    spawnPlayer(){
        var newPlayer = new Player(this);
    }

    onEvent ()
    {
        this.initialTime -= 1; // One second
        this.timerText.setText(this.initialTime.toString());
        if(this.initialTime<= 0){
            this.gameResult = this.checkWin();
            this.scene.start("winningScreen", {won: this.gameResult});
        }
    }

    randomNumber(){
        this.currentRandom = Math.floor(Math.random() * 3) + 1;
        if(this.currentRandom == this.oldRandom){
            return this.randomNumber();
        }else{
            this.oldRandom = this.currentRandom;
            return this.currentRandom;
        }        
    }


    update(){

        this.scoreText.setText(this.score);

        if(this.spawnPlayerTimer < 0 && this.playerSpawned == false){
            this.spawnPlayer(); 
            this.playerSpawned = true;   
        }else{
            if(this.playerSpawned == false){
                this.spawnPlayerTimer -= 1;
            }
        }

        if(this.jumpDuration < 0 && this.flagJump == false){ 
            this.isJumping = true;
            this.flagJump = true;   
        }else{
            if(this.flagJump == false){
                this.isJumping = false;
                this.jumpDuration -= 1;
            }
        }
       
        if(this.timer < 0 && this.flagSpawn == false){
            this.createFruit();
            this.timer = 80;
        }else{
            if(this.flagSpawn == false){
                this.timer -= 1;
            }
        }

        for(var i = 0; i< this.projectiles.getChildren().length; i++){
            var fruit = this.projectiles.getChildren()[i];
            fruit.update();
        }

        for(var i = 0; i< this.players.getChildren().length; i++){
            var player = this.players.getChildren()[i];
            player.update(this);
        }

    }


}