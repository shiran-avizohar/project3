import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Vacation from "../models/vacation";
import Follow from "../models/follow";
import User from "../models/user";

const logging = config.get<boolean>('sequelize.logging') ? console.log : false

const sequelize = new Sequelize({
    // [ add ALL model classes you created to the array ]:
    models: [ User, Vacation, Follow ],
    dialect: 'mysql',
    ...config.get('db'),
    logging: console.log,
})

export default sequelize