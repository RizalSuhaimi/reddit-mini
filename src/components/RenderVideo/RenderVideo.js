// Tried to use "@ffmpeg/ffmpeg" and "@ffmpeg/util" tp merge the video and audio files but could not figure it out

import React, { useCallback, useEffect, useRef } from "react";

import "./RenderVideo.css"

const RenderVideo = ({ videoString }) => {
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const videoUrl = videoString.split("?")[0];
    const audioUrl = videoUrl.replace(/DASH_\d+\.mp4/, "DASH_AUDIO_128.mp4");

    // Synchoronize audio with video
    const syncAudioWithVideo = () => {
        if (videoRef.current && audioRef.current) {
            audioRef.current.currentTime = videoRef.current.currentTime;
        }
    }

    const handlePlayVideo = () => {
        if (audioRef.current) {
            syncAudioWithVideo();
            audioRef.current.play();
        }
    }

    const handlePauseVideo = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }

    // Handle video time updates to sync audio
    const handleTimeUpdate = useCallback(() => {
        syncAudioWithVideo();
    }, []);

    // Handle video buffering (waiting event)
    const handleBuffering = useCallback(() => {
        if (audioRef.current) {
            if(audioRef.current.currentTime !== videoRef.current.currentTime) {
                audioRef.current.pause();
            }
        }
    }, []);

    // Handle video resume from buffering (playing event)
    const handleResumePlaying = useCallback(() => {
        if (audioRef.current) {
            syncAudioWithVideo();
            audioRef.current.play();
        }
    }, [])

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.addEventListener("timeupdate", handleTimeUpdate);
            video.addEventListener("waiting", handleBuffering);
            video.addEventListener("playing", handleResumePlaying);

            return () => {
                video.removeEventListener("timeupdate", handleTimeUpdate);
                video.removeEventListener("waiting", handleBuffering);
                video.removeEventListener("playing", handleResumePlaying);
            };
        };
    }, [handleResumePlaying, handleBuffering, handleTimeUpdate])

    return (
        <>
            {videoUrl ?
                <video
                    className="redditPostVid"
                    src={videoUrl}             
                    controls
                    muted={false}
                    ref={videoRef}
                    onPlay={handlePlayVideo}
                    onPause={handlePauseVideo}
                >
                    Your browser does not support the video tag
                </video>
                :
                <p>Video unavailable</p>
            }
            {audioUrl ?
                <audio
                    src={audioUrl}
                    controls
                    muted={false}
                    ref={audioRef}
                    style={{display: "none"}}
                >
                    Your browser does not support the audio tag
                </audio>
                :
                <p>Audio unavailable</p>
            }
            
        </>
        
    )
}

export default RenderVideo;