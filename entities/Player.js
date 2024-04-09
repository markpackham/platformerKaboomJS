export class Player {
  constructor(
    posX,
    posY,
    speed,
    jumpForce,
    nbLives,
    currentLevelScene,
    // isInTerminalScene checks if they completed the game
    isInTerminalScene
  ) {
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.jumpForce = jumpForce;
    this.nbLives = nbLives;
    this.currentLevelScene = currentLevelScene;
    this.isInTerminalScene = isInTerminalScene;
  }
}
