class Fruit extends Phaser.GameObjects.Sprite{
    constructor(scene){

        var x = scene.spawner.x;
        var y = scene.spawner.y;

        var random = scene.randomNumber();

        switch(random){
            case 1:
                super(scene, x, y, "blueberry");
            break;
            case 2:
                super(scene, x, y, "blackberry");
            break;
            case 3:
                super(scene, x, y, "strawberry");
            break;
        }
        
         // 1 add to scene
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.x = - 250;
  
         // 2  add the beam to the projectiles group
        scene.projectiles.add(this);
        scene.giveFruitVar(this, random);
    }

    init(){
        this.type = 0;
        this.scene;
    }

    scoreCheck(){
        this.scene.checkForScore(this.type);
    }

    setFruit(fruitType, scene){
        this.scene = scene;
        this.type = fruitType;
    }

    stopMoving(){
        this.body.velocity.x = 0;
    }

   

    update(scene){
        
        if(this.x < 0){
            this.destroy();
        }
    }
}