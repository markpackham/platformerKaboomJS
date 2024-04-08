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
  }
}

export const uiManager = new UIManager();
