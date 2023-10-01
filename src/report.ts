import { objectPagesType, arrayPagesType } from './crawl.type';

const sortPages = (pages: objectPagesType): arrayPagesType => {
    const innerPagesArr = Object.entries(pages.inner);
    const outerPagesArr = Object.entries(pages.outer);
    innerPagesArr.sort((pageA, pageB) => pageB[1] - pageA[1]);
    outerPagesArr.sort((pageA, pageB) => pageB[1] - pageA[1]);
    return {
        inner: innerPagesArr,
        outer: outerPagesArr
    };
};

const printReport = (pages: objectPagesType) => {
    console.log('=============');
    console.log('REPORT');
    console.log('=============');
    const sortedPages: arrayPagesType = sortPages(pages);
    console.log('INNER');
    console.log('=============');
    for (const page of sortedPages.inner) {
        const url: string = page[0];
        const hits: number = page[1];
        console.log(`Found ${hits} links to page: ${url}`);
    }
    console.log('OUTER');
    console.log('=============');
    for (const page of sortedPages.outer) {
        const url: string = page[0];
        const hits: number = page[1];
        console.log(`Found ${hits} links to page: ${url}`);
    }
    console.log('=============');
    console.log('END REPORT');
    console.log('=============');
};

export { sortPages, printReport };
