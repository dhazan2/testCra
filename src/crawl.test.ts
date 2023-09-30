import 'jest';
import { normalizeURL } from './crawl';

describe('normalizeURL', () => {
    beforeEach(() => {});

    it('normalizeURL strip https protocl', () => {
        const input: string = 'https://blog.boot.dev/path';
        const actual: string = normalizeURL(input);
        const expected: string = 'blog.boot.dev/path';
        expect(actual).toEqual(expected);
    });

    it('normalizeURL strip http protocl', () => {
        const input: string = 'http://blog.boot.dev/path';
        const actual: string = normalizeURL(input);
        const expected: string = 'blog.boot.dev/path';
        expect(actual).toEqual(expected);
    });

    it('normalizeURL strip trailing slash', () => {
        const input: string = 'https://blog.boot.dev/path/';
        const actual: string = normalizeURL(input);
        const expected: string = 'blog.boot.dev/path';
        expect(actual).toEqual(expected);
    });

    it('normalizeURL capitals', () => {
        const input: string = 'https://BLOG.boot.dev/path/';
        const actual: string = normalizeURL(input);
        const expected: string = 'blog.boot.dev/path';
        expect(actual).toEqual(expected);
    });
});
