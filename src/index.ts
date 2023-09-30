import { crawlPage } from './crawl';
import { pagesType } from './crawl.type';

const main = async (baseURL: string) => {
    if (baseURL.length < 0) {
        console.error('no website provide');
        process.exit(1);
    }

    console.log(`strating crawl of ${baseURL}`);
    const pages: pagesType = await crawlPage(baseURL, baseURL, {});
    for (const page of Object.entries(pages)) {
        console.log(page);
    }
};

main('https://wagslane.dev');
