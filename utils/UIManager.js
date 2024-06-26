import { bgSoundManager } from "./BGSoundManager.js";

// UIManager will be a singleton so it will only be instantiate once
class UIManager {
  displayLivesCount(player) {
    this.livesCountUI = add([
      text("", {
        font: "Round",
        size: 50,
      }),
      fixed(),
      pos(70, 10),
    ]);

    this.livesCountUI.add([
      sprite("heart-icon"),
      pos(-60, -5),
      scale(3),
      fixed(),
    ]);
  }

  displayCoinCount(player) {
    this.coinCountUI = add([
      text("", {
        font: "Round",
        size: 50,
      }),
      {
        // Kaboom allows us to get() all game objects with a certain tag
        fullCoinCount: get("coin", { recursive: true }).length,
      },
      // Do not let coin count move with the camera
      fixed(),
      pos(70, 70),
    ]);

    this.coinCountUI.add([sprite("coin-icon"), pos(-60, 0), scale(3), fixed()]);
  }

  displayBlinkingUIMessage(content, position) {
    const message = add([
      text(content, {
        size: 24,
        font: "Round",
      }),
      area(),
      anchor("center"),
      pos(position),
      opacity(),
      // First param is the default state
      state("flash-up", ["flash-up", "flash-down"]),
    ]);

    message.onStateEnter("flash-up", async () => {
      // Tween allows smooth animation transition eg fade in
      // await forces us to wait for the tween to finishing before moving on
      await tween(message.opacity, 0, 0.5, (nextOpacityValue) => {
        (message.opacity = nextOpacityValue),
          // easings are the rate of change over time
          easings.linear;
      });
      message.enterState("flash-down");
    });

    // Inverse logic of flash-up
    message.onStateEnter("flash-down", async () => {
      await tween(message.opacity, 1, 0.5, (nextOpacityValue) => {
        (message.opacity = nextOpacityValue), easings.linear;
      });
      message.enterState("flash-up");
    });
  }

  displayMainMenu() {
    add([sprite("forest-background"), scale(4)]);
    add([
      sprite("logo"),
      // area creates a hitbox & allows you to use anchor to position it
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
      scale(8),
    ]);

    this.displayBlinkingUIMessage(
      "Press [ Enter ] to Start Game",
      vec2(center().x, center().y + 100)
    );

    // kamboo.js answer to onClick
    onKeyPress("enter", () => {
      // play lets you play sounds
      play("confirm-ui", { speed: 1.5 });
      go("controls");
    });
  }

  displayControlsMenu() {
    add([sprite("forest-background"), scale(4)]);
    add([
      text("Controls", { font: "Round", size: 50 }),
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
    ]);

    // Game object that can have children
    const controlPrompts = add([pos(center().x + 30, center().y)]);

    controlPrompts.add([
      sprite("up"),
      // Values are relative to the position of the parent
      pos(0, -80),
    ]);

    // Movement Controls
    // A single game object can have multiple children
    controlPrompts.add([sprite("down")]);
    controlPrompts.add([sprite("left"), pos(-80, 0)]);
    controlPrompts.add([sprite("right"), pos(80, 0)]);
    controlPrompts.add([sprite("space"), pos(-200, 0)]);
    controlPrompts.add([
      text("Attack*", { font: "Round", size: 32 }),
      pos(-190, 100),
    ]);
    controlPrompts.add([
      text("Move", { font: "Round", size: 32 }),
      pos(10, 100),
    ]);

    this.displayBlinkingUIMessage(
      "(*Attack wiill be added later) - Press [ Enter ] to Start Game",
      vec2(center().x, center().y + 300)
    );

    onKeyPress("enter", () => {
      play("confirm-ui", { speed: 1.5 });
      // Go to scene / level number
      // CHANGE HERE TO CHANGE START LEVEL
      go("1");
    });
  }

  // Game Over
  displayGameOverScreen() {
    bgSoundManager.pauseAllSounds();
    add([rect(1280, 720), color(0, 0, 0)]);
    add([
      text("Game Over!", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ]);

    this.displayBlinkingUIMessage(
      "Press [ Enter ] to Start Game",
      vec2(center().x, center().y + 100)
    );

    onKeyPress("enter", () => {
      play("confirm-ui");
      go(1);
    });
  }

  // End Game / Player Won
  displayEndGameScreen() {
    bgSoundManager.pauseAllSounds();
    add([rect(1280, 720), color(0, 0, 0)]);
    add([
      text("You Won! Thanks for Playing.", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ]);

    this.displayBlinkingUIMessage(
      "Press [ Enter ] to Play Again",
      vec2(center().x, center().y + 100)
    );

    onKeyPress("enter", () => {
      play("confirm-ui");
      go("menu");
    });
  }

  addDarkBg() {
    add([rect(270, 130), color(0, 0, 0), fixed()]);
  }
}

export const uiManager = new UIManager("flash-up");
