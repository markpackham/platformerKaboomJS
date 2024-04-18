export class Projectiles {
  constructor(positions, amplitudes, type) {
    this.amplitudes = amplitudes;
    this.projectiles = [];
    for (const position of positions) {
      this.projectiles.push(
        add([
          sprite(type, { anim: "swim" }),
          area({ shape: new Rect(vec2(0), 12, 12) }),
          anchor("center"),
          pos(position),
          scale(4),
          rotate(90),
          state("launch", ["launch", "rotate", "fall"]),
          offscreen(),
          "fish",
        ])
      );
    }
  }

  setMovementPattern() {}
}
