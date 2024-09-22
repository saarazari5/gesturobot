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
    const gesture = location.state?.gestureId || {};
    const currentSubject = location.state?.currentSubject || '';

    const [droppedItems, setDroppedItems] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(-1); // Start at -1 when no video is selected
    const [isPlaying, setIsPlaying] = useState(true); // State to manage play/pause

    const [videoRefs, setVideoRefs] = useState([]);

    useEffect(() => {
        if (droppedItems.length > 0) {
            const refs = droppedItems.map(() => React.createRef());
            setVideoRefs(refs);
            setCurrentVideoIndex(0); // Start with the first video
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

    const combineVideos = () => {
        return (
            <>
                {droppedItems.map((item, index) => (
                    <video
                        key={index}
                        muted
                        ref={videoRefs[index]}
                        onEnded={playNextVideo}
                        style={{ width: "100%", display: index === currentVideoIndex ? 'block' : 'none' }}
                        src={item.videoUrl}
                        preload="auto"
                        autoPlay={index === currentVideoIndex}
                    />
                ))}
                <div className="play-pause-btn" onClick={togglePlayPause}>
                    {isPlaying ? <CiPause1 size={40} /> : <CiPlay1 size={40} />}
                </div>
            </>
        );
    };

    const playNextVideo = () => {
        if (videoRefs[currentVideoIndex].current) {
            videoRefs[currentVideoIndex].current.pause();
            videoRefs[currentVideoIndex].current.currentTime = 0;
        }
        const nextVideoIndex = (currentVideoIndex + 1) % droppedItems.length;
        setCurrentVideoIndex(nextVideoIndex);
        setIsPlaying(true);
    };

    const togglePlayPause = () => {
        if (videoRefs[currentVideoIndex].current) {
            if (isPlaying) {
                videoRefs[currentVideoIndex].current.pause();
            } else {
                videoRefs[currentVideoIndex].current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (videoRefs[currentVideoIndex]?.current) {
            if (isPlaying) {
                videoRefs[currentVideoIndex].current.play();
            }
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
                            setCurrentPlayingIndex={setCurrentVideoIndex}
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
