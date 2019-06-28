class Player {
  constructor(id) {
    this.id = id;
    this.position = [6, 4];
    this.equipment = ["clothes"];
    this.actions = [];
    this.scares = [];
    this.sanity = 90;
    this.hasKey = false;
    this.LABYRINTH = init2DArray(8, 8, function() {
      return {lookaround: false, events: false};
    });

    this.addeq.bind(this);
    this.lookedaround.bind(this);
    this.alreadylookedaround.bind(this);
    this.move.bind(this);
    this.hasAction.bind(this);
    this.addAction.bind(this);
    this.removeAction.bind(this);
    console.log("New player added: #"+id);
  }
  addeq(eq) { //eq[] - array!
    eq.forEach(e => {
      if (this.equipment.indexOf(e) < 0)
        this.equipment.push(e);
    });
  }
  lookedaround() {
    this.LABYRINTH[this.position[0]][this.position[1]].lookaround = true;
  }
  alreadylookedaround() {
    return this.LABYRINTH[this.position[0]][this.position[1]].lookaround;
  }
  move(to) {
    if(to === "south") this.position[0] += 1;
    if(to === "north") this.position[0] -= 1;
    if(to === "west") this.position[1] -= 1;
    if(to === "east") this.position[1] += 1;
    console.log("player#"+this.id+" location is: ["+this.position[0]+","+this.position[1]+"]");
  }
  hasAction(act) {
    let i = this.actions.indexOf(act) > -1;
    if (i > -1)
      return i;
    return false;
  }
  addAction(act) {
    if (Array.isArray(act)) {
      act.forEach(a => {
        //if exists remove action
        if (this.hasAction(a))
          this.removeAction(a);
        //if does not exist add action
        else 
          this.actions.push(a);
      });
    } else {
      //if exists remove action
      if (this.hasAction(act))
        this.removeAction(act);
      //if does not exist add action
      else 
        this.actions.push(act);
    }
  }
  removeAction(act) {
    if (Array.isArray(act)) {
      act.forEach(a => {
        let index = this.hasAction(a);
        if (index > -1)
          this.actions.splice(index, 1);
      });
    } else {
      let index = this.hasAction(act);
      if (index > -1)
        this.actions.splice(index, 1);
    }
  }
  scared(name) {
    this.scares.push(name);
  }
}

function init2DArray(xlen, ylen, data) {
  var ret = [];
  for (var x = 0; x < xlen; x++) {
    ret[x] = [];
    for (var y = 0; y < ylen; y++) {
      ret[x][y] = data();
    }
  }
  return ret;
}

module.exports = Player;