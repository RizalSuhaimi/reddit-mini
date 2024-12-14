import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loadRedditPosts,
    selectRedditPosts,
    selectErrorMessage,
    isLoading
} from "../Posts/RedditPostsSlice";

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
                    <li>{post.data.title}</li>
                    ))
                    :
                    <p>Content is loading</p>
                }
            </ul>
        </div>
    )
}

export default HomePage;