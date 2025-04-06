// import { Sequelize } from "sequelize-typescript";
// import config from 'config'
// import Vacation from "../models/vacation";
// import Follow from "../models/follow";
// import User from "../models/user";

// const logging = config.get<boolean>('sequelize.logging') ? console.log : false

// const sequelize = new Sequelize({
//     // [ add ALL model classes you created to the array ]:
//     models: [ User, Vacation, Follow ],
//     dialect: 'mysql',
//     ...config.get('db'),
//     logging: console.log,
// })

// export default sequelize

import { Sequelize } from "sequelize-typescript";
import config from "config";
import Vacation from "../models/vacation";
import Follow from "../models/follow";
import User from "../models/user";

// הגדרת פונקציה עבור חיבור ל-MySQL עם config
const logging = config.get<boolean>('sequelize.logging') ? console.log : false;

const sequelize = new Sequelize({
    dialect: "mysql",
    host: config.get("db.host"),
    port: config.get("db.port"),
    username: config.get("db.username"),
    password: config.get("db.password"),
    database: config.get("db.database"),
    models: [User, Vacation, Follow],  // טוען את כל המודלים הדרושים
    logging,  // רק אם אקטיב יש Log בקונסול
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection to the database has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

// אם צריך לסנכרן את המודלים על מנת ליצור את הטבלאות במסד נתונים
sequelize.sync({ force: false }) // true יגרום למחוק את הטבלאות כל פעם
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

export default sequelize;