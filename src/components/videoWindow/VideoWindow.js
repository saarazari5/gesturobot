import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoContainer from './VideoContainer';
import SidePanel from './SidePanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './VideoWindow.css';
import { CiPlay1 } from "react-icons/ci";
import { getMovements } from "../../databases/movementsAPI";
import { Translations } from "../../language-management/Translations";

const VideoWindow = () => {
    const location = useLocation();
    const navigate = useNavigate();  // Added to handle navigation
    const gesture = location.state?.gestureId || {};
    const currentSubject = location.state?.currentSubject || ''; // Retrieve current subject from navigation state

    const [movements, setMovements] = useState([]);
    const [droppedItems, setDroppedItems] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(-1); // Start with -1 to hide borders initially

    const combinedVideoRef = useRef(null);

    useEffect(() => {
        if (droppedItems.length > 0) {
            setCurrentVideoIndex(0); // Start from the first video when videos are available
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

    const playCombinedVideos = () => {
        if (combinedVideoRef.current) {
            combinedVideoRef.current.play();
        }
    };

    const combineVideos = () => {
        const validDroppedItems = droppedItems.filter(item => item !== undefined);
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
            setCurrentVideoIndex(nextVideoIndex);
            combinedVideoRef.current.src = droppedItems[nextVideoIndex].videoUrl;
            combinedVideoRef.current.play();
        } else {
            setCurrentVideoIndex(-1); // Reset the index when all videos are done
        }
    };

    const handleManualPlay = () => {
        if (combinedVideoRef.current) {
            combinedVideoRef.current.src = droppedItems[0].videoUrl;
            setCurrentVideoIndex(0);
            combinedVideoRef.current.play();
        }
    };

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
                            initialName={gesture.name || currentSubject}  // Set initialName as currentSubject
                            initialLabel={gesture.realLabel ? gesture.realLabel[0] : ''}
                            currentPlayingIndex={currentVideoIndex}
                            initialGroup={gesture.group}
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
};

export default VideoWindow;
