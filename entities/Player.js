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
    this.currentLevelScene = currentLevelScene;
    this.isInTerminalScene = isInTerminalScene;
    this.initialX = posX;
    this.initialY = posY;
    this.makePlayer();
    this.speed = speed;
    this.jumpForce = jumpForce;
    this.lives = nbLives;
    this.previousHeight = this.gameObj.pos.y;
  }

  makePlayer() {
    this.gameObj = add([
      sprite("player", { anim: "idle" }),
      area({ shape: new Rect(vec2(0, 3), 8, 8) }),
      anchor("center"),
      pos(this.initialX, this.initialY),
      scale(4),
      body(),
      "player",
    ]);
  }
}
