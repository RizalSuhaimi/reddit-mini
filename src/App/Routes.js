const ROUTES = {
    subredditRoute: (subreddit) => `/r/${subreddit}`,
    fullPostRoute: (subreddit, postId, postTitle) => `/r/${subreddit}/comments/${postId}/${postTitle}`
};

export default ROUTES;