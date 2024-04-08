import kaboom from "./libs/kaboom.mjs";

kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
});

const scenes = {
  menu: () => {
    add([text("test"), pos(500, 500), color(0, 0, 0)]);
  },
  controls: () => {},

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
