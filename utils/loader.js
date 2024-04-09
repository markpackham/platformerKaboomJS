export const load = {
  fonts: () => {
    loadFont("Round", "./assets/Round9x13.ttf");
  },

  // Assets
  assets: () => {
    // Controls prompts
    loadSprite("up", "./assets/Arrow_Up_Key_Dark.png");
    loadSprite("down", "./assets/Arrow_Down_Key_Dark.png");
    loadSprite("left", "./assets/Arrow_Left_Key_Dark.png");
    loadSprite("right", "./assets/Arrow_Right_Key_Dark.png");
    loadSprite("space", "./assets/Space_Key_Dark.png");

    // forest-background is what we are choosing to call it
    loadSprite("forest-background", "./assets/Forest_Background_0.png");

    loadSprite("coin-icon", "./assets/Coins_Ui.png");
    loadSprite("star-icon", "./assets/Stars_Ui.png");
    loadSprite("coin", "./assets/Coin.png");

    loadSprite("logo", "./assets/Logo.png");

    loadSprite("bridge", "./assets/Bridge.png");

    // Loading a sprite sheet, more complex than a simple sprite
    // has 3rd param to tell kaboom which part of image responds to which tiles
    loadSprite("grass-tileset", "./assets/Grass_Tileset.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        bl: 6,
        bm: 7,
        br: 8,
      },
    });

    loadSprite("grass-oneway-tileset", "./assets/Grass_Oneway.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        bl: 6,
        bm: 7,
        br: 8,
      },
    });
  },

  // Sounds
  sounds: () => {
    loadSound("jump", "./sounds/jump.wav");
    loadSound("coin", "./sounds/coin.wav");
    loadSound("water-ambience", "./sounds/water-ambience.mp3");
    loadSound("spider-attack", "./sounds/spider-attack.mp3");
    loadSound("hit", "./sounds/hit.wav");
    loadSound("lava-ambience", "./sounds/lava.wav");
    loadSound("confirm-ui", "./sounds/confirm-ui.wav");
    loadSound("swinging-axe", "./sounds/swinging-axe.mp3");
    loadSound("saw", "./sounds/saw.wav");
    loadSound("fireball", "./sounds/fireball.wav");
    loadSound("strong-wind", "./sounds/strong-wind.wav");
    loadSound("dive", "./sounds/dive.wav");
  },
};
