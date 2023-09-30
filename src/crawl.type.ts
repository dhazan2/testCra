type objectPagesType = { [x: string]: number };
type arrayPagesType = [string, number][];
type crawlPageResponseType = Promise<objectPagesType>;

export { objectPagesType, arrayPagesType, crawlPageResponseType };
