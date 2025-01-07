import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import 
{ 
    resetState,
    selectFullPost,
    selectComments,
    selectErrorMessage,
    isLoading,
    loadFullPost
} from "./FullPostSlice";
import ReactMarkdown from "react-markdown";
import RenderVideo from "../RenderVideo/RenderVideo";

import "bootstrap/dist/css/bootstrap.min.css";
import "./FullPost.css"
import arrow from "../../resources/arrow_upward.png";
import comment from "../../resources/comment.png";
import trophy from "../../resources/trophy.png";

const FullPost = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const fullPost = useSelector(selectFullPost);
    const comments = useSelector(selectComments);
    const isLoadingFullPost = useSelector(isLoading);
    const fullPostErrorMessage = useSelector(selectErrorMessage);

    const permalink = location.pathname;

    useEffect(() => {
        dispatch(loadFullPost(permalink));

        return () => {
            dispatch(resetState());
        };
    }, [location, dispatch, permalink])

    const hasImage = (imageString = "") => {
        if (imageString.includes(".jpeg") || imageString.includes(".jpg") || imageString.includes(".png") || imageString.includes(".gif")) {
            return true;
        } else {
            return false;
        }
    }

    const hasMultipleImages = (imagesString) => {
        if (imagesString.includes("gallery")) {
            return true;
        } else {
            return false;
        }
    }

    const hasVideo = (secure_media) => {
        if (secure_media && secure_media.reddit_video && secure_media.reddit_video.fallback_url) {
            return true;
        } else {
            return false;
        }
    }

    const initialLoading = isLoadingFullPost && Object.keys(fullPost).length === 0;

    return (
        <>
            {initialLoading && 
                <div className="d-flex  justify-content-center">
                    <div className="spinner-border" role="status"></div>
                    <p className="px-3 py-1">Loading full Reddit post</p>
                </div>
            }

            {fullPostErrorMessage && <p>{fullPostErrorMessage}</p>}

            {Object.keys(fullPost).length > 0 && 
                <>
                    <div
                    className="
                        rounded
                    "
                    >
                        <p style={{color: "rgb(200, 200, 200)"}}>by u/{fullPost.author} in {fullPost.subreddit_name_prefixed}</p>

                        <h3 className="my-3">{fullPost.title}</h3>

                        <ReactMarkdown>{fullPost.selftext}</ReactMarkdown>

                        {hasVideo(fullPost.secure_media) && 
                            <div className="my-2">
                                <RenderVideo videoString={fullPost.secure_media.reddit_video.fallback_url} />
                            </div>
                        }

                        {hasImage(fullPost.url) &&
                            <>
                                <img 
                                    src={fullPost.url}
                                    className="
                                        fullPostImg
                                        my-2
                                    "
                                    alt={fullPost.title}
                                />
                            </>
                        }

                        {hasMultipleImages(fullPost.url) &&
                            <p>This app is unable to display posts with multiple images. Apologies for inconvenience</p>
                        }
                        

                        <div
                        className="d-flex align-items-center"
                        >   
                            <img src={arrow} className="postIcons" alt="decorative upvote arrow"/>
                            <p className="my-0 mx-1">{fullPost.score}</p>
                            <img src={arrow} className="postIcons-down" alt="decorative downvote arrow"/>

                            <div className="fs-1 mx-2 text-secondary">l</div>

                            <img src={comment} className="postIcons" alt="decorative comments icon"/>
                            <p className="my-0 ms-1">{fullPost.num_comments}</p>

                            <div className="fs-1 mx-2 text-secondary">l</div>
                            
                            <img src={trophy} className="postIcons" alt="decorative awards icon"/>
                            <p className="my-0 ms-1">{fullPost.total_awards_received}</p>
                        </div>
                        
                    </div>

                    <div className="postCommentsDivider"></div>

                    {comments.length > 0 ?
                        <ul
                        className="
                            my-2
                            list-group
                            list-unstyled
                        "
                        >
                            {comments.map((comment) => (
                                <li key={comment.data.id}>
                                    <div
                                    className="
                                        rounded
                                        py-2 px-3
                                        my-1
                                    "
                                    >
                                        <p style={{color: "rgb(200, 200, 200)"}}>by u/{comment.data.author}</p>
                                        
                                        {hasImage(comment.data.body) ? 
                                        <p>
                                            Comments with images are unavailable in this app. Apologies for the inconvenience.
                                        </p> 
                                        : 
                                        <>
                                            <ReactMarkdown>{comment.data.body}</ReactMarkdown>
                                        </>
                                        }
                                        

                                        <div className="d-flex align-items-center">
                                            <img src={arrow} className="postIcons" alt="decorative upvote arrow"/>
                                            <p className="my-0 mx-1">{comment.data.score}</p>
                                            <img src={arrow} className="postIcons-down" alt="decorative downvote arrow"/>

                                            <div className="fs-1 mx-3 text-secondary">l</div>
                                            
                                            <img src={trophy} className="postIcons" alt="decorative awards icon"/>
                                            <p className="my-0 mx-1">{comment.data.total_awards_received}</p>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="border-top"></div>
                                </li>
                            ))}
                        </ul>
                    :
                        <p>No comments yet</p>
                    }
                    
                </>
            }
            
        </>
    )
}

export default FullPost;