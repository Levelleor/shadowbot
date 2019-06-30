module.exports = {
	name: "status",
	description: "Use this to check your status and equipment.",
	cooldown: 1,
	execute(msg, args, players) {

		let player = players.get(msg.author.id);

		let status = [];
		let eq = "";
		player.equipment.forEach(e => {
			eq += `- ${e}\n`;
		});
		status.push({
			"name": "🎒 " + msg.author.username + "'s equipment",
			"value": eq,
			"inline": true
		}
		);

		status.push({
			"name": "🙍 " + msg.author.username + "'s status",
			"value": "Sanity: " + player.sanity,
			"inline": true
		}
		);

		return status;
	}
};
