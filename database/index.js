const pg = require('pg');
const dbURI = 'postgres://nicolas_cage:The Declaration of Independence@db.calsurv.org:5432/coding_challenge?ssl=true';

const db = new pg.Client(dbURI);

db.connect()
.then((data) => {
  console.log(data,'database connected!');
})
.catch((err) => {
  console.log(err,'did not connect');
})

db.getTitles = (query,res) => {
  db.query(query)
  .then((data) => {
    console.log(data,'valid search');
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log(err,'invalid search');
  });
}

module.exports = db;
