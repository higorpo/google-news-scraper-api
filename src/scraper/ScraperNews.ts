import { News, Element } from './../types';
import Puppeteer from './Puppeteer';
class ScraperNews {
    private langCode: string

    constructor(langCode: string) {
        this.langCode = langCode
    }

    private async scraperData(puppeteer: Puppeteer): Promise<News[]> {
        const page = puppeteer.getPageRef()

        await page?.waitForSelector('[jscontroller=mhFxVb]')

        const news: News[] | undefined = await page?.$$eval('[jscontroller=mhFxVb]', (elements) => {
            return elements.map((element) => {
                const anchorNode = element.querySelector('.DY5T1d.RZIKme') as Element

                const news_title = anchorNode?.innerText
                const news_url = anchorNode?.href
                const newspaper_name = (element.querySelector('.wEwyrc.AVN2gc.uQIVzc.Sksgp') as Element)?.innerText
                const datetime = element.querySelector('.WW6dff.uQIVzc.Sksgp')?.getAttribute('datetime')

                return {
                    news_title,
                    news_url,
                    newspaper_name,
                    datetime: datetime || null,
                }
            })
        })

        await puppeteer.closeBrowser()

        if (!news) {
            return []
        }

        return news
    }

    public async getAllRecentNews(): Promise<News[]> {
        const puppeteer = new Puppeteer(`https://news.google.com/u/1/topstories?hl=${this.langCode}`)
        await puppeteer.initializePuppeteer()

        return await this.scraperData(puppeteer)
    }

    public async getNewsBySearchTerm(searchTerm: string): Promise<News[]> {
        const puppeteer = new Puppeteer(`https://news.google.com/u/1/search?q=${searchTerm}&hl=${this.langCode}`)
        await puppeteer.initializePuppeteer()

        return await this.scraperData(puppeteer)
    }
}

export default ScraperNews