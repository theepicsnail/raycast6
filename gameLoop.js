import { Player } from 'player.js';
import { Map } from 'map.js';
import { Controls } from 'controls.js';
import { Camera } from 'camera.js';

var display = document.getElementById('display');
var player = new Player(15.3, -1.2, 1);
var map = new Map(32);
var controls = new Controls();
var camera = new Camera(display, 320, 0.8);

class GameLoop {
  constructor() {
    this.lastTime = 0;
    this.renderLoop = this.renderLoop.bind(this)
  }
  start() {
    requestAnimationFrame(this.renderLoop);
  }
  renderLoop(time) {

    requestAnimationFrame(this.renderLoop);
    var seconds = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (seconds < .2) this.onFrame(seconds)
  }
  onFrame(dt) {
    map.update(dt);
    player.update(controls.states, map, dt);
    camera.render(player, map);
  }
}

export function run() {
  var loop = new GameLoop();
  loop.start();
}
