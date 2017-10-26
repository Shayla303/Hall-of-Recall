var game = new Phaser.Game(1150, 600, Phaser.AUTO, 'game', {
  preload: preload,
  create: create,
  update: update
});

var jumpTimer = 0;
var player;

function preload() {
  game.load.tilemap('hRecall_map', 'hRecall_map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', '/assets/castle_tileset_part1.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
  game.world.setBounds(0, 0, 1280, 800);
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('hRecall_map');
  map.addTilesetImage('castle', 'tiles');
  collisionLayer = map.createLayer('collisionLayer');
  bgLayer = map.createLayer('bgLayer');
  reliefLayer = map.createLayer('reliefLayer');
  game.physics.enable(collisionLayer);

  player = game.add.sprite(100, game.world.height - 560, 'dude');
  game.physics.enable(player);
  map.setCollisionBetween(1, 1000, true, collisionLayer);

  player.body.collideWorldBounds = true;
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
  rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
  upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
  downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  cursors = game.input.keyboard.createCursorKeys();
}

var jumpTimer = 0;
var player;

function update() {
  game.physics.arcade.collide(player, collisionLayer);
  game.camera.follow(player);
  player.body.velocity.x = 0;
  if (cursors.left.isDown || leftKey.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('left');
  } else if (cursors.right.isDown || rightKey.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('right');
  } else {
    player.animations.stop();
    player.frame = 4;
  }

  if (cursors.left.isDown && rightKey.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('left');
  }
  if (cursors.right.isDown && leftKey.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('right');
  }

  if ((jumpButton.isDown ||
  upKey.isDown ||
  cursors.up.isDown) && player.body.onFloor() && game.time.now > jumpTimer) {
    player.body.velocity.y = -325;
    jumpTimer = game.time.now + 750;
  }
}
