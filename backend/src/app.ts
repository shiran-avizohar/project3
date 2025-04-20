import express, { json } from "express"
import config from 'config'
import sequelize from "./db/sequelize"
import usersRouter from './routers/users'
import adminsRouter from './routers/admins'
import authRouter from './routers/auth'
import errorLogger from "./middlewares/error/error-logger"
import errorResponder from "./middlewares/error/error-responder"
import notFound from "./middlewares/not-found"
import cors from 'cors'

const port = config.get<string>('app.port')
const name = config.get<string>('app.name')
const force = config.get<boolean>('sequelize.sync.force')

const app = express();

(async () => {
    try {
        await sequelize.sync({ force }) // ensure sequelize syncs first

        // middlewares
        app.use(cors()) // allow any client to use this server
        app.use(json()) // middleware to handle JSON payloads

        app.use('/uploads', express.static('uploads'));

        app.use('/api/users', usersRouter)
        app.use('/api/admins', adminsRouter)
        app.use('/', authRouter)

        // 404 not found middleware
        app.use(notFound)

        // error middleware (error logging and response)
        app.use(errorLogger)
        app.use(errorResponder)

        app.listen(port, () => console.log(`${name} started on port ${port}...`))
    } catch (error) {
        console.error('Server failed to start due to:', error);
        process.exit(1); // terminate if server initialization fails
    }
})()
