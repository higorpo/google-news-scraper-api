import { Request, Response } from "express";
import ScraperNews from "../scraper/ScraperNews";

class NewsController {
    async index(request: Request, response: Response) {
        let { lang } = request.query

        if (!lang) lang = 'en-US'

        const scraper = new ScraperNews(lang as string)

        const news = await scraper.getAllRecentNews()

        response.json(news)
    }

    async show(request: Request, response: Response) {
        response.json({ hello: 'world' })
    }
}

export default new NewsController()