import kaboom from "./libs/kaboom.mjs";
import { uiManager } from "./ultis/UIManager.js";
import { load } from "./ultis/loader.js";

kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
});

load.fonts();
load.sounds();
load.assets();

const scenes = {
  menu: () => {
    // Load the assets before attempting this or sprites won't be found
    uiManager.displayMainMenu();
  },
  controls: () => {
    uiManager.displayControlsMenu();
  },

  // Levels
  1: () => {},
  2: () => {},
  3: () => {},

  gameover: () => {},

  end: () => {},
};

for (const key in scenes) {
  // scene comes from kaboom.js
  scene(key, scenes[key]);
}

// go requires a default scene
go("menu");
