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
  };
}
