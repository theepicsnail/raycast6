const controlMap = {
  37: 'turnleft',   // LEFT
  38: 'forward',    // UP
  39: 'turnright',  // RIGHT
  40: 'backward',   // DOWN
  65: 'stepleft',   // A
  68: 'stepright',  // D
  83: 'backward',   // S
  87: 'forward',    // W
}

export class Controls {
  constructor() {
    this.states = {} // everythnig defaults to undefined (falsey)
    document.addEventListener('keydown', this.onKey.bind(this, true), false);
    document.addEventListener('keyup', this.onKey.bind(this, false), false);
    document.addEventListener('touchstart', this.onTouch.bind(this), false);
    document.addEventListener('touchmove', this.onTouch.bind(this), false);
    document.addEventListener('touchend', this.onTouchEnd.bind(this), false);
  }

  onTouch(e) {
    var t = e.touches[0];
    this.onTouchEnd(e);
    if (t.pageY < window.innerHeight * 0.5) this.onKey(true, { keyCode: 38 });
    else if (t.pageX < window.innerWidth * 0.5) this.onKey(true, { keyCode: 37 });
    else if (t.pageY > window.innerWidth * 0.5) this.onKey(true, { keyCode: 39 });
  };

  onTouchEnd(e) {
    this.states.left = false;
    this.states.right = false;
    this.states.up = false;
    this.states.down = false;
    e.preventDefault();
    e.stopPropagation();
  };

  onKey(val, e) {

    var control = controlMap[e.keyCode];
    if(control === undefined)
      return

    this.states[control] = val;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
  };
}
