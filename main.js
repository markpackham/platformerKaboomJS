// External imports
import kaboom from "./libs/kaboom.mjs";

// Internal imports
import { Axes } from "./entities/Axes.js";
import { Birds } from "./entities/Birds.js";
import { Level } from "./utils/Level.js";
import { level1Config } from "./content/level1/config.js";
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js";
import { level2Config } from "./content/level2/config.js";
import { level2Layout, level2Mappings } from "./content/level2/level2Layout.js";
import { level3Config } from "./content/level3/config.js";
import { level3Layout, level3Mappings } from "./content/level3/level3Layout.js";
import { load } from "./utils/loader.js";
import { Player } from "./entities/Player.js";
import { Projectiles } from "./entities/Projectiles.js";
import { Saws } from "./entities/Saws.js";
import { Spiders } from "./entities/Spiders.js";
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
  // Level 1
  1: () => {
    // Background music of water
    const waterAmbience = play("water-ambience", {
      volume: 0.2,
      loop: true,
    });

    onSceneLeave(() => {
      waterAmbience.paused = true;
    });

    // Gravity is built into Kaboom
    setGravity(1400);

    const level1 = new Level();
    level1.drawBackground("forest-background");
    level1.drawMapLayout(level1Layout, level1Mappings);

    // Player
    const player = new Player(
      level1Config.playerStartPosX,
      level1Config.playerStartPosY,
      level1Config.playerSpeed,
      level1Config.jumpForce,
      level1Config.nbLives,
      // Level scene is 1
      1,
      // Level is NOT final level
      false
    );

    // Allow player to pass through platforms coded with specific symbols
    // "passthrough" code "9aab"
    // we call this one way collision where it can jump through but not fall through
    // the platform
    player.enablePassthrough();

    player.enableCoinPickup();

    player.enableMobVulnerability();

    player.enableEnemyCrashDeath();

    // Check if player is still alive
    player.update();

    // Spiders
    const spiders = new Spiders(
      // Grab spiders from the config file for level 1
      level1Config.spiderPositions.map((spiderPos) => spiderPos()),
      level1Config.spiderRanges,
      level1Config.spiderDurations,
      level1Config.spiderType
    );
    // Set AI for spiders
    spiders.setMovementPattern();
    spiders.enablePassthrough();

    const fish = new Projectiles(
      level1Config.fishPositions.map((fishPos) => fishPos()),
      level1Config.fishRanges,
      "fish"
    );

    fish.setMovementPattern();

    // Camera
    attachCamera(player.gameObj, 0, 200);

    // Use wave animation
    level1.drawWaves("water", "wave");

    // Background used to make Coins & Lives score prettier
    uiManager.addDarkBg();

    // Coin count
    uiManager.displayCoinCount();
    player.updateCoinCount(uiManager.coinCountUI);

    // Lives count
    uiManager.displayLivesCount();
    player.updateLivesCount(uiManager.livesCountUI);
  },
  // Level 2
  2: () => {
    const lavaAmbience = play("lava-ambience", {
      volume: 0.5,
      loop: true,
    });

    onSceneLeave(() => {
      lavaAmbience.paused = true;
    });

    setGravity(1400);

    const level2 = new Level();
    level2.drawBackground("castle-background");
    level2.drawMapLayout(level2Layout, level2Mappings);

    const player = new Player(
      level2Config.playerStartPosX,
      level2Config.playerStartPosY,
      level2Config.playerSpeed,
      level2Config.jumpForce,
      level2Config.nbLives,
      2,
      false
    );

    player.enablePassthrough();
    player.enableCoinPickup();
    player.enableMobVulnerability();
    player.enableEnemyCrashDeath();

    player.update();

    const spiders = new Spiders(
      level2Config.spiderPositions.map((spiderPos) => spiderPos()),
      level2Config.spiderRanges,
      level2Config.spiderDurations,
      level2Config.spiderType
    );
    spiders.setMovementPattern();
    spiders.enablePassthrough();

    const flame = new Projectiles(
      level2Config.flamePositions.map((flamePos) => flamePos()),
      level2Config.flameRanges,
      "flame"
    );
    flame.setMovementPattern();

    const axes = new Axes(
      level2Config.axesPositions.map((axePos) => axePos()),
      level2Config.axesSwingTimes
    );
    axes.setMovementPattern();

    const saws = new Saws(
      level2Config.sawPositions.map((sawPos) => sawPos()),
      level2Config.sawRanges
    );
    saws.setMovementPattern();

    attachCamera(player.gameObj, 0, 200);

    level2.drawWaves("lava", "wave");

    uiManager.addDarkBg();

    uiManager.displayCoinCount();
    player.updateCoinCount(uiManager.coinCountUI);

    uiManager.displayLivesCount();
    player.updateLivesCount(uiManager.livesCountUI);
  },
  // Level 3
  3: () => {
    const windAmbience = play("strong-wind", {
      volume: 0.2,
      loop: true,
    });

    onSceneLeave(() => {
      windAmbience.paused = true;
    });

    setGravity(1400);

    const level3 = new Level();
    level3.drawBackground("sky-background-0");
    level3.drawBackground("sky-background-1");
    level3.drawBackground("sky-background-2");
    level3.drawMapLayout(level3Layout, level3Mappings);

    const player = new Player(
      level3Config.playerStartPosX,
      level3Config.playerStartPosY,
      level3Config.playerSpeed,
      level3Config.jumpForce,
      level3Config.nbLives,
      3,
      // Final level so we use "true"
      true
    );

    player.enablePassthrough();
    player.enableCoinPickup();
    player.enableMobVulnerability();
    player.enableEnemyCrashDeath();

    player.update();

    const birds = new Birds(
      level3Config.birdPositions.map((birdPos) => birdPos()),
      level3Config.birdRanges
    );
    birds.setMovementPattern();

    attachCamera(player.gameObj, 0, 200);

    level3.drawWaves("clouds", "wave");

    uiManager.addDarkBg();

    uiManager.displayCoinCount();
    player.updateCoinCount(uiManager.coinCountUI);

    uiManager.displayLivesCount();
    player.updateLivesCount(uiManager.livesCountUI);
  },

  gameover: () => {
    uiManager.displayGameOverScreen();
  },

  end: () => {
    uiManager.displayEndGameScreen();
  },
};

for (const key in scenes) {
  // scene comes from kaboom.js
  scene(key, scenes[key]);
}

// Go requires a default scene to start the entire thing off
// normally you'd start with "menu" but for testing levels you can set it
// for example to level "1", "2" or "3"
go("menu");
