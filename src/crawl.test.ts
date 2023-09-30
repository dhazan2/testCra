import 'jest';
import { normalizeURL } from './crawl';

describe('normalizeURL', () => {
    beforeEach(() => {});

    it('should get the current environment', () => {
        const input: string = '';
        const actual: string = normalizeURL(input);
        const expected: string = '';
        expect(actual).toEqual(expected);
    });
});
