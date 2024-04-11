export default function attachCamera(attachedObj, offsetX, fixedY) {
  // onUpdate provided by Kaboom & runs on every frame
  onUpdate(() => {
    // Camera position provided by Kaboom
    camPos(attachedObj.pos.x + offsetX, fixedY);
  });
}
