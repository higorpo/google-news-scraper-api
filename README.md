# Google News Scraper API

This repository contains the source code of an API that scraps the [Google News](https://news.google.com/) page.
It was created in Typescript (Node.js) using the Puppeteer library together with Express.

You can use the API endpoint using:

```ssh
curl -X GET https://google-news-scraper-api.herokuapp.com/news?lang=<lang-code>
```

Like

```ssh
curl -X GET https://google-news-scraper-api.herokuapp.com/news?lang=en-US
```

You can also include the parameter **q** to search for certain news items, for example:

```ssh
curl -X GET https://google-news-scraper-api.herokuapp.com/news?lang=en-US&q=covid19
```

The API will return a JSON with an array of objects containing the following structure:

```JS
{
    "news_title": string,
    "news_url": string,
    "newspaper_name": string,
    "datetime": string | null,
}
```

**Important:** The API caches the information and keeps it for 20 minutes until the next refresh of the data.

--

Created for study purposes.
