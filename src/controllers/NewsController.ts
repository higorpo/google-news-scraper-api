import { Request, Response } from "express";
import ScraperNews from "../scraper/ScraperNews";
class NewsController {
    async index(request: Request, response: Response) {
        let { lang, q: searchQuery } = request.query

        if (!lang) lang = 'en-US'

        const scraper = new ScraperNews(lang as string)

        const news = searchQuery ? await scraper.getNewsBySearchTerm(searchQuery as string) : await scraper.getAllRecentNews()

        response.json(news)
    }
}

export default new NewsController()