const LABYRINTH = require("../app/modules/LABYRINTH.js");

module.exports = {
	name: "move",
	description: "Use this to move to another tile.",
	cooldown: 1,
	execute(msg, args, players) {
		let direction = args[0].toLowerCase();
		let player = players.get(msg.author.id);
		let pos = player.position;
		let location = LABYRINTH[pos[0]][pos[1]];

		let allowedToMove = false;
		location.directions.forEach((d) => {
			if (d.name === direction) {
				if (typeof d.locked === "undefined") {
					allowedToMove = true;
				}
				//if it is locked we check if player can proceed
				else {
					if (d.locked === "equipment") {
						if (d.requires.every(elem => player.equipment.indexOf(elem) > -1)) {
							//all items aquired, player allowed to proceed
							allowedToMove = true;
						} //otherwise player does not have all nesessary items
					}
					if (d.locked === "action") {
						if (d.requires.every(elem => player.actions.indexOf(elem) > -1)) {
							//all actions done, player allowed to proceed
							allowedToMove = true;
						} //otherwise player did not go through all nesessary actions
					}
				}
			}
		});

		if (allowedToMove) {
			player.move(direction);
		}
	}
};
