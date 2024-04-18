export class Spiders {
  // amplitudes concerns how far the spiders go back & forth
  // we use different spider types depending on the level
  constructor(positions, amplitudes, velocities, type) {
    this.amplitudes = amplitudes;
    this.velocities = velocities;
    this.spiders = [];
    for (const position of positions) {
      this.spiders.push(
        add([
          sprite(`spider-${type}`, { anim: "crawl" }),
          pos(position),
          area({
            shape: new Rect(vec2(0.0, 4.5), 20, 6),

            // Allow spiders to move through each other
            collisitionIgnore: ["spiders"],
          }),
          anchor("center"),
          body(),
          scale(4),
          // Spider's ai, default is idle
          state("idle", ["idle", "crawl-left", "crawl-right"]),
          offscreen(),
          // Tag used to say enemy is a spider
          "spiders",
        ])
      );
    }
  }
}
