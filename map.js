import { Bitmap } from 'bitmap.js';
import { Ray } from 'ray.js';

export class Map {
  constructor(size) {
    this.size = size;
    this.wallGrid = new Uint8Array(size * size);
    this.skybox = new Bitmap('assets/deathvalley_panorama.jpg', 2000, 750);
    this.wallTexture = new Bitmap('assets/wall_texture.jpg', 1024, 1024);
    this.light = 0;
    this.randomize();
  }

  get(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
    return this.wallGrid[y * this.size + x];
  };

  randomize() {
    for (var i = 0; i < this.size * this.size; i++) {
      this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
    }
  };

  cast(point, angle, range) {
    var r = new Ray(point.x, point.y, angle, range);
    var out = []
    var pos;
    while(true) {
      pos = r.next();
      if (pos.done)
        break;
      pos = pos.value;

      var height = this.get(
          pos.x + ((!pos.hitHorizontal && !pos.rightwards)?-1:0),
          pos.y + ((pos.hitHorizontal && !pos.upwards)?-1:0)
      );
      var offset = pos.hitHorizontal ?
        pos.x - Math.floor(pos.x) :
        pos.y - Math.floor(pos.y) ;
      out.push({
        offset: offset,
        height: height,
        distance: pos.distance,
        shading: 1,
      });
    }
    return out;
  };

  update(seconds) {
    if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);
    else if (Math.random() * 5 < seconds) this.light = 2;
  };
}
