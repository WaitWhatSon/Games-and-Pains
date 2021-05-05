var game;
var controls;

var new_game = false;
var stop_game = false;

var canvas_W = 750;
var canvas_H = 500;

var background;
var clouds;

var height_score = 0;
var platforms_number = 2;

var playerScore = 0;
var player2Score = 0;

var count = 0;

var heightText;
var winningText;
var playerScoreText;
var player2ScoreText;
var modeText;

var mode = "single";

var player;
var player2;
var platforms;
var enemy;
var bread;

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
    canvas: document.getElementById('canvas'),
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

// ======================== PRELOAD =========================
function preload ()
{
    // --------- IMAGES LOADING -----------
    this.load.image('background', 'svg/background.svg');
    this.load.image('clouds', 'svg/clouds.svg');

    this.load.spritesheet('duck', 'svg/duck.svg' , { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('duck2', 'svg/duck2.svg' , { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('enemy', 'svg/enemy.svg' , { frameWidth: 85, frameHeight: 40 });

    this.load.image('bread', 'svg/bread.svg');
    this.load.image('block', 'svg/block.svg');
    this.load.image('platform', 'svg/platform.svg');
}

// ======================== CREATE ==========================
function create ()
{
    // CAMERA
    this.cameras.main.setBounds(0, 0, canvas_W, canvas_H);
    // BACKGROUND IMAGE
    background = this.add.image(canvas_W/2, canvas_H/2, 'background');
    clouds = this.add.image(canvas_W/2, canvas_H/2, 'clouds');
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
    if (mode != "single")
    {
        player2 = this.physics.add.sprite(canvas_W-50, 50, 'duck2');
        player2.setBounce(0.3);
        player2.setCollideWorldBounds(false);
        player2.body.setMass(10);    
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
    // ENEMY
    enemy = this.physics.add.sprite(-25, 0, 'enemy');
    enemy.setCollideWorldBounds(false);
    enemy.body.setAllowGravity(false);
    enemy.setImmovable(true);    
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
    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('duck2', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn2',
        frames: [ { key: 'duck2', frame: 2 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('duck2', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: 20
    });
    this.anims.create({
        key: 'enemy_atack',
        frames: this.anims.generateFrameNumbers('enemy', { start: 3, end: 4 }),
        frameRate: 10,
        repeat: 10
    });
    enemy.anims.play('fly', true);
    // BREAD
    bread = this.physics.add.group({
        key: 'bread',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    bread.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));
    });
    // TEXT init
    heightText = this.add.text(16, 16, 'platforms number: 0', { fontSize: '16px', fill: '#000' });
    if (mode == "single")
    {
        playerScoreText = this.add.text(16, 48, 'PLAYER score: ' + playerScore, { fontSize: '16px', fill: '#000' });
        player2ScoreText = this.add.text(16, 60, '', { fontSize: '16px', fill: '#000' });
    }
    else if (mode == "cooperate")
    {
        playerScoreText = this.add.text(16, 48, 'PLAYERS score: ' + playerScore, { fontSize: '16px', fill: '#000' });
        player2ScoreText = this.add.text(16, 60, '', { fontSize: '16px', fill: '#000' });
    }
    else
    {
        playerScoreText = this.add.text(16, 48, 'PLAYER 1 score: ' + playerScore, { fontSize: '16px', fill: '#000' });
        player2ScoreText = this.add.text(16, 60, 'PLAYER 2 score: ' + player2Score, { fontSize: '16px', fill: '#000' });
    }
    winningText = this.add.text(16, 42, '', { fontSize: '16px', fill: '#000' });
    winningText = this.add.text(16, 42, '', { fontSize: '16px', fill: '#000' });
    modeText = this.add.text(16, canvas_H-32, mode, { fontSize: '16px', fill: '#000' });
    // PHYSICS
    this.physics.add.overlap(player, bread, collectBread, null, this);
    this.physics.add.collider(bread, platforms);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, enemy);
    this.physics.add.overlap(player, enemy, enemyAttack, null, this);
    if (mode != "single")
    {
        this.physics.add.collider(player2, platforms);
        this.physics.add.collider(player, player2);
        this.physics.add.collider(player2, enemy);
        this.physics.add.overlap(player2, bread, collectBread, null, this);
        this.physics.add.overlap(player2, enemy, enemyAttack, null, this);
    }
}

// ======================= UPDATE ========================
function update ()
{
    // background update
    count += 0.005

    clouds.x = clouds.x + Math.sin(count);
    clouds.y = clouds.y + Math.cos(count);
    
    //clouds.tilePosition.x += 1;
    //clouds.tilePosition.y += 1;

    height_score += 1
    enemy.y += 1;
    enemy.x += 3;
    updatePlatformsPosition();
    heightText.setText('platforms number: ' + platforms_number);
    // check if not new game
    if (new_game)
    {
        this.scene.restart();
        new_game = false;
    }
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
    if (mode != "single")
    {
        if (keyA.isDown)
        {
            player2.setVelocityX(-250);
            player2.anims.play('left2', true);
        }
        else if (keyD.isDown)
        {
            player2.setVelocityX(250);
            player2.anims.play('right2', true);
        }
        else
        {
            player2.setVelocityX(0);
            player2.anims.play('turn2');
        }
        if (keyW.isDown && player2.body.touching.down)
        {
            player2.setVelocityY(-700);
        }
    }
    // add next platform and remove the oldest
    
    if (height_score == 200)
    {
        height_score = 1;
        platforms_number += 1;
        addNextLevelPlatform(this, platforms_number % 3 == 0);
        removePlatformsOverMap();
        if (platforms_number % 4 == 0)
        {
            enemy.y = -50;
            enemy.x = -200;
            enemy.anims.play('fly', true);
            breadDrop(this);
        }
    }
    // check if players aren't alive
    if (mode == "cooperate")
    {
        cooperateModeLoose();
    }
    else if (mode == "single")
    {
        singleModeLoose();
    }
    else
    {
        enemyModeLoose();
    }
}

// ============== FUNCTIONS ===============
function breadDrop(scene)
{
    // BREAD GROUP
    bread = scene.physics.add.group({
        key: 'bread',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    bread.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));
    });
    scene.physics.add.overlap(player, bread, collectBread, null, this);
    scene.physics.add.collider(bread, platforms);
    if (mode != "single")
    {
        scene.physics.add.overlap(player2, bread, collectBread, null, this);
    }
}
function collectBread (_player, bread)
{
    bread.disableBody(true, true);
    if (mode == "enemy")
    {
        if (_player == player)
        {
            playerScore += 1;
            playerScoreText.setText('PLAYER 1 score: ' + playerScore);
        }
        else
        {
            player2Score += 1;
            player2ScoreText.setText('PLAYER 2 score: ' + player2Score);
        }
    }
    else if (mode == "single")
    {
        playerScore += 1;
        playerScoreText.setText('PLAYER score: ' + playerScore);
    }
    else
    {
        playerScore += 1;
        playerScoreText.setText('PLAYERS score: ' + playerScore);
    }      
}
function enemyAttack(player, enemy)
{
    player.y = canvas_H + 50;
    enemy.anims.play('enemy_atack', true);
}
function restartGame()
{
    new_game = true;
    height_score = 0;
    platforms_number = 2;
    playerScore = 0;
    player2Score = 0;
}
function setSingleMode()
{
    mode = "single";
    restartGame();
}
function setCooperateMode()
{
    mode = "cooperate";
    restartGame();
}
function setEnemyMode()
{
    mode = "enemy";
    restartGame();
}
// CHECK WHO WINS
// -------- SINGLE MODE ----------
function singleModeLoose()
{
    if (player.y > canvas_H + 10)
    { // player 1 is over map
        winningText.setText('YOU LOOSE');
        restartGame();
    }
}
// --------- ENEMY MODE ----------
function enemyModeLoose()
{
    if (player.y > canvas_H + 10 || player2.y > canvas_H + 10)
    { // player over map
        if (player.y > canvas_H + 10)
        { // player 1 is over map
            if (player2.y > canvas_H + 10)
            { // player 1 and 2 is over map                    
                winningText.setText('NOBODY WON');
                restartGame();
            }
            else
            { // only player 1 is over map
                winningText.setText('PLAYER 2 WON');                    
                restartGame();
            }
        }
        else
        { // only player 2 is over map
            winningText.setText('PLAYER 1 WON');
            restartGame();
        }
    }
}
// --------- COOPERATE MODE -----------
function cooperateModeLoose()
{
    if (player.y > canvas_H + 10 && player2.y > canvas_H + 10)
    { // no more players on map
        winningText.setText('YOU LOOSE');
        restartGame();
    }
}
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
                if (child.x > 125)
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
                if (child.x < canvas_W-125)
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
        } // expected UncaughtType Error
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
         - są animowane kaczki
    (+1) Kilka typów obiektów różniących się zachowaniem 
         (np. wrogowie, pułapki i skarby).
         - wróg
         - platformy nieruchome i ruchome
         - chleb
    (+1) Bardziej złożona logika i zależności między elementami 
         gry (np. AI wrogów, zarządzanie zasobami).
         - ? platformy się ruszają?
         - trzy tryby gry
    (+1) Kilka typów interakcji (np. walka i dialogi).
         - wróg atakuje?
         - różne naliczanie punktów w zależności od gry?
         - zbieranie chlebka?
    (+1) Większy świat gry (np. scrollowana plansza, poziomy, 
         przechodzenie między ekranami pomieszczeń). 
         - platformy generują się losowo
         - świat nie jest zamknięty - można wyskakiwać poza i wracać xd
*/
// ------------------------------------------------------------------