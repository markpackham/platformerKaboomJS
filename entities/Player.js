export class Player {
  heightDelta = 0;

  // Used to prevent player movement so they know they died
  isRespawning = false;

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

  enablePassthrough() {
    this.gameObj.onBeforePhysicsResolve((collision) => {
      // Allow player to go jump through a pass through platform
      if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
        collision.preventResolution();
      }

      // Allow player to go down through a pass through platform
      if (collision.target.is("passthrough") && isKeyDown("down")) {
        collision.preventResolution();
      }
    });
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

      // Only move if player is not respawning
      if (!this.isRespawning) {
        // Do not move vertically in any direction so 0 for Y axis
        this.gameObj.move(-this.speed, 0);
      }
    });

    onKeyDown("right", () => {
      if (this.gameObj.curAnim() !== "run") {
        this.gameObj.play("run");
      }
      this.gameObj.flipX = false;

      if (!this.isRespawning) {
        this.gameObj.move(this.speed, 0);
      }
    });

    // Jump
    onKeyDown("space", () => {
      // Only let player jump if they are on the ground
      if (this.gameObj.isGrounded() && !this.isRespawning) {
        this.gameObj.jump(this.jumpForce);

        play("jump");
      }
    });

    // onKeyRelease is a Kaboom native function
    onKeyRelease(() => {
      if (isKeyReleased("right") || isKeyReleased("left")) {
        this.gameObj.play("idle");
      }
    });
  }

  // Respawn player & game if player still alive
  respawnPlayer() {
    if (this.lives > 0) {
      this.gameObj.pos = vec2(this.initialX, this.initialY);
      this.isResponding = true;
      // Add time delay, so player knows they died
      setTimeout(() => (this.isRespawning = false), 500);
    }
  }

  // onUpdate is a Kaboom native function
  update() {
    onUpdate(() => {
      this.heightDelta = this.previousHeight - this.gameObj.pos.y;

      if (this.gameObj.pos.y > 1000) {
        play("hit", { speed: 1.5 });
        this.respawnPlayer();
      }

      // If > than 0 player is ascending
      if (!this.gameObj.isGrounded() && this.heightDelta > 0) {
        this.gameObj.play("jump-up");
      }
    });
  }
}
