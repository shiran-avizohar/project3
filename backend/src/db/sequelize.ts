
import { Sequelize } from "sequelize-typescript";
import config from "config";
import Vacation from "../models/vacation";
import Follow from "../models/follow";
import User from "../models/user";


const logging = config.get<boolean>('sequelize.logging') ? console.log : false;

const sequelize = new Sequelize({
    dialect: "mysql",
    host: config.get("db.host"),
    port: config.get("db.port"),
    username: config.get("db.username"),
    password: config.get("db.password"),
    database: config.get("db.database"),
    models: [User, Vacation, Follow],
    logging, 
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection to the database has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

sequelize.sync({ force: false, alter: false })
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

export default sequelize;