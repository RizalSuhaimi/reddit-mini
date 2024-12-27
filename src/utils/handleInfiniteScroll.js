const handleInfiniteScroll = (dispatch, isLoadingFetch, fetchCall, fetchCallName, fetchArguments) => {
    return () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoadingFetch) {
            return;
        }

        // Dispatch action to load more posts when use scrolls to the bottom
        switch (fetchCallName) {
            case "loadRedditPosts":
                const { subreddit="popular", after=null } = fetchArguments;
                dispatch(fetchCall({ subreddit, after }));
                break;
            case "loadSubreddits":
                break;
            default:
                throw new Error(`${fetchCallName} Fetch command does not exist.`)
        }
    }
};

export default handleInfiniteScroll;