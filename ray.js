
export class Ray {
  constructor(x,y, angle, range) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.distance = 0;
    this.range = range;
    this.sin = Math.sin(angle);
    this.cos = Math.cos(angle);

    this.upwards = this.sin > 0 ? 1 : 0;
    this.rightwards = this.cos > 0 ? 1 : 0;

    this.hitHorizontal = false;
  }

  //generator for walking the ray through coordinates.
  next(){
    if (this.distance > this.range)
      return {value: this, done:true}

    if(this.cos == 0) // Vertical
    {
      var o = this.y;
      this.y = Math.floor(this.y) + this.upwards // floor
      this.distance += Math.abs(this.y - o);
      this.hitHorizontal = true;
    }
    else if(this.sin == 0) // Horizontal
    {
      var o = this.x;
      this.x = Math.floor(this.x) + this.rightwards;
      this.distance += Math.abs(this.x - o);
      this.hitHorizontal = false;
    }
    else {
      /*console.log("----");
      console.log("Point:", this.x, this.y);
      console.log("Dir  :", this.cos, this.sin);*/
      var rem_x = (this.rightwards?Math.floor(this.x+1):Math.ceil(this.x-1))-this.x;
      var rem_y = (this.upwards?Math.floor(this.y+1):Math.ceil(this.y-1))-this.y;

      //console.log("Rem  :", rem_x, rem_y);

      var xsteps = rem_x / this.cos; // steps until hitting an x border
      var ysteps = rem_y / this.sin;

      //console.log("Steps", xsteps, ysteps)
      var movedX, movedY;
      if (xsteps < ysteps) {
        movedX = rem_x;
        movedY = this.sin * xsteps;
        this.hitHorizontal = false;
      } else {
        movedX = this.cos * ysteps;
        movedY = rem_y;
        this.hitHorizontal = true;
      }

      this.x += movedX;
      this.y += movedY;
      this.distance += Math.sqrt(movedX*movedX + movedY*movedY);

    }
    return {value:this, done:false}
  }
}

/*if(require.main == module) {
  var r = new Ray(0,0,Math.PI,4);
  var m = 3
  for(let pos of r) {
    console.log(pos)
    m -= 1;
    if(m <= 0) break
  }
}*/


