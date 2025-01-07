import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../App/Routes";
import RenderVideo from "../RenderVideo/RenderVideo";

import "bootstrap/dist/css/bootstrap.min.css";
import "./RedditPosts.css";
import arrow from "../../resources/arrow_upward.png";
import comment from "../../resources/comment.png";
import trophy from "../../resources/trophy.png";

const RedditPosts = ({redditPosts}) => {
    const hasImage = (imageString) => {
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

    return (
        <>
            <ol
                className="
                    my-2
                    list-group
                    list-unstyled
                "
            >
                {redditPosts.map((post) => (
                    <li 
                        key={post.data.id}
                    >
                        <Link 
                        to={ROUTES.fullPostRoute(post.data.permalink)}
                        aria-label={`Read the full Reddit post: ${post.data.title}`}
                        
                        className="
                            text-white
                            text-decoration-none
                        "
                        >
                            {/*Using the Link component for the whole list item means that you cannot have <a> child elements within the Link component*/}
                            
                            <div
                                className="
                                    rounded
                                    py-2 px-3
                                    my-1
                                    redditPost
                                "
                            >
                                <p style={{color: "rgb(200, 200, 200)"}}>by u/{post.data.author} in {post.data.subreddit_name_prefixed}</p>

                                <h4 className="my-3">{post.data.title}</h4>

                                {hasVideo(post.data.secure_media) && 
                                    <div className="my-2">
                                        <RenderVideo videoString={post.data.secure_media.reddit_video.fallback_url} />
                                    </div>
                                }

                                {hasImage(post.data.url) &&
                                    <>
                                        <img 
                                            src={post.data.url}
                                            className="
                                                redditPostImg
                                                my-2
                                            "
                                        />
                                    </>
                                }

                                {hasMultipleImages(post.data.url) &&
                                    <p>This app is unable to display posts with multiple images. Apologies for inconvenience</p>
                                }

                                {post.data.selftext &&
                                    <p className="">
                                        Click on the post to read the full story
                                    </p>
                                }

                                <div className="d-flex align-items-center">
                                    <img src={arrow} className="postIcons"/>
                                    <p className="my-0 mx-1">{post.data.score}</p>
                                    <img src={arrow} className="postIcons-down"/>

                                    <div className="fs-1 mx-2 text-secondary">l</div>

                                    <img src={comment} className="postIcons"/>
                                    <p className="my-0 ms-1">{post.data.num_comments}</p>

                                    <div className="fs-1 mx-2 text-secondary">l</div>

                                    <img src={trophy} className="postIcons"/>
                                    <p className="my-0 ms-1">{post.data.total_awards_received}</p>
                                </div>
                                
                            </div>
                                
                            
                        </Link>
                        <div className="border-top"></div>
                    </li>
                ))}
            </ol>
        </>
    )
}

export default RedditPosts;