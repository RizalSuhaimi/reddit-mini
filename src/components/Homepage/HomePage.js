import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../App/Routes";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadRedditPosts,
    selectRedditPosts,
    selectErrorMessage,
    isLoading
} from "../RedditPosts/RedditPostsSlice";

const HomePage = () => {
    const dispatch = useDispatch();
    const redditPosts = useSelector(selectRedditPosts)
    const isLoadingRedditPosts = useSelector(isLoading);
    const redditPostsErrorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(loadRedditPosts());
    }, [dispatch]);

    if (isLoadingRedditPosts) {
        return <div>Content is loading</div>
    } else if (redditPostsErrorMessage) {
        return <div>{redditPostsErrorMessage}</div>
    }

    return (
        <div>
            <h2>Trending in Reddit</h2>
            <ul>
                {redditPosts ? 
                    redditPosts.data.children.map((post) => (
                    <li key={post.data.id}>
                        <Link to={ROUTES.fullPostRoute(post.data.subreddit, post.data.id, post.data.title)} >
                            {post.data.title}
                        </Link>
                    </li>
                    ))
                    :
                    <p>Content is loading</p>
                }
            </ul>
        </div>
    )
}

export default HomePage;