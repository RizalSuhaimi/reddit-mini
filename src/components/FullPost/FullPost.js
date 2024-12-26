import React from "react";
import { useSelector } from "react-redux";
import 
{ 
    selectFullPost,
    selectComments,
    selectErrorMessage,
    isLoading
} from "./FullPostSlice";

const FullPost = () => {
    const fullPost = useSelector(selectFullPost);
    const comments = useSelector(selectComments);
    const isLoadingFullPost = useSelector(isLoading);
    const fullPostErrorMessage = useSelector(selectErrorMessage);

    if (isLoadingFullPost) {
        return <div>Full post is loading</div>
    } else if (fullPostErrorMessage) {
        return <div>{fullPostErrorMessage}</div>
    }

    return (
        <div>
            {Object.keys(fullPost).length > 0 ? 
                <>
                    <h3>{fullPost.title}</h3>
                    <p>{fullPost.selftext}</p>
                    {comments.length > 0 ?
                        <ul>
                            {comments.map((comment) => (
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
                    :
                        <p>No comments yet</p>
                    }
                    
                </>
                :
                <h3>Full post is unavailable</h3>
            }
            
        </div>
    )
}

export default FullPost;