let _player = null;
let _stars = null;
let _bombs = null;
let _platforms = null;
let _input = null;
let _cursors = null;
let _cursorsOld = null;
let _score = 0;
let _scoreText = "";
let _gameOver = false;
let _gameOverCallback = null;
let _sound = null;
let _gameStartTimestamp = null;
let _gameOverTimestamp = null;
let _gameTimer = null;
let _playTimeText = "";
let _gameScene = null;

function preload() {
  this.load.image("sky", "/assets/sky.png");
  this.load.image("ground", "/assets/platform.png");
  this.load.image("star", "/assets/star.png");
  this.load.image("bomb", "/assets/bomb.png");
  this.load.spritesheet("dude", "/assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.audio("bg_during_play", ["assets/musics/during_play.mp3"]);
}

function create() {
  _gameStartTimestamp = Date.now();

  // Add a background music
  _sound = this.sound.add("bg_during_play", { loop: true });
  _sound.play();

  //  A simple background for our game
  this.add.image(400, 300, "sky");

  //  The platforms group contains the ground and the 2 ledges we can jump on
  _platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  _platforms.create(400, 568, "ground").setScale(2).refreshBody();

  //  Now let's create some ledges
  _platforms.create(600, 400, "ground");
  _platforms.create(50, 250, "ground");
  _platforms.create(750, 220, "ground");

  // The player and its settings
  _player = this.physics.add.sprite(100, 450, "dude");

  //  Player physics properties. Give the little guy a slight bounce.
  _player.setBounce(0.2);
  _player.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  //  Input Events
  _cursorsOld = _cursors;
  _cursors = this.input.keyboard.createCursorKeys();

  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  _stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  _stars.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  _bombs = this.physics.add.group();
  createBomb(_player);

  //  The score
  _scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(_player, _platforms);
  this.physics.add.collider(_stars, _platforms);
  this.physics.add.collider(_bombs, _platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(_player, _stars, collectStar, null, this);

  this.physics.add.collider(_player, _bombs, hitBomb, null, this);

  // The playtime
  _playTimeText = this.add.text(650, 16, "00:00:00", {
    fontSize: "24px",
    fill: "#000",
  });

  // Save scene to use for restarting game
  _gameScene = this.scene;
}

function getPlaytimeText(playtime) {
  const hours = ("0" + Math.floor(playtime / 1000 / 60 / 60)).slice(-2);

  playtime -= hours * 1000 * 60 * 60;
  const mins = ("0" + Math.floor(playtime / 1000 / 60)).slice(-2);

  playtime -= hours * 1000 * 60;
  const secs = ("0" + Math.floor(playtime / 1000)).slice(-2);

  return `${hours}:${mins}:${secs}`;
}

function update() {
  if (_gameOver) {
    return;
  }

  if (_cursors.left.isDown) {
    _player.setVelocityX(-160);

    _player.anims.play("left", true);
  } else if (_cursors.right.isDown) {
    _player.setVelocityX(160);

    _player.anims.play("right", true);
  } else {
    _player.setVelocityX(0);

    _player.anims.play("turn");
  }

  if (_cursors.up.isDown && _player.body.touching.down) {
    _player.setVelocityY(-330);
  }

  // Set playtime
  let playtime = Date.now() - _gameStartTimestamp;
  _playTimeText.setText(getPlaytimeText(playtime));
}

function createBomb(player) {
  var x =
    player.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

  let bomb = _bombs.create(x, 16, "bomb");
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(window.Phaser.Math.Between(-200, 200), 20);
  bomb.allowGravity = false;
}

function collectStar(player, star) {
  star.disableBody(true, true);

  //  Add and update the score
  _score += 10;
  _scoreText.setText("Score: " + _score);

  if (_stars.countActive(true) === 0) {
    //  A new batch of stars to collect
    _stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    createBomb(player);
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  _gameOver = true;

  _gameOverTimestamp = Date.now();

  if (_gameTimer !== null) {
    _gameTimer.stop();
  }

  if (_sound !== null) {
    _sound.stop();
  }

  if (_gameOverCallback !== null) {
    _gameOverCallback({
      score: _score,
      bombCount: _bombs.children.size,
      playtime: _gameOverTimestamp - _gameStartTimestamp,
    });
  }
}

function setGameOverCallback(callback) {
  _gameOverCallback = callback;
}

function destroyGame() {
  /*
  if (_gameScene === null) {
    return;
  }

  _gameScene.restart();
  */
  if (_input !== null) {
    _input.removeAllListeners();
  }
}

const PhaserGame = {
  preload,
  create,
  update,
  setGameOverCallback,
  getPlaytimeText,
  destroyGame,
};

export default PhaserGame;
