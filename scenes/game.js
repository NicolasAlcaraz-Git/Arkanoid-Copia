class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  create() {
    // creacion de la barra
    this.paddle = this.add.rectangle(400, 550, 150, 20, 0x00ff00);
    this.physics.add.existing(this.paddle, true);

    // texto de score en pantalla
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "40px",
      fill: "#fbff00ff"
    });

    // creacion de la pelota
    this.ball = this.add.circle(400, 300, 10, 0xffffff);
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true, 1, 1); // la pelota rebota en las paredes
    this.ball.body.setBounce(1, 1);
    this.ball.body.setVelocity(250, -250); // la velocidad inicial de la pelota
    this.physics.world.checkCollision.down = false;

    // creacion de los ladrillos
    this.bricks = this.physics.add.staticGroup();        // grupo de ladrillos estáticos
    for (let x = 100; x < 720; x += 70) {                // medida para crear ladrillos en fila
      for (let y = 100; y < 250; y += 40) {              // medida para crear ladrillos en columna
        let brick = this.add.rectangle(x, y, 50, 20, 0xff0000);
        this.bricks.add(brick);
      }
    }

    // grupos de colisiones
    this.physics.add.collider(this.ball, this.paddle);
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);

    // controles del juego
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    // codigo para controles del juego
    if (this.cursors.left.isDown) {
      this.paddle.x -= 5;
    } else if (this.cursors.right.isDown) {
      this.paddle.x += 5;
    }

    // mantener la barra dentro de la pantalla
    if (this.paddle.x < 50) this.paddle.x = 50;
    if (this.paddle.x > 750) this.paddle.x = 750;
    this.paddle.body.updateFromGameObject(this.paddle);

    // codigo para reiniciar si la pelota toca el borde inferior
    if (this.ball.y > this.game.config.height) {
      this.scene.restart();
    }
  }

  hitBrick(ball, brick) { // si un ladrillo es destruido, genera 10 puntos
    brick.destroy();
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
    if (this.bricks.countActive() === 0) {
    this.scene.restart(); // si todos los ladrillos son destruidos, el juego se reinciia
  }
  }
}
export default Game;
