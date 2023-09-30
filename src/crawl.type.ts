type pagesType = { [x: string]: number };
type crawlPageResponseType = Promise<pagesType>;

export { pagesType, crawlPageResponseType };
