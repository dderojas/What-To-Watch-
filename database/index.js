const pg = require('pg');
const dbURI = process.env.dbURI;
const db = new pg.Client(dbURI);

db.connect()
.then((data) => {
  console.log('database connected!');
})
.catch((err) => {
  console.log(err,'did not connect');
});

db.getTitles = (query,res) => {
  db.query(query)
  .then((data) => {
    console.log(data,'valid title search');
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log(err,'invalid title search');
  });
}

function sortByRatings(item1, item2) {
  var query = {
    text:'SELECT averagerating FROM ratings WHERE tconst=$1 OR tconst=$2',
    values:[item1.tconst,item2.tconst]
  };
  db.query(query)
  .then((data) => {
    console.log(data.rows,'valid ratings request');
    if(data.rows.length > 1) {
      return data.rows[1].averagerating - data.rows[0].averagerating;
    } else {
      return 0 - data.rows[0].averagerating;
    }
  })
  .catch((err) => {
    console.log(err, 'invalid ratings request');
  })
}

db.getSortedTitles = (query,res) => {
  db.query(query)
  .then((data) => {
    var results = data.rows.sort(sortByRatings);
    res.status(200).json(results);
  })
  .catch((err) => {
    console.log(err,'sorting error');
  })
}

module.exports = db;
