import React, { useState, useRef, useEffect } from 'react';
import VideoContainer from './VideoContainer';
import SidePanel from './SidePanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './VideoWindow.css'; // Import CSS file

function VideoWindow() {
    const [droppedItems, setDroppedItems] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Index of the currently playing video
    const combinedVideoRef = useRef(null);

    useEffect(() => {
        playCombinedVideos(); // Autoplay combined videos when dropped items change
    }, [droppedItems]);

    const playCombinedVideos = () => {
        if (combinedVideoRef.current) {
            combinedVideoRef.current.play(); // Start playing the combined video
        }
    };

    const combineVideos = () => {
        return (
            <>
                <video muted ref={combinedVideoRef} onEnded={playNextVideo}>
                    {droppedItems.map((item, index) => (
                        <source key={index} src={item.videoUrl} type="video/mp4" />
                    ))}
                </video>
            </>
        );
    };


    const playNextVideo = () => {
        const nextVideoIndex = currentVideoIndex + 1;
        if (nextVideoIndex < droppedItems.length) {
            setCurrentVideoIndex(nextVideoIndex); // Update current video index
            combinedVideoRef.current.src = droppedItems[nextVideoIndex].videoUrl;
            combinedVideoRef.current.play();
        }
    };

    const handleManualPlay = () => {
        if (combinedVideoRef.current) {
            combinedVideoRef.current.src = droppedItems[0].videoUrl; // Start with the first video in the playlist
            setCurrentVideoIndex(0); // Reset current video index
            combinedVideoRef.current.play(); // Start playing the combined video
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <SidePanel />
                <VideoContainer
                    droppedItems={droppedItems}
                    setDroppedItems={setDroppedItems}
                />
                {droppedItems.length > 0 && (
                    <div className="combined-video">
                        {combineVideos()}
                        <div>
                            <button type="button" class="btn btn-outline-info playbtn" onClick={handleManualPlay}>Play</button>
                            {/* <button id='play-button' onClick={handleManualPlay}>Play</button> */}
                        </div>
                    </div>
                )}
            </div>
        </DndProvider>
    );
}

export default VideoWindow;
