const Sequelize = require('sequelize');
const sequelize = new Sequelize('coding_challenge','nicolas_cage','The Declaration of Independence', {
  host: 'db.calsurv.org',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
.authenticate()
.then(() => {
  console.log('database connected!');
})
.catch((err) => {
  console.log(`can't connect to database`, err);
});

module.exports = sequelize;