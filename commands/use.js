const LABYRINTH = require("../app/modules/LABYRINTH.js");

module.exports = {
	name: "use",
	description: "This command allows you to use your equipment in order to progress with the game.",
	cooldown: 1,
	execute(msg, args, players) {
		let item = args[0].toLowerCase();
		let player = players.get(msg.author.id);
		let pos = player.position;
		let location = LABYRINTH[pos[0]][pos[1]];

		let status = [];
		if (player.equipment.indexOf(item) > -1) {
			//eslint-disable-next-line no-prototype-builtins
			if (location.hasOwnProperty("uses")) {
				location.uses.forEach((u) => {
					if (u.item.toLowerCase() === item) {

						//check if using item is locked
						if (typeof u.locked !== "undefined") {
							if (u.locked === "equipment") {
								if (u.requires.every(elem => player.equipment.indexOf(elem) > -1)) {
									//all items aquired, player allowed to use the item
									return;
								} //otherwise player does not have all nesessary items
							}
							if (u.locked === "action") {
								if (u.requires.every(elem => player.actions.indexOf(elem) > -1)) {
									//all actions done, player allowed to proceed
									return;
								} //otherwise player did not go through all nesessary actions
							}
						}

						status.push({
							"name": "🔨 Use " + item,
							"value": u.result
						});

						//eslint-disable-next-line no-prototype-builtins
						if (u.hasOwnProperty("reward")) {
							if (u.rewardType === "action") {
								player.addAction(u.reward);
							}
							if (u.rewardType === "equipment") {
								player.addeq(u.reward);
							}
						}
					}
				});
			}
		} else {
			//player does not have that item
			status.push({
				"name": "🔨 Use " + item,
				"value": `Interesting. You're already trying to use imaginary items? That was fast. In case you're still flying somewhere: you do not have ${item} in your inventory.`
			});
		}

		if (status.length === 0) {
			//This action does not exist
			status.push({
				"name": "🔨 Use " + item,
				"value": `You have some thought on how you could use ${item}, though they definitely won't place you closer to the exit of this dungeon.`
			});

		}

		return status;
	}
};
