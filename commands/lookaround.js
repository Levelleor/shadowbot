const LABYRINTH = require("../app/modules/LABYRINTH.js");

module.exports = {
	name: "lookaround",
	description: "Use this to check if there is anything around you.",
	cooldown: 1,
	execute(msg, args, players) {
		let player = players.get(msg.author.id);
		let pos = player.position;
		let location = LABYRINTH[pos[0]][pos[1]];

		if (typeof location.lookaround !== "undefined")
			if (player.alreadylookedaround()) {
				return [{
					"name": "👀 You look around...",
					"value": "You look around again. Then again. And one more time... Then you **suddenly realize**! There is clearly nothing left to look at!"
				}];
			} else {
				if (typeof location.lookaround.action === "function") {
					location.lookaround.action(player);
				}
				player.lookedaround();

				return [{
					"name": "👀 You look around...",
					"value": location.lookaround.result
				}];
			}
	}
};
