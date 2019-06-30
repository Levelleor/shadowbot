const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/main";

mongoose.connect(url, { useNewUrlParser: true }).catch(console.error);

const dataschema = mongoose.Schema({
	details: {
		refid: String,
		content: String
	}
});

const Delta = mongoose.model("Delta", dataschema);

(async function() {
	/*dat = JSON.parse(dat);
	dat.forEach(async (thing) => {
		let temp = new Delta({
			"details.refid": '5b63143dbed8c13284e94e83',
			"details.content": thing.content
		});
		await temp.save().then(() => {
			console.log('Success!');
		}).catch(console.error);
	});*/
	let result = await Delta.find({ "details.refid": "5b63143dbed8c13284e94e83" }).explain("executionStats");
	console.log(result);
})().catch(console.error);
