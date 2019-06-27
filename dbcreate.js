const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/main";
var dat = require('./testdata.js');

mongoose.connect(url, { useNewUrlParser: true }).catch(console.error);

var dataschema = mongoose.Schema({
  details: {
    refid: String,
    content: String
  }
});

var Delta = mongoose.model("Delta", dataschema);

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
  let result = await Delta.find({"details.refid": "5b63143dbed8c13284e94e83"}).explain("executionStats");
  console.log(result);
})().catch(console.error);
