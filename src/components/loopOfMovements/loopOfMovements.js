import React, { useState, useEffect, useRef } from "react";
import { getMovements } from "../../databases/movementsAPI";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import "./loopOfMovements.css";

/**
 * LoopOfMovements is a React component that renders a loop of videos based on provided video IDs.
 * The component auto-plays and loops through the videos one by one and pauses when the component is not visible on the screen.
 * It also includes play/pause button controls that appear when hovering over the video.
 * 
 * @param {object} props - The component properties.
 * @param {Array} props.ids - An array of video IDs to fetch and display.
 * 
 * @returns {JSX.Element} A video loop component with play/pause functionality and visibility-based auto-play.
 */
const LoopOfMovements = (props) => {
  const [URLs, setURLs] = useState([]);  // State to store the fetched video URLs
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);  // State to track the current video being played
  const [isPlaying, setIsPlaying] = useState(false);  // State to track whether the video is playing or paused
  const [showControls, setShowControls] = useState(false);  // State to control whether to show play/pause controls
  const [isVisible, setIsVisible] = useState(false);  // State to track if the video is visible on the screen
  const videoRefs = useRef([]);  // Ref to store references to each video element
  const containerRef = useRef(null);  // Ref to the container for intersection observer

  /**
   * Fetch the video URLs based on the provided IDs from props.
   * @param {Array} data - The movement data fetched from the API.
   * @returns {Array} - The video URLs that match the provided IDs.
   */
  function getURLsByIds(data) {
    return props.ids.map((id) => {
      const matchingObject = data.find((object) => object.id === id);  // Find the video matching the given ID
      return matchingObject ? matchingObject.videoUrl : "";  // Return the video URL or an empty string
    });
  }

  /**
   * Handle the event when the current video ends by moving to the next video in the list.
   */
  const handleVideoEnd = () => {
    const nextIndex = (currentVideoIndex + 1) % URLs.length;  // Move to the next video, looping back to the first
    setCurrentVideoIndex(nextIndex);  // Update the current video index
  };

  /**
   * Handle the play/pause button click, playing or pausing the current video.
   */
  const handleButtonClick = () => {
    const currentRef = videoRefs.current[currentVideoIndex];  // Get the current video reference
    if (currentRef.paused || currentRef.ended) {
      currentRef.play().catch((error) => {
        console.error("Error attempting to play video:", error);
      });
      setIsPlaying(true);  // Set the state to playing
    } else {
      currentRef.pause();  // Pause the video
      setIsPlaying(false);  // Set the state to paused
    }
  };

  /**
   * Fetch video data from the API and set the video URLs on component mount.
   */
  useEffect(() => {
    let isMounted = true;  // Ensure the component is mounted before updating the state
    const fetchData = async () => {
      const data = await getMovements();  // Fetch movement data
      if (isMounted) {
        const fetchedURLs = getURLsByIds(data);  // Get the video URLs that match the provided IDs
        setURLs(fetchedURLs);  // Set the URLs in the state
      }
    };
    fetchData();
    return () => {
      isMounted = false;  // Cleanup to prevent state update after unmount
    };
  }, [props.ids]);  // Only refetch if the IDs prop changes

  /**
   * Use IntersectionObserver to track the visibility of the video container.
   * This controls whether the videos are playing or paused based on their visibility.
   */
  useEffect(() => {
    const observerOptions = {
      root: null,  // Observe the viewport
      rootMargin: "0px",
      threshold: 0.1,  // Trigger when at least 10% of the container is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);  // Set the state to visible if the container is in view
        } else {
          setIsVisible(false);  // Set to not visible and pause the video
          setIsPlaying(false);  // Pause the video when it's not visible
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (containerRef.current) {
      observer.observe(containerRef.current);  // Start observing the container
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);  // Stop observing on cleanup
      }
    };
  }, []);

  /**
   * Auto-play or pause the video based on visibility and play state.
   */
  useEffect(() => {
    const currentRef = videoRefs.current[currentVideoIndex];  // Get the current video reference
    if (currentRef) {
      if (isVisible && isPlaying) {
        currentRef.play().catch((error) => {
          console.error("Error attempting to play video:", error);
        });
      } else {
        currentRef.pause();  // Pause the video when not visible or not playing
      }
    }
  }, [currentVideoIndex, isPlaying, isVisible]);  // Re-run effect if the video index, play state, or visibility changes

  /**
   * Handle mouse enter event to show controls.
   */
  const handleMouseEnter = () => {
    setShowControls(true);  // Show controls when hovering over the video
  };

  /**
   * Handle mouse leave event to hide controls.
   */
  const handleMouseLeave = () => {
    setShowControls(false);  // Hide controls when the mouse leaves the video
  };

  return (
    <div
      className="loop-of-movements"
      ref={containerRef}  // Set the container ref for the IntersectionObserver
      onMouseEnter={handleMouseEnter}  // Show controls on mouse enter
      onMouseLeave={handleMouseLeave}  // Hide controls on mouse leave
    >
      <div className="video-container">
        {(!isPlaying || showControls) && (
          <div className="video-play-button" onClick={handleButtonClick}>
            {isPlaying ? <CiPause1 size={24} /> : <CiPlay1 size={24} />}  {/* Play/Pause button */}
          </div>
        )}
        {/* Only render videos when visible */}
        {isVisible &&
          URLs.map((url, index) => (
            <video
              key={index}
              muted
              onEnded={handleVideoEnd}  // Move to the next video on end
              ref={(el) => (videoRefs.current[index] = el)}  // Save the video element reference
              className="video-player"
              src={url}
              preload="metadata"
              style={{
                display: index === currentVideoIndex ? "block" : "none",  // Show only the current video
              }}
            ></video>
          ))}
      </div>
    </div>
  );
};

export default React.memo(LoopOfMovements);  // Use memo to avoid unnecessary re-renders
