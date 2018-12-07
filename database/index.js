// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('coding_challenge','nicolas_cage','The Declaration of Independence', {
//   host: 'db.calsurv.org',
//   port: 5432,
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: true
//   },
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// sequelize
// .authenticate()
// .then(() => {
//   console.log('database connected!');
// })
// .catch((err) => {
//   console.log(`can't connect to database`, err);
// });

// module.exports = sequelize;


const pg = require('pg');
const dbURI = 'postgres://nicolas_cage:The Declaration of Independence@db.calsurv.org:5432/coding_challenge?ssl=true';

const db = new pg.Client(dbURI);

db.connect()
.then((data) => {
  console.log(data,'database connected!');
})
.catch((err) => {
  console.log(err,'bad stuff');
})

var query = {
  text:'SELECT originaltitle FROM titles WHERE tconst=$1',
  values:['tt0000001']
}

db.getTitles = () => {
  db.query(query)
  .then((data) => {
    console.log(data,'good data');
  })
  .catch((err) => {
    console.log(err,'bad data');
  })
}

module.exports = db;
