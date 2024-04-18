export class Spiders {
  // amplitudes concerns how far the spiders go back & forth
  // we use different spider types depending on the level
  constructor(positions, amplitudes, velocities, type) {
    this.amplitudes = amplitudes;
    this.velocities = velocities;
    this.spiders = [];
    for (const position of positions) {
      this.spiders.push(add([sprite(`spider-${type}`, { anim: "crawl" })]));
    }
  }
}
