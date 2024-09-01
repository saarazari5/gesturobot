import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoContainer from './VideoContainer';
import SidePanel from './SidePanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './VideoWindow.css'; // Import CSS file
import { CiPlay1 } from "react-icons/ci";
import { getMovements } from "../../databases/movementsAPI";
import { Translations } from "../../language-management/Translations";

function VideoWindow() {
    const location = useLocation();
    const gesture = location.state?.gestureId || {};
    const [movements, setMovements] = useState([]);
    const [droppedItems, setDroppedItems] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Index of the currently playing video
    const combinedVideoRef = useRef(null);

    useEffect(() => {
        playCombinedVideos(); // Autoplay combined videos when dropped items change
    }, [droppedItems]);

    useEffect(() => {
        console.log("Gesture from state:", gesture); // Debugging line
    }, [gesture]);

    useEffect(() => {
        const fetchMovements = async () => {
            try {
                const fetchedMovements = await getMovements();
                const dropped = gesture.movements.map(movementID => {
                    return fetchedMovements.find(movement => movement.id === movementID);
                });
                setDroppedItems(dropped);
            } catch (error) {
                console.error("Failed to fetch movements:", error);
            }
        };

        fetchMovements();
    }, [gesture]);

    const playCombinedVideos = () => {
        if (combinedVideoRef.current) {
            combinedVideoRef.current.play(); // Start playing the combined video
        }
    };

    const combineVideos = () => {
        const validDroppedItems = droppedItems.filter(item => item !== undefined); // Filter out undefined items
        return (
            <>
                <video muted ref={combinedVideoRef} onEnded={playNextVideo}>
                    {validDroppedItems.map((item, index) => (
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
    console.log("dropped", droppedItems);

    return (
        <Translations>
            {({ translate }) => (
                <DndProvider backend={HTML5Backend}>
                    <div className="App">
                        <SidePanel />
                        <VideoContainer
                        <VideoContainer
                            droppedItems={droppedItems}
                            setDroppedItems={setDroppedItems}
                            existingGestureId={gesture.id} // Pass gesture ID or null
                            initialName={gesture.name || ''} // Use empty string if name is undefined
                            initialLabel={gesture.realLabel ? gesture.realLabel[0] : ''} // Default to empty string if undefined
                        />
                        {droppedItems.length > 0 && (
                            <div className="combined-video">
                                {combineVideos()}
                                <div className="video-play-buttonn" onClick={handleManualPlay}>
                                    <CiPlay1 />
                                </div>
                            </div>
                        )}
                    </div>
                </DndProvider>
            )}
        </Translations>
    );
}

export default VideoWindow;
