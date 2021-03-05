 
const Sequelize= require("sequelize");

const sequelize= new Sequelize('postgres://localhost:5432/omdb', {
    logging: false,
    dialect: "postgres"
});

module.exports = sequelize;