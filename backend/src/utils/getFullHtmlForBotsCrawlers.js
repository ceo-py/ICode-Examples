function isBot(url) {
    const botRegex = /bot|crawl|spider|googlebot|bingbot|yandexbot/i;
    return botRegex.test(url)
}

