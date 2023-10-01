import 'jest';
import { sortPages } from './report';
import { objectPagesType, arrayPagesType } from './crawl.type';

describe('sortPages', () => {
    it('sort two pages', () => {
        const input: objectPagesType = {
            inner: {
                'https://blog.boot.dev/path': 1,
                'https://blog.boot.dev': 3
            },
            outer: {
                'https://www.outerwebsite.com/': 1,
                'https://www.outerwebsitetwo.com/': 3
            }
        };
        const actual: arrayPagesType = sortPages(input);
        const expected: arrayPagesType = {
            inner: [
                ['https://blog.boot.dev', 3],
                ['https://blog.boot.dev/path', 1]
            ],
            outer: [
                ['https://www.outerwebsitetwo.com/', 3],
                ['https://www.outerwebsite.com/', 1]
            ]
        };
        expect(actual).toEqual(expected);
    });
});
