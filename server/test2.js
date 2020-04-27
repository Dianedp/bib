const axios = require('axios');
const cheerio = require('cheerio');
var fileSystem = require( "fs" );
var JSONStream = require( "JSONStream" );

function ParseToJson(tab)
{ 
  var transformStream = JSONStream.stringify();
    var outputStream = fileSystem.createWriteStream( __dirname + "/hpdata2.json" );

transformStream.pipe( outputStream );

tab.forEach( transformStream.write );
  transformStream.end();

}

const parse = data => {
	//const addressPoints = cheerio.load(data);
  var tab = []
  eval(data)
  addressPoints.forEach(element =>{
  var name = element[3].entreprise.toLowerCase();
  var latitude = element[1];
  var longitude= element[0];
   tab.push({name,latitude, longitude})});
  //console.log(tab.length)
  //ParseToJson(tab);
  //console.log("Just finished your JSON file");
  return tab;
};
async function init(url)
{
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }
  console.error(status);

  return null;
}

var base_url = "https://www.maitresrestaurateurs.fr/module/annuaire/ajax/load-maps-data";

async function start(b_url)
{
var tabf = [];
var tmp = [];
tmp = await init(b_url);
tmp.forEach(element => tabf.push(element));
ParseToJson(tabf)
console.log("JSON completed !")
/*for(var j = 1; j < tabf.length; j++)
{
   console.log(tabf[j])
}*/
}

start(base_url)