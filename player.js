class Player extends Phaser.GameObjects.Sprite{
    constructor(scene){

        var x = game.config.width/2;
        var y = game.config.height/4;
        
        super(scene, x, y, "playerFalling");
    
        
         // 1 add to scene
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);
        
         // 2  add the beam to the projectiles group
        scene.players.add(this);
        this.setInteractive();
        scene.makePlayerDraggable(this);
        this.body.setGravityY(500);
    }


    init(){
        this.playerSpeed = 10;
        this.canMove = true;
        this.flag = false;
        this.endTheGame = false;
        this.timeToExit = 200;
        this.sceneGame;
        this.collisionsEnabled = true;
    }    

    create(){
       
    }    

    endGame(){
        this.endTheGame = true;        
        if(this.collisionsEnabled == true){
            this.sceneGame.removeCollisions();
            this.collisionsEnabled = false;
            //this.body.setCollideWorldBounds(false);
            this.sceneGame.physics.world.setBoundsCollision(true, true, true, false);
        }
    }

    startJumping(result){
        this.body.setVelocityY(-650);

        if(result == true){
            this.canMove = true;
        }else{
            this.canMove = false;
        }
    }

    stopJumping(){
        this.body.setVelocityY(0);
    }

    movePlayerManager(scene){

        if(this.flag == null){
            this.canMove = true;
            this.endTheGame = false;
            this.collisionsEnabled = true;
            this.timeToExit = 250;
            this.flag = false;
        }

        if(this.canMove == true){
            if(scene.cursorKeys.left.isDown){
                this.body.velocity.x = -500;
            }else if(scene.cursorKeys.right.isDown){
                this.body.velocity.x = 500;
            }

            if(scene.cursorKeys.left.isUp && scene.cursorKeys.right.isUp){
                this.body.velocity.x = 0;
            }
        }
    }
   
    
   

    update(scene){
        if(this.x < 0){
            this.destroy();
        }

        this.sceneGame = scene;            
    
        if(this.endTheGame == true){
            this.timeToExit -= 1;
            if(this.timeToExit < 0){
                scene.endGame();
            }
        }
   
        this.movePlayerManager(scene);
    }
}