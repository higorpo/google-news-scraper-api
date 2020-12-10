import puppeteer from 'puppeteer'

class Puppeteer {
    private urlPage: string
    private puppeteerBrowser: puppeteer.Browser | undefined
    private puppeteerPage: puppeteer.Page | undefined

    constructor(urlPage: string) {
        this.urlPage = urlPage
    }

    public async initializePuppeteer(): Promise<void> {
        this.puppeteerBrowser = await puppeteer.launch({
            headless: true, args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        })
        this.puppeteerPage = await this.puppeteerBrowser.newPage()
        await this.puppeteerPage.goto(this.urlPage, { waitUntil: 'networkidle2' })
    }

    public getPageRef(): puppeteer.Page | undefined {
        return this.puppeteerPage
    }

    public async closeBrowser(): Promise<void> {
        await this.puppeteerBrowser?.close()
    }
}

export default Puppeteer