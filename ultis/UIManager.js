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
  }
}

export const uiManager = new UIManager("flash-up");
