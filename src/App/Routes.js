const ROUTES = {
    subredditRoute: (subreddit) => `/r/${subreddit}`,
    fullPostRoute: (permalink) => `${permalink}`,
    searchRoute: () => `/search`,
    subredditsRoute: () => `/subreddits`,
    subredditRoute: (subreddit) => `/r/${subreddit}`
};

export default ROUTES;