import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import 
{ 
    loadFullPost,
    selectFullPost,
    selectErrorMessage,
    isLoading
} from "./FullPostSlice";

const FullPost = () => {
    const { subreddit, postId, postTitle } = useParams();
    const dispatch = useDispatch();
    const fullPost = useSelector(selectFullPost)
    const isLoadingFullPost = useSelector(isLoading);
    const fullPostErrorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(loadFullPost({subreddit, postId, postTitle}));
    }, [dispatch]);

    if (isLoadingFullPost) {
        return <div>Content is loading</div>
    } else if (fullPostErrorMessage) {
        return <div>{fullPostErrorMessage}</div>
    }

    return (
        <div>
            {fullPost ? 
                <> 
                    <p>This post's .json response has {fullPost.length} elements</p>
                    <h3>{fullPost[0].data.children[0].data.title}</h3>
                    <p>{fullPost[0].data.children[0].data.selftext}</p>
                    <ul>
                        {fullPost[1].data.children.map((comment) => (
                        <li key={comment.data.id}>
                            <h4>
                                {comment.data.author}
                            </h4>
                            <p>
                                {comment.data.body}
                            </p>
                        </li>
                        ))}
                    </ul>
                </>
                :
                <h3>Full post is loading</h3>
            }
            
        </div>
    )
}

export default FullPost;