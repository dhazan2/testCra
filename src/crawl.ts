import { URL } from 'url';
import { JSDOM } from 'jsdom';
import { objectPagesType, crawlPageResponseType } from './crawl.type';

const normalizeURL = (url: string): string => {
    const urlObj = new URL(url);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
};

const getURLsFromHTML = (htmlBody: string, baseURL: string): string[] => {
    const urls: string[] = [];
    const dom = new JSDOM(htmlBody);
    const likeElements = dom.window.document.querySelectorAll('a');

    for (const likeElement of likeElements) {
        if (!likeElement.href) {
            continue;
        }
        let url: string = '';
        if (likeElement.href.slice(0, 1) === '/') {
            url = `${baseURL}${likeElement.href}`;
        } else {
            url = likeElement.href;
        }
        try {
            const urlObj = new URL(url);
            urls.push(urlObj.href);
        } catch (err) {
            console.error(`error with url: ${err}`);
        }
    }
    return urls;
};

const crawlPage = async (
    baseURL: string,
    currentURL: string,
    pages: objectPagesType
): crawlPageResponseType => {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        const outerNormalizeCurrentURL = normalizeURL(currentURL);
        if (pages.outer[outerNormalizeCurrentURL] > 0) {
            pages.outer[outerNormalizeCurrentURL]++;
        } else {
            pages.outer[outerNormalizeCurrentURL] = 1;
        }
        return pages;
    }

    const innerNormalizeCurrentURL = normalizeURL(currentURL);
    if (pages.inner[innerNormalizeCurrentURL] > 0) {
        pages.inner[innerNormalizeCurrentURL]++;
        return pages;
    }

    pages.inner[innerNormalizeCurrentURL] = 1;
    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399) {
            console.warn(
                `error in fetch status code: ${resp.status}, on page: ${currentURL}`
            );
            return pages;
        }
        const contentType = resp.headers.get('content-type');
        if (!contentType?.includes('text/html')) {
            console.warn(
                `non html response, content type: ${contentType}, on page: ${currentURL}`
            );
            return pages;
        }

        const htmlBody = await resp.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }
    } catch (err) {
        console.error(`error in fetch: ${err}, on page: ${currentURL}`);
    }
    return pages;
};

export { normalizeURL, getURLsFromHTML, crawlPage };
