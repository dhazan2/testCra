import 'jest';
import { normalizeURL, getURLsFromHTML } from './crawl';

describe('normalizeURL', () => {
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

describe('getURLsFromHTML', () => {
    it('absolute inner URL', () => {
        const inputHTMLBody: string = `
            <html>
                <body>
                    <a href="https://blog.boot.dev/path/">
                        Boot.deb Blog
                    <a/>
                </body>
            </html>
        `;
        const inputBaseURL = 'https://blog.boot.dev/path/';
        const actual: string[] = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        const expected: string[] = ['https://blog.boot.dev/path/'];
        expect(actual).toEqual(expected);
    });

    it('relative inner URL', () => {
        const inputHTMLBody: string = `
            <html>
                <body>
                    <a href="/path/">
                        Boot.deb Blog
                    <a/>
                </body>
            </html>
        `;
        const inputBaseURL = 'https://blog.boot.dev';
        const actual: string[] = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        const expected: string[] = ['https://blog.boot.dev/path/'];
        expect(actual).toEqual(expected);
    });

    it('outer URL', () => {
        const inputHTMLBody: string = `
            <html>
                <body>
                    <a href="https://www.outerwebsite.com/path/">
                        outerwebsite
                    <a/>
                </body>
            </html>
        `;
        const inputBaseURL = 'https://blog.boot.dev';
        const actual: string[] = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        const expected: string[] = ['https://www.outerwebsite.com/path/'];
        expect(actual).toEqual(expected);
    });

    it('both inner absolute and relative URL', () => {
        const inputHTMLBody: string = `
            <html>
                <body>
                    <a href="https://blog.boot.dev/path1/">
                        Boot.deb Blog Path One
                    <a/>
                    <a href="/path2/">
                        Boot.deb Blog Path Two
                    <a/>
                </body>
            </html>
        `;
        const inputBaseURL = 'https://blog.boot.dev';
        const actual: string[] = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        const expected: string[] = [
            'https://blog.boot.dev/path1/',
            'https://blog.boot.dev/path2/'
        ];
        expect(actual).toEqual(expected);
    });

    it('both inner and outer URL', () => {
        const inputHTMLBody: string = `
            <html>
                <body>
                    <a href="https://blog.boot.dev/path1/">
                        Boot.deb Blog Path One
                    <a/>
                    <a href="/path2/">
                        Boot.deb Blog Path Two
                    <a/>
                    <a href="https://www.outerwebsite.com/path/">
                        outerwebsite
                    <a/>
                </body>
            </html>
        `;
        const inputBaseURL = 'https://blog.boot.dev';
        const actual: string[] = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        const expected: string[] = [
            'https://blog.boot.dev/path1/',
            'https://blog.boot.dev/path2/',
            'https://www.outerwebsite.com/path/'
        ];
        expect(actual).toEqual(expected);
    });

    it('invalid URL', () => {
        const inputHTMLBody: string = `
            <html>
                <body>
                    <a href="invalid">
                        Boot.deb Blog Path One
                    <a/>
                </body>
            </html>
        `;
        const inputBaseURL = 'https://blog.boot.dev';
        const actual: string[] = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        const expected: string[] = [];
        expect(actual).toEqual(expected);
    });
});
