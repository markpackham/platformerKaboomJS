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
    // Allow player movement
    this.setPlayerControls();
    this.speed = speed;
    this.jumpForce = jumpForce;
    this.lives = nbLives;
    // We need height data for jumps
    this.previousHeight = this.gameObj.pos.y;
  }

  makePlayer() {
    this.gameObj = add([
      // Default animation is idle
      sprite("player", { anim: "idle" }),
      area({ shape: new Rect(vec2(0, 3), 8, 8) }),
      anchor("center"),
      pos(this.initialX, this.initialY),
      scale(4),
      body(),
      "player",
    ]);
  }

  setPlayerControls() {
    // Kamboo specific function, not standard JS
    onKeyDown("left", () => {
      if (this.gameObj.curAnim() !== "run") {
        // Using Kaboom play "method" not to be confused with the Object independent
        // play() function that is intended to play sounds while the Object method play() is for animation
        this.gameObj.play("run");
      }
      // Make player face left
      this.gameObj.flipX = true;
      // Do not move vertically in any direction so 0 for Y axis
      this.gameObj.move(-this.speed, 0);
    });

    onKeyDown("right", () => {
      if (this.gameObj.curAnim() !== "run") {
        this.gameObj.play("run");
      }
      this.gameObj.flipX = false;
      this.gameObj.move(this.speed, 0);
    });
  }
}
