class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  create() {
    // creacion de la barra
    this.paddle = this.add.rectangle(400, 550, 100, 20, 0x00ff00);
    this.physics.add.existing(this.paddle, true);

    // creacion de la pelota
    this.ball = this.add.circle(400, 300, 10, 0xffffff);
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true, 1, 1); // la pelota rebota en las paredes
    this.ball.body.setBounce(1, 1);
    this.ball.body.setVelocity(250, -250); // la velocidad inicial de la pelota

    // creacion de los ladrillos
    this.bricks = this.physics.add.staticGroup();       // grupo de ladrillos estáticos
    for (let x = 80; x < 720; x += 60) {                // crear ladrillos en fila
      for (let y = 50; y < 200; y += 30) {              // crear ladrillos en columna
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
  }

  hitBrick(ball, brick) {
    brick.destroy(); // eliminar ladrillo al ser golpeado
  }
}
export default Game;
