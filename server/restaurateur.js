const axios = require('axios');
const cheerio = require('cheerio');
var JSONStream = require('JSONStream');
var fileSystem = require('fs');
function ParseToJson(tab)
{ 
  var transformStream = JSONStream.stringify();
    var outputStream = fileSystem.createWriteStream( __dirname + "/hpdata2.json" );

transformStream.pipe( outputStream );

tab.forEach( transformStream.write );
  transformStream.end();

}

module.exports.scrapeMaitre = async url => 
{
  /*const restaurant_list = data.poiList;
  const michou = []
  for(var i = 0; i<restaurant_list.length; i++)
  {
  	const address = restaurant_list[i].datasheets[0].address
  	const name = restaurant_list[i].datasheets[0].name
  	michou.push({address,name})
  }
  return michou;*/
  //var $ = cheerio.load(response.data);
  const response = await axios(url);
  eval(response.data);
  var tab = []
  addressPoints.forEach(element => tab.push(element[3].entreprise.toLowerCase()));
  //console.log(tab.length)
  ParseToJson(tab);
  console.log("Just finished your JSON file");
  return tab;
}


