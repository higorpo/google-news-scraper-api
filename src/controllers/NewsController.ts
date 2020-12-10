import { Request, Response } from "express";

class NewsController {
    async index(request: Request, response: Response) {
        response.json({ hello: 'world' })
    }

    async show(request: Request, response: Response) {
        response.json({ hello: 'world' })
    }
}

export default new NewsController()