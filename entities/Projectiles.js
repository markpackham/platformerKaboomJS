export class Projectiles {
  constructor(positions, amplitudes, type) {
    this.amplitudes = amplitudes;
    this.projectiles = [];

    const animMap = {
      fish: "swim",
      flame: "burn",
    };

    for (const position of positions) {
      this.projectiles.push(
        add([
          sprite(type, { anim: animMap[type] }),
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

  setMovementPattern() {
    for (const [index, projectile] of this.projectiles.entries()) {
      const launch = projectile.onStateEnter("launch", async () => {
        projectile.flipY = false;
        await tween(
          projectile.pos.y,
          projectile.pos.y - this.amplitudes[index],
          2,
          (posY) => (projectile.pos.y = posY),
          easings.easeOutSine
        );
        projectile.enterState("fall");
      });
    }
  }
}
