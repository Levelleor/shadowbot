const Player = require('./player.js');

class Players {
  constructor() {
    this.localid = 0;
    this.list = [];

    this.add.bind(this);
  }
  get(id) {
    var found = this.list.find(function(element) {
      return element.id === id.toString();
    });

    if (found !== undefined)
      return found.obj;
    else 
      return undefined;
  }
  add(id) {
    this.list.push({
      lid: this.localid, 
      id: id.toString(), 
      obj: new Player(this.localid)
    });
    this.localid++;
    return this.list[this.list.length-1].obj;
  }
}

module.exports = Players;