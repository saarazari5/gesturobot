import React, { useState, useEffect, useRef } from "react";
import { getMovements } from "../../databases/movementsAPI";
import "./loopOfMovements.css";

const LoopOfMovements = (props) => {
  const [URLs, setURLs] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFirstVideoPlayed, setIsFirstVideoPlayed] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  function getURLsByIds(data) {
    const URLs = props.ids.map((id) => {
      const matchingObject = data.find((object) => object.id === id);
      return matchingObject ? matchingObject.videoUrl : "";
    });
    return URLs;
  }

  const handleVideoEnd = () => {
    if (currentVideoIndex === URLs.length - 1) {
      setCurrentVideoIndex(0);
      setIsPlaying(false);
      return;
    }
    setCurrentVideoIndex(currentVideoIndex + 1);
    if (currentVideoIndex === 0 && !isFirstVideoPlayed) {
      setIsFirstVideoPlayed(true);
    }
    handleButtonClick();
  };

  const handleButtonClick = () => {
    setIsPlaying(true);
    if (!isFirstVideoPlayed) {
      setIsFirstVideoPlayed(true);
    }
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Error attempting to play video:", error);
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovements();
      const URLs = getURLsByIds(data);
      setURLs(URLs);
    };
    fetchData();
    if (
      videoRef.current &&
      ((currentVideoIndex === 0 && !isFirstVideoPlayed) ||
        currentVideoIndex !== 0)
    ) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error attempting to play video:", error);
        });
      }
    }
  }, [currentVideoIndex, isFirstVideoPlayed]);

  return (
    <div className="loop-of-movements">
      <div className="video-container">
        {isPlaying ? null : (
          <div className="video-play-button" onClick={handleButtonClick}>
            <img
              src="http://clipart-library.com/images_k/white-play-button-transparent/white-play-button-transparent-14.png"
              alt="Play"
            />
          </div>
        )}

        <video
          muted={true}
          onEnded={handleVideoEnd}
          src={URLs[currentVideoIndex]}
          ref={videoRef}
          className="video-player"
        ></video>
      </div>
    </div>
  );
};

export default LoopOfMovements;
