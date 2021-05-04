
var game;
var controls;

var canvas_W = 750;
var canvas_H = 500;

var background;

var height_score = 0;
var platforms_number = 2;
var scoreText;

var player;
var player2;
var platforms;
//var bread;

var cursors;
var cursors2;

var keyW;
var keyS;
var keyA;
var keyD;


// -------------- CONFIG ---------------
var config = {
    type: Phaser.CANVAS,
    width: canvas_W,
    height: canvas_H,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
game = new Phaser.Game(config);

// -------------- PRELOAD ----------------
function preload ()
{
    // --------- IMAGES LOADING -----------
    this.load.image('background', 'svg/background.svg');
    this.load.spritesheet('duck', 'svg/duck.svg' , { frameWidth: 50, frameHeight: 50 });

    //this.load.image('bread', 'svg/bread.svg');
    this.load.image('block', 'svg/block.svg');
    this.load.image('platform', 'svg/platform.svg');
}

// ------------- CREATE ----------------
function create ()
{
    // CAMERA
    this.cameras.main.setBounds(0, 0, canvas_W, canvas_H);
    // BACKGROUND IMAGE
    background = this.add.image(canvas_W/2, canvas_H/2, 'background');
    // WORLD BUILDING
    platforms = this.physics.add.group();
    addFirstLevelPlatform(this)
    addSecondLevelPlatform(this)
    // next platforms create in update()
    // ------- PLAYERS --------
    // PLAYER 1
    player = this.physics.add.sprite(50, 50, 'duck');
    cursors = this.input.keyboard.createCursorKeys();
    player.setBounce(0.3);
    player.setCollideWorldBounds(false);
    player.body.setMass(10);
    // PLAYER 2
    player2 = this.physics.add.sprite(canvas_W-50, 50, 'duck');
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    player2.setBounce(0.3);
    player2.setCollideWorldBounds(false);
    player2.body.setMass(10);
    // ---------- ANIMATIONS ------------
    // -------- ducks animation ---------
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('duck', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'duck', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('duck', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    // SCORE TEXT
    scoreText = this.add.text(16, 16, 'platforms number: 0', { fontSize: '16px', fill: '#000' });


    

    
    /*bread = this.physics.add.group({
        key: 'bread',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    bread.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });*/


    // PHYSICS
    //this.physics.add.overlap(player, bread, collectBread, null, this);
    //this.physics.add.overlap(player2, bread, collectBread, null, this);
    //this.physics.add.collider(bread, platforms);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player, player2);

}

// ------------------------------------
function update ()
{
    height_score += 1
    updatePlatformsPosition();
    scoreText.setText('platforms number: ' + platforms_number);
    
    // PLAYER
    if (cursors.left.isDown)
    {
        player.setVelocityX(-250);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(250);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-700);
    }


    // PLAYER2
    if (keyA.isDown)
    {
        player2.setVelocityX(-250);

        player2.anims.play('left', true);
    }
    else if (keyD.isDown)
    {
        player2.setVelocityX(250);

        player2.anims.play('right', true);
    }
    else
    {
        player2.setVelocityX(0);
        
        player2.anims.play('turn');
    }

    if (keyW.isDown && player2.body.touching.down)
    {
        player2.setVelocityY(-700);
    }



    if (height_score == 200)
    {
        height_score = 1;
        platforms_number += 1;
        addNextLevelPlatform(this, platforms_number % 3 == 0);
        removePlatformsOverMap();
    }
}





// ============== FUNCTIONS ===============
/*function collectBread (player, bread)
{
    bread.disableBody(true, true);
}*/

// --------------- WORLD ------------------
// world building - first platform
function addFirstLevelPlatform(scene)
{
    let platform = new Platform(scene, canvas_W/2, canvas_H/2, 'block', false);
    this.platforms.add(platform)
    platform.setCollideWorldBounds(false);
    platform.body.setAllowGravity(false);
    platform.setImmovable(true);
}
// second platform
function addSecondLevelPlatform(scene)
{
    let platform = new Platform(scene, canvas_W/2, 50, 'platform', false);
    this.platforms.add(platform)
    platform.setCollideWorldBounds(false);
    platform.body.setAllowGravity(false);
    platform.setImmovable(true);
}
// next platforms
function addNextLevelPlatform(scene, moving)
{
    // randomize x position of platform
    x_w = Math.floor(Math.random() * (canvas_W-250/2 - 250/2)) + 250/2;
    let platform = new Platform(scene, x_w, 0, 'platform', moving);
    this.platforms.add(platform)
    platform.setCollideWorldBounds(false);
    platform.body.setAllowGravity(false);
    platform.setImmovable(true);    
}
// update all platforms
function updatePlatformsPosition()
{
    platforms.children.each((child) => {
        child.y += 1;
        if(child.moving)
        {
            if(child.left)
            {
                if (child.x > 0)
                {
                    child.x -= 2;
                }
                else
                {
                    child.x += 2;
                    child.left = false;
                }
            }
            else
            {
                if (child.x < canvas_W)
                {
                    child.x += 2;
                }
                else
                {
                    child.x -= 2;
                    child.left = true;
                }
            }
            
        }
    });
}
// remove platforms over map
function removePlatformsOverMap()
{
    platforms.children.iterate((child) => {
        try{
            if (child.y > canvas_H + 10)
            {
                platforms.remove(child, true);
            }        
        } // expected Uncaught Type Error
        catch(error)
        {
            ; //ignore
        }
    });
}
// =========== CLASSES ==========
class Platform extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, sprite, _moving)
    {
        super(scene, x, y, sprite);
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.moving = _moving;
        this.right = true;
    }
}

// ------------------------------------------------------------------
// TODO 
/*  
    Celem projektu jest stworzenie prostej gry działającej 
    w elemencie canvas (liczby w nawiasach oznaczają punktację, 
    maksymalnie za projekt można otrzymać 5 punktów).

    Podstawa na zaliczenie (1): sterowanie myszą lub/i klawiaturą, 
    poruszające się obiekty, kolizje między nimi, prosta logika.

    (+1) Przynajmniej część obiektów jest animowana (klatki animacji).
    (+1) Kilka typów obiektów różniących się zachowaniem 
         (np. wrogowie, pułapki i skarby).
    (+1) Bardziej złożona logika i zależności między elementami 
         gry (np. AI wrogów, zarządzanie zasobami).
    (+1) Kilka typów interakcji (np. walka i dialogi).
    (+1) Większy świat gry (np. scrollowana plansza, poziomy, 
         przechodzenie między ekranami pomieszczeń). 
*/
// ------------------------------------------------------------------