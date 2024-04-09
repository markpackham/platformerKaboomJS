export class Level {

    drawMapLayout(levelLayout, mappings)

  drawBackground(bgSpriteName) {
    add([sprite(bgSpriteName), fixed(), scale(4)]);
  }
}
