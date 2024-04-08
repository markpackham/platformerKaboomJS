// UIManager will be a singleton so it will only be instantiate once
class UIManager {
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
      "Press [ Enter ] to start",
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

    // A single game object can have multiple children
    controlPrompts.add([sprite("down")]);

    controlPrompts.add([sprite("left"), pos(-80, 0)]);

    controlPrompts.add([sprite("right"), pos(80, 0)]);

    controlPrompts.add([sprite("space"), pos(-200, 0)]);
  }
}

export const uiManager = new UIManager("flash-up");
