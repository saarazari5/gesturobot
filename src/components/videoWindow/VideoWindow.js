import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoContainer from './VideoContainer';
import SidePanel from './SidePanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './VideoWindow.css';
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { getMovements } from "../../databases/movementsAPI";
import { Translations } from "../../language-management/Translations";

const VideoWindow = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const gesture = location.state?.gestureId || {};
    const currentSubject = location.state?.currentSubject || '';

    const [movements, setMovements] = useState([]);
    const [droppedItems, setDroppedItems] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(-1); // Start at -1 when no video is selected
    const [isPlaying, setIsPlaying] = useState(false); // State to manage play/pause

    const combinedVideoRef = useRef(null);

    useEffect(() => {
        if (droppedItems.length > 0) {
            setCurrentVideoIndex(0); // Start with the first video
            playCombinedVideos();
        }
    }, [droppedItems]);

    useEffect(() => {
        const fetchMovements = async () => {
            try {
                const fetchedMovements = await getMovements();
                const dropped = gesture.movements?.map(movementID => {
                    return fetchedMovements.find(movement => movement.id === movementID);
                });
                setDroppedItems(dropped);
            } catch (error) {
                console.error("Failed to fetch movements:", error);
            }
        };

        if (gesture.movements) {
            fetchMovements();
        }
    }, [gesture]);

    // Play or update the current video
    const playCombinedVideos = () => {
        if (combinedVideoRef.current && droppedItems[currentVideoIndex]) {
            combinedVideoRef.current.src = droppedItems[currentVideoIndex].videoUrl;
    
            // Add an event listener for 'canplay' or 'loadeddata' to play the video when ready
            combinedVideoRef.current.addEventListener('canplay', () => {
                combinedVideoRef.current.play().catch(error => {
                    console.error("Error attempting to play the video:", error);
                });
            }, { once: true }); // Use 'once' to remove the listener after it fires
        }
    };
    

    const combineVideos = () => {
        return (
            <>
                <video 
                  muted 
                  ref={combinedVideoRef} 
                  onEnded={playNextVideo} 
                  style={{ width: "100%" }}
                />
                <div className="play-pause-btn" onClick={togglePlayPause}>
                    {isPlaying ? <CiPause1 size={40} /> : <CiPlay1 size={40} />}
                </div>
            </>
        );
    };

    const playNextVideo = () => {
        const nextVideoIndex = currentVideoIndex + 1;
    
        if (nextVideoIndex < droppedItems.length) {
            preloadVideo(nextVideoIndex); // Preload the next video
            setCurrentVideoIndex(nextVideoIndex);
        } else {
            preloadVideo(0); // Loop back to the first video and preload it
            setCurrentVideoIndex(0);
        }
    };
    
    // Preload the next video
    const preloadVideo = (index) => {
        const videoUrl = droppedItems[index]?.videoUrl;
        if (videoUrl) {
            const videoPreload = document.createElement('video'); // Create an off-screen video element
            videoPreload.src = videoUrl; // Set the video URL to preload
            videoPreload.preload = 'auto'; // Enable automatic preloading
        }
    };
    

    const togglePlayPause = () => {
        if (combinedVideoRef.current) {
            if (isPlaying) {
                combinedVideoRef.current.pause();
            } else {
                combinedVideoRef.current.play();
            }
            setIsPlaying(!isPlaying); // Toggle the play/pause state
        }
    };

    // When the currentVideoIndex changes, update the video source
    useEffect(() => {
        if (currentVideoIndex !== -1) {
            playCombinedVideos(); // Update video to the new selected one
        }
    }, [currentVideoIndex]);

    return (
        <Translations>
            {({ translate }) => (
                <DndProvider backend={HTML5Backend}>
                    <div className="App">
                        <SidePanel />
                        <VideoContainer
                            droppedItems={droppedItems}
                            setDroppedItems={setDroppedItems}
                            existingGestureId={gesture.id}
                            initialName={gesture.name || currentSubject}
                            initialLabel={gesture.realLabel ? gesture.realLabel[0] : ''}
                            currentPlayingIndex={currentVideoIndex}
                            setCurrentPlayingIndex={setCurrentVideoIndex} // Pass setCurrentPlayingIndex to update it
                            initialGroup={gesture.group}
                        />
                        {droppedItems.length > 0 && (
                            <div className="combined-video">
                                {combineVideos()}
                            </div>
                        )}
                    </div>
                </DndProvider>
            )}
        </Translations>
    );
};

export default VideoWindow;
