 var json = require('./hpdata.json');

 <div>
  {json.filter(json => json.name.includes('J')).map(filteredName => (
    <li>
      {filteredName}
    </li> ))
}
</div>