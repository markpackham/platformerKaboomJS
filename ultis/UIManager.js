// UIManager will be a singleton so it will only be instantiate once
class UIManager {
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
