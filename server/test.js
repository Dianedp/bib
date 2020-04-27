const axios = require('axios');
const cheerio = require('cheerio');
var fileSystem = require( "fs" );
var JSONStream = require( "JSONStream" );

function ParseToJson(tab)
{ 
  var transformStream = JSONStream.stringify();
    var outputStream = fileSystem.createWriteStream( __dirname + "/hpdata.json" );

transformStream.pipe( outputStream );

tab.forEach( transformStream.write );
  transformStream.end();

}

const parse = data => {
  const $ = cheerio.load(data);
  var tab = [];
  var c = 1;
  var length = $("body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child("+c+") > div > div.card__menu-content.js-match-height-content > h5 > a").text();
  while(length)
  {
    c++;
    length = $("body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child("+c+") > div > div.card__menu-content.js-match-height-content > h5 > a").text();
  }
  c = 550
  for(var i = 1;i<c+1;i++)
  {
  var name = $("body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child("+i+") > div > div.card__menu-content.js-match-height-content > h5 > a").text();
  var city = $("body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child("+i+") > div > div.card__menu-footer.d-flex.js-match-height-footer > div.card__menu-footer--location.flex-fill").text();
  name = name.replace(/\n/g,'').trim().toLowerCase();
  city = city.replace(/\n/g,'').trim().toLowerCase();
  if(name != '')
  {
  tab.push({name,city});
  }
  }
  return tab
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

var base_url = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/";

async function start(b_url)
{
var tabf = [];
var tmp = [];
var remaining = 13;
for(var j = 1; j < 14; j++)
{
    tmp = await init(base_url+j+"/");
    tmp.forEach(element => tabf.push(element));
    remaining--;
    console.log("successfully added 40 row : remaining " + remaining);
}
ParseToJson(tabf)
console.log("JSON completed !")
for(var j = 1; j < tabf.length; j++)
{
   console.log(tabf[j])
}
}

start(base_url)