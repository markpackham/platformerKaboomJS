import kaboom from "./libs/kaboom.mjs";
import { Level } from "./utils/Level.js";
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js";
import { load } from "./utils/loader.js";
import { Player } from "./entities/Player.js";
import { uiManager } from "./utils/UIManager.js";
import attachCamera from "./utils/camera.js";

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
  1: () => {
    // Gravity is built into Kaboom
    setGravity(1400);

    const level1 = new Level();
    level1.drawBackground("forest-background");
    level1.drawMapLayout(level1Layout, level1Mappings);

    // Player
    const player = new Player(1500, 100, 400, 650, 3, 1, false);

    // Camera
    attachCamera(player.gameObj, 0, 200);

    // Use wave animation
    level1.drawWaves("water", "wave");
  },
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
