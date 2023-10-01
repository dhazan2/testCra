type objectPagesType = {
    inner: {
        [x: string]: number;
    };
    outer: {
        [x: string]: number;
    };
};
type arrayPagesType = {
    inner: [string, number][];
    outer: [string, number][];
};
type crawlPageResponseType = Promise<objectPagesType>;

export { objectPagesType, arrayPagesType, crawlPageResponseType };
