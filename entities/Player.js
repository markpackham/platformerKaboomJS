export class Player {
  heightDelta = 0;
  isMoving = false;
  // Used to prevent player movement so they know they died
  isRespawning = false;
  // For coyote time (mercy time for rubbish players to jump when falling)
  coyoteLapse = 0.1;
  coins = 0;

  constructor(
    posX,
    posY,
    speed,
    jumpForce,
    nbLives,
    currentLevelScene,
    // isInFinalLevel checks if they completed the game
    isInFinalLevel
  ) {
    this.currentLevelScene = currentLevelScene;
    this.isInFinalLevel = isInFinalLevel;
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

  enableCoinPickup() {
    this.gameObj.onCollide("coin", (coin) => {
      this.coins++;
      // Kamboom provides destroy() which lets you remove a game object
      destroy(coin);
      play("coin");
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
      this.isMoving = true;

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
      this.isMoving = true;

      if (!this.isRespawning) {
        this.gameObj.move(this.speed, 0);
      }
    });

    // Jump
    onKeyDown("space", () => {
      // // Only let player jump if they are on the ground
      // if (
      //   this.gameObj.isGrounded() &&
      //   !this.isRespawning &&
      //   !this.hasJumpedOnce
      // ) {
      //   this.hasJumpedOnce = true;
      //   this.gameObj.jump(this.jumpForce);
      //   play("jump");
      // }
      // // Coyote time (for rubbish players)
      // // Named after the Wile E. Coyote cartoon, coyote time is a brief period
      // // of time after running off a platform where the game will still register
      // // the player pressing the jump button
      // if (
      //   !this.gameObj.isGrounded() &&
      //   time() - this.timeSinceLastGrounded < this.coyoteLapse &&
      //   !this.hasJumpedOnce
      // ) {
      //   this.hasJumpedOnce = true;
      //   this.gameObj.jump(this.jumpForce);
      //   play("jump");
      // }

      if (!this.gameObj.isGrounded() && this.hasJumpedOnce) return;

      if (time() - this.timeSinceLastGrounded > this.coyoteLapse) return;

      this.gameObj.jump(this.jumpForce);
      play("jump");
      this.hasJumpedOnce = true;
    });

    // onKeyRelease is a Kaboom native function
    onKeyRelease(() => {
      if (isKeyReleased("right") || isKeyReleased("left")) {
        this.gameObj.play("idle");
        this.isMoving = false;
      }
    });
  }

  // Respawn player & game if player still alive
  respawnPlayer() {
    if (this.lives > 0) {
      this.lives--;
      this.gameObj.pos = vec2(this.initialX, this.initialY);
      this.isResponding = true;
      // Add time delay, so player knows they died
      setTimeout(() => (this.isRespawning = false), 500);
    } else {
      // Go to Game Over scene
      go("gameover");
    }
  }

  // Harm player when hitting enemy
  enableMobVulnerability() {
    function hitAndRespawn(context) {
      play("hit", { speed: 1.5 });
      context.respawnPlayer();
    }
    // Things that can harm the player
    // the "this" being hit is the Player class
    this.gameObj.onCollide("spiders", () => hitAndRespawn(this));
    this.gameObj.onCollide("fish", () => hitAndRespawn(this));
    this.gameObj.onCollide("flame", () => hitAndRespawn(this));
    this.gameObj.onCollide("axes", () => hitAndRespawn(this));
  }

  // onUpdate is a Kaboom native function
  // Runs on every frame
  update() {
    onUpdate(() => {
      // For coyote time
      if (this.gameObj.isGrounded()) {
        this.hasJumpedOnce = false;
        // Set to current time
        this.timeSinceLastGrounded = time();
      }

      this.heightDelta = this.previousHeight - this.gameObj.pos.y;
      // Keep track of previous height of player frame
      this.previousHeight = this.gameObj.pos.y;

      if (this.gameObj.pos.y > 1000) {
        play("hit", { speed: 1.5 });
        this.respawnPlayer();
      }

      // Always set player to idle if not moving
      // make sure you don't waste memory setting them to idle if they
      // already are idle
      if (!this.isMoving && this.gameObj.curAnim() !== "idle") {
        this.gameObj.play("idle");
      }

      // If > than 0 player is ascending
      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta > 0 &&
        this.gameObj.curAnim() !== "jump-up"
      ) {
        this.gameObj.play("jump-up");
      }

      // Fall animation
      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta < 0 &&
        this.gameObj.curAnim() !== "jump-down"
      ) {
        this.gameObj.play("jump-down");
      }
    });
  }

  updateLivesCount(livesCountUI) {
    onUpdate(() => {
      livesCountUI.text = this.lives;
    });
  }

  updateCoinCount(coinCountUI) {
    onUpdate(() => {
      coinCountUI.text = `${this.coins} / ${coinCountUI.fullCoinCount}`;
      // Check if level completed by collecting all coins
      if (this.coins === coinCountUI.fullCoinCount) {
        // Check if player has completed the game or needs to more onto the next level
        go(this.isInFinalLevel ? "end" : this.currentLevelScene + 1);
      }
    });
  }
}
