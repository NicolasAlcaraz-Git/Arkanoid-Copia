import game from "./scenes/game.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,         // ancho de la pantalla del juego
  height: 600,        // alto de la pantalla del juego
  scale: {
    mode: Phaser.Scale.FIT,                // modo de escala, FIT ajusta el juego al tamaño de la pantalla
    autoCenter: Phaser.Scale.CENTER_BOTH,  // centra el juego en la pantalla
    min: { width: 16, height: 9 },         // tamaño mínimo de la pantalla
    max: { width: 1920, height: 1080 },    // tamaño máximo de la pantalla
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [game],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);