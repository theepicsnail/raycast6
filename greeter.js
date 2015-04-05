export class Greeter {
  constructor(message) {
    this.message = message;
  }

  greet() {
    var element = document.querySelector('#message');
    element.innerHTML = this.message;
  }
};
