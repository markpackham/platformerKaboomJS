export class Camera {
  attachedObj = null;

  attach(gameObj, offsetX = 0, offsetY = 0) {
    this.attachedObj = gameObj;

    // onUpdate provided by Kaboom & runs on every frame
    onUpdate(() => {
      // Camera position provided by Kaboom
      camPos(
        this.attachedObj.pos.x + offsetX,
        this.attachedObj.pos.y + offsetY
      );
    });
  }
}
