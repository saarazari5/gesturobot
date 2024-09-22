import React, { useState, useEffect, useRef } from "react";
import { getMovements } from "../../databases/movementsAPI";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import "./loopOfMovements.css";

const LoopOfMovements = (props) => {
  const [URLs, setURLs] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);

  // Fetch video URLs based on provided IDs
  function getURLsByIds(data) {
    return props.ids.map((id) => {
      const matchingObject = data.find((object) => object.id === id);
      return matchingObject ? matchingObject.videoUrl : "";
    });
  }

  // Handle the end of the current video
  const handleVideoEnd = () => {
    const nextIndex = (currentVideoIndex + 1) % URLs.length;
    setCurrentVideoIndex(nextIndex);
  };

  // Handle play/pause button click
  const handleButtonClick = () => {
    const currentRef = videoRefs.current[currentVideoIndex];
    if (currentRef.paused || currentRef.ended) {
      currentRef.play().catch((error) => {
        console.error("Error attempting to play video:", error);
      });
      setIsPlaying(true);
    } else {
      currentRef.pause();
      setIsPlaying(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const data = await getMovements();
      if (isMounted) {
        const fetchedURLs = getURLsByIds(data);
        setURLs(fetchedURLs);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [props.ids]);

  // Observe visibility using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setIsPlaying(false);  // Pause the video when it's not visible
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto-play or pause the current video when visibility or isPlaying changes
  useEffect(() => {
    const currentRef = videoRefs.current[currentVideoIndex];
    if (currentRef) {
      if (isVisible && isPlaying) {
        currentRef.play().catch((error) => {
          console.error("Error attempting to play video:", error);
        });
      } else {
        currentRef.pause();
      }
    }
  }, [currentVideoIndex, isPlaying, isVisible]);

  // Event handlers for mouse enter and leave
  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  return (
    <div
      className="loop-of-movements"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-container">
        {(!isPlaying || showControls) && (
          <div className="video-play-button" onClick={handleButtonClick}>
            {isPlaying ? <CiPause1 size={24} /> : <CiPlay1 size={24} />}
          </div>
        )}
        {/* Only render videos when visible */}
        {isVisible &&
          URLs.map((url, index) => (
            <video
              key={index}
              muted
              onEnded={handleVideoEnd}
              ref={(el) => (videoRefs.current[index] = el)}
              className="video-player"
              src={url}
              preload="metadata"
              style={{
                display: index === currentVideoIndex ? "block" : "none",
              }}
            ></video>
          ))}
      </div>
    </div>
  );
};

export default React.memo(LoopOfMovements);
