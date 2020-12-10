import puppeteer from 'puppeteer'

interface Element extends globalThis.Element {
    innerText: string
    href: string
}

interface News {
    news_title: string
    news_url: string
    newspaper_name: string
    datetime: string | null
}

class ScraperNews {
    private langCode: string
    private puppeteerBrowser: puppeteer.Browser | undefined
    private puppeteerPage: puppeteer.Page | undefined

    constructor(langCode: string) {
        this.langCode = langCode
    }

    private async initializePuppeteer(urlPage: string): Promise<void> {
        this.puppeteerBrowser = await puppeteer.launch({ headless: true })
        this.puppeteerPage = await this.puppeteerBrowser.newPage()
        await this.puppeteerPage.goto(urlPage, { waitUntil: 'networkidle2' })
    }

    public async getAllRecentNews(): Promise<News[]> {
        await this.initializePuppeteer(`https://news.google.com/u/1/topstories?hl=${this.langCode}`)

        await this.puppeteerPage?.waitForSelector('[jscontroller=mhFxVb]')

        const news: News[] | undefined = await this.puppeteerPage?.$$eval('[jscontroller=mhFxVb]', (elements) => {
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

        await this.puppeteerBrowser?.close()

        if (!news) {
            return []
        }

        return news
    }
}

export default ScraperNews