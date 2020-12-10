export interface Element extends globalThis.Element {
    innerText: string
    href: string
}

export interface News {
    news_title: string
    news_url: string
    newspaper_name: string
    datetime: string | null
}
