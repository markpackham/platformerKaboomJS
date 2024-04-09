export function generateMappings(tileType) {
  return {
    // Sprite examples "brick", "grass"
    0: () => [
      sprite(`${tileType}-tileset`),
      // area component needed for hitboxes
      area(),
      // Behavior for hitboxes
      // if isStatic true then object not effected by gravity
      body({ isStatic: true }),
      // When object not visible then Kaboom saves resources not running it
      offscreen(),
    ],

    1: () => [
      sprite(`${tileType}-tileset`, { anim: "tm" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    2: () => [
      sprite(`${tileType}-tileset`, { anim: "tr" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    3: () => [
      sprite(`${tileType}-tileset`, { anim: "ml" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    4: () => [sprite(`${tileType}-tileset`, { anim: "mm" }), offscreen()],
    5: () => [
      sprite(`${tileType}-tileset`, { anim: "mr" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    6: () => [sprite(`${tileType}-tileset`, { anim: "bl" }), offscreen()],
    7: () => [sprite(`${tileType}-tileset`, { anim: "bm" }), offscreen()],
    8: () => [sprite(`${tileType}-tileset`, { anim: "br" }), offscreen()],
    9: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tl" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    a: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tm" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    b: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tr" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    c: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "ml" }),
      offscreen(),
    ],
    d: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "mm" }),
      offscreen(),
    ],
    e: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "mr" }),
      offscreen(),
    ],
    o: () => [sprite("bridge"), area(), body({ isStatic: true }), offscreen()],
    "@": () => [sprite("coin"), area(), "coin", offscreen()],
  };
}
