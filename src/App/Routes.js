const ROUTES = {
    fullPostRoute: (permalink) => `${permalink}`,
    searchRoute: () => `/search`,
    subredditsRoute: () => `/subreddits`,
    subredditRoute: (subreddit) => `/r/${subreddit}`
};

export default ROUTES;