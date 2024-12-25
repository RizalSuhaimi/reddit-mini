const ROUTES = {
    subredditRoute: (subreddit) => `/r/${subreddit}`,
    fullPostRoute: (permalink) => `${permalink}`,
    searchRoute: () => `/search`,
    subredditRoute: (subreddit) => `/r/${subreddit}`
};

export default ROUTES;