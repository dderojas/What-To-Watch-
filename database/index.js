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

db.connect();

db.getTitles = () => {
  console.log('in titles');
  db.query('', (err, res) => {
    if(err) {
      console.log('bad',err);
    } else {
      console.log('hey',res);
    }
  });
}

module.exports = db;


















