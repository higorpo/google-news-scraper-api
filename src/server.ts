import express from 'express'
import cors from 'cors'

import cacheMiddleware from './middlewares/caching'
import routes from './routes'

const app = express()

cacheMiddleware.attach(app)
app.use(cors())
app.use(routes)

app.listen(process.env.PORT || 3333, () => console.log("Server is running"))