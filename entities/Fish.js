export class Fish {
  constructor(positions, amplitudes, type) {
    this.amplitudes = amplitudes;
    this.fish = [];
    for (const position of positions) {
      this.fish.push(
        add([
          sprite(`fish`, { anim: "swim" }),
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
