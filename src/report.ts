import { objectPagesType, arrayPagesType } from './crawl.type';

const sortPages = (pages: objectPagesType): arrayPagesType => {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((pageA, pageB) => pageB[1] - pageA[1]);
    return pagesArr;
};

const printReport = (pages: objectPagesType) => {
    console.log('=============');
    console.log('REPORT');
    console.log('=============');
    const sortedPages: arrayPagesType = sortPages(pages);
    for (const page of sortedPages) {
        const url: string = page[0];
        const hits: number = page[1];
        console.log(`Found ${hits} links to page: ${url}`);
    }
    console.log('=============');
    console.log('END REPORT');
    console.log('=============');
};

export { sortPages, printReport };
