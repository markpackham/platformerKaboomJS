export const level3Config = {
  gravity: 1400,
  playerSpeed: 400,
  jumpForce: 650,
  nbLives: 15,
  playerStartPosX: 1500,
  playerStartPosY: 100,
  birdRanges: [100, 200, 100, 200, 100, 100, 300, 100],
  birdPositions: [
    () => vec2(1900, 300),
    () => vec2(3000, 100),
    () => vec2(3500, 800),
    () => vec2(4000, 100),
    () => vec2(5000, 80),
    () => vec2(6000, 200),
    () => vec2(6500, 100),
    () => vec2(7500, 500),
  ],
};
