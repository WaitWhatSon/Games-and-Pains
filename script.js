var canvas_size = 500

var config = {
    type: Phaser.CANVAS,
    width: canvas_size,
    height: canvas_size,
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

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'svg/background.svg');
    this.load.image('duck', 'svg/duck.svg');
}

function create ()
{
    this.add.image(canvas_size/2, canvas_size/2, 'background');
    this.add.image(canvas_size/2, canvas_size/2, 'duck');



    player = this.physics.add.sprite(50, 50, 'duck');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('duck', { start: 0, end: 3 }),
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
        frames: this.anims.generateFrameNumbers('duck', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });



}

function update ()
{
}