export const load = {
  fonts: () => {
    loadFont("Round", "./assets/Round9x13.ttf");
  },

  assets: () => {
    // forest-background is what we are choosing to call it
    loadSprite("forest-background", "./assets/Forest_Background_0.png");
  },
};
