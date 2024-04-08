// UIManager will be a singleton so it will only be instantiate once
class UIManager {
  displayMainMenu() {
    add([sprite("forest-background")]);
  }
}

export const uiManager = new UIManager();
