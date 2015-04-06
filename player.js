import { Bitmap } from 'bitmap.js';
var CIRCLE = Math.PI*2;

export class Player {
  constructor(x, y, direction) {
    this.speed = 2
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.weapon = new Bitmap('assets/knife_hand.png', 319, 320);
    this.paces = 0;
  }

  rotate(angle) {
    this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
  };

  walk(distance, map, sidestep) {
    var dir = this.direction + Math.PI * sidestep / 2;
    var dx = Math.cos(dir) * distance;
    var dy = Math.sin(dir) * distance;
    if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
    if (map.get(this.x, this.y + dy) <= 0) this.y += dy;
    this.paces += distance;
  };

  update(controls, map, seconds) {
    if (controls.turnleft) this.rotate(-Math.PI * seconds);
    if (controls.turnright) this.rotate(Math.PI * seconds);
    if (controls.forward) this.walk(this.speed * seconds, map, 0);
    if (controls.backward) this.walk(this.speed * seconds, map, 2);
    if (controls.stepleft) this.walk(this.speed * seconds, map, -1);
    if (controls.stepright) this.walk(this.speed * seconds, map, 1);
  };
}
