var canvas_W = 750;
var canvas_H = 500;

var score = 0;
var scoreText;


var config = {
    type: Phaser.CANVAS,
    width: canvas_W,
    height: canvas_H,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var player;
var platforms;
var cursors;
var bread;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'svg/background.svg');
    this.load.spritesheet('duck', 'svg/duck.svg' , { frameWidth: 50, frameHeight: 50 });

    this.load.image('bread', 'svg/bread.svg');
    this.load.image('block', 'svg/block.svg');
}

function create ()
{
    this.add.image(canvas_W/2, canvas_H/2, 'background');


    platforms = this.physics.add.staticGroup();
    player = this.physics.add.sprite(50, 50, 'duck');
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    cursors = this.input.keyboard.createCursorKeys();

    
    addFirstLevelPlatform()
    addLeftPlatform(175)
    addRightPlatform(175*2)





    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

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



    


    bread = this.physics.add.group({
        key: 'bread',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    bread.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });


    


    
    this.physics.add.overlap(player, bread, collectBread, null, this);



    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bread, platforms);




    

}


function update ()
{

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }



}






function collectBread (player, bread)
{
    bread.disableBody(true, true);
}



// world building
function addFirstLevelPlatform()
{
    for(let i = 1; i < canvas_W/50; i++)
    {
        platforms.create(50*i, canvas_H, 'block');
    }
}

function addLeftPlatform(level)
{
    for(let i = 1; i < 6; i++)
    {
        platforms.create(50*i, canvas_H-level, 'block');
    }
}

function addRightPlatform(level)
{
    for(let i = 1; i < 6; i++)
    {
        platforms.create(canvas_W - 50*i, canvas_H-level, 'block');
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