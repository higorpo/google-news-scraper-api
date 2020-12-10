import { Router } from 'express'
import NewsController from './controllers/NewsController'

const routes = Router()

routes.get('/news', NewsController.index)
routes.get('/news/:url', NewsController.show)

export default routes