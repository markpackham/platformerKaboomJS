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
