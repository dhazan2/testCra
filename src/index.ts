import { crawlPage } from './crawl';
import { objectPagesType } from './crawl.type';
import { printReport } from './report';

const main = async (baseURL?: string) => {
    if (!baseURL || baseURL.length < 0) {
        console.error('no website provide');
        process.exit(1);
    }

    console.log(`strating crawl of ${baseURL}`);

    const pages: objectPagesType = await crawlPage(baseURL, baseURL, {
        inner: {},
        outer: {}
    });
    printReport(pages);
};

main('https://wagslane.dev');
