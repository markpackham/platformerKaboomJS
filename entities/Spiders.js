export class Spiders {
  // ranges concerns how far the spiders go back & forth
  // we use different spider types depending on the level
  constructor(positions, ranges, durations, type) {
    this.ranges = ranges;
    this.durations = durations;
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

  // Crawl
  async crawl(spider, moveBy, duration) {
    if (spider.curAnim() !== "crawl") spider.play("crawl");

    await tween(
      spider.pos.x,
      spider.pos.x + moveBy,
      duration,
      (posX) => (spider.pos.x = posX),
      easings.easeOutSine
    );
  }

  // Movement Pattern
  setMovementPattern() {
    for (const [index, spider] of this.spiders.entries()) {
      // onStateEnter will let us cancel the event
      // when the player level the scene to avoid wasting
      // resources, you shouldn't here a level 1 spider moving about
      // if you are on level 2 or 3
      const idle = spider.onStateEnter("idle", async (previousState) => {
        // Kaboom lets us use a curAnim() to get current animation
        if (spider.curAnim() !== "idle") {
          spider.play("idle");

          // Make spider wait 1 second before moving on
          // await is used to block the rest of the function until this is done
          await new Promise((resolve) => {
            setTimeout(() => resolve(), 1000);
          });

          if (previousState === "crawl-left") {
            spider.enterState("crawl-right");
            return;
          }

          spider.jump();

          if (!spider.isOffScreen()) {
            play("spider-attack", { volume: 0.6 });
          }
        }

        spider.enterState("crawl-left");
      });

      // Crawl left
      const crawlLeft = spider.onStateEnter("crawl-left", async () => {
        // Make spider face the left
        spider.flipX = false;

        // Crawl spider leftwards so -ranges
        await this.crawl(spider, -this.ranges[index], this.durations[index]);
        spider.enterState("idle", "crawl-left");
      });

      // Crawl right
      const crawlRight = spider.onStateEnter("crawl-right", async () => {
        spider.flipX = true;

        // Crawl spider leftwards so -ranges
        await this.crawl(spider, this.ranges[index], this.durations[index]);
        spider.enterState("idle");
      });

      // CANCEL ALL STATES ON LEAVE SCENE
      // Use Kaboom function to cancel all states, save resources
      // so they don't persist after the level
      onSceneLeave(() => {
        idle.cancel();
        crawlLeft.cancel();
        crawlRight.cancel();
      });
    }
  }
}
