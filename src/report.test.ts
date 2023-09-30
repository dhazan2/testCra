import 'jest';
import { sortPages } from './report';
import { objectPagesType, arrayPagesType } from './crawl.type';

describe('sortPages', () => {
    it('sort two pages', () => {
        const input: objectPagesType = {
            'https://blog.boot.dev/path': 1,
            'https://blog.boot.dev': 3
        };
        const actual: arrayPagesType = sortPages(input);
        const expected: arrayPagesType = [
            ['https://blog.boot.dev', 3],
            ['https://blog.boot.dev/path', 1]
        ];
        expect(actual).toEqual(expected);
    });
});
