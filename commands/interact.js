const LABYRINTH = require("../app/modules/LABYRINTH.js");

module.exports = {
	name: "interact",
	description: "This command allows you to use your equipment in order to progress with the game.",
	cooldown: 1,
	execute(msg, args, players) {
		let item = args[0].toLowerCase();
		let player = players.get(msg.author.id);
		let pos = player.position;
		let location = LABYRINTH[pos[0]][pos[1]];

		let status = [];
		//eslint-disable-next-line no-prototype-builtins
		if (location.hasOwnProperty("interactions")) {
			location.interactions.forEach((int) => {
				if (int.item.toLowerCase() === item) {

					if (int.repeat !== true) {
						//if repeat is false remember first interaction and lock it after
						if (player.hasAction(int.reward)) {
							//player already received reward for this, stop script
							status.push({
								"name": "🔨 Interact with " + item,
								"value": `You try to interact with the ${item} again, but it's only left in your memories. You cannot interact with what doesn't exist anymore.`
							});
						}
					}

					//otherwise just execute the action
					if (status.length === 0) {
						status.push({
							"name": "🔨 Interact with " + item,
							"value": int.result
						});
						//eslint-disable-next-line no-prototype-builtins
						if (int.hasOwnProperty("reward")) {
							if (int.rewardType === "action") {
								player.addAction(int.reward);
							}
							if (int.rewardType === "equipment") {
								player.addeq(int.reward);
							}
						}
					}

				}
			});
		} else {
			//player does not have that item
			status.push({
				"name": "🔨 Interact with " + item,
				"value": `Interesting. You're already trying to use imaginary items? That was fast. In case you're still confused: There is no ${item} in here.`
			});
		}

		if (status.length === 0) {
			//This action does not exist
			status.push({
				"name": "🔨 Interact with " + item,
				"value": `You have some thoughts on how you would design this place differently with ${item}, though these thoughts distract you from your main objective.`
			});

		}

		return status;
	}
};
