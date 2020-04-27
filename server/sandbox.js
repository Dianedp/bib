/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const restaurateur = require('./restaurateur');
async function sandbox (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/') {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    const restaurant = await michelin.scrapeRestaurant(searchLink);

    restaurant.forEach(restaurant => {
  console.log(restaurant.name);
})

    var maitre = await restaurateur.scrapeMaitre('https://www.maitresrestaurateurs.fr/module/annuaire/ajax/load-maps-data');
    console.log(`🕵️‍♀️  browsing https://www.maitresrestaurateurs.fr/module/annuaire/ajax/load-maps-data source`);
  // Pour afficher tous les restaurants "maitre restaurateurs"
  var result1 = [];
  console.log(maitre.length);
  //var limit = maitre.length;
  for(var i = 0;i<1438;i++)
  {
   
    result1.push(maitre[i]);

  }
  //result.push(maitre[i]);
  
  for(var i = 0;i<result1.length;i++){
     console.log(result1[i]);
  }

  // Pour afficher les restaurants qui ont les deux nominations

  console.log(maitre.length);
  var result = [];
  var count = 0;
  for(var i = 0;i<restaurant.length;i++)
  {
   n = maitre.includes(restaurant[i].name);
  if(n == true)
  {
    count++;
    result.push(restaurant[i]);

  }
  //result.push(maitre[i]);
  }
  for(var i = 0;i<result.length;i++){
     console.log(result[i]);
  }
 
  /*axios.get('')
  .then(async function (userResponse) 
  {
    var maitre = restaurateur.scrapeMaitre(userResponse);
    return maitre
  });*/
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;

sandbox(searchLink);

