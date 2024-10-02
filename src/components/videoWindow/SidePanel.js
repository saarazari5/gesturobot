import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'; // Import arrow icons for sliding panel control
import { Translations } from "../../language-management/Translations";
import './SidePanel.css';
import { getMovements } from '../../databases/movementsAPI';
import { shouldSideBarAutoplay, shouldSideBarBeOpen } from '../../params';

/**
 * DraggableItem component represents a draggable video item.
 * It uses the React DnD `useDrag` hook to make the video draggable.
 * 
 * @param {object} props - The component properties.
 * @param {string} props.id - The unique ID of the video.
 * @param {string} props.videoUrl - The URL of the video.
 * @param {string} props.name - The name of the video to be displayed.
 * 
 * @returns {JSX.Element} A video component that is draggable and has custom controls.
 */
const DraggableItem = ({ id, videoUrl, name }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'draggableItem',  // Specifies the type of draggable item
    item: { type: 'draggableItem', id, videoUrl, name },  // Defines the data for the draggable item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),  // Collects the dragging state
    }),
  });

  return (
    <div ref={drag} className={`draggable-item ${isDragging ? 'dragging' : ''}`}>
      <video
        src={videoUrl}
        muted
        loop
        {...(shouldSideBarAutoplay ? { autoPlay: true } : {})}  // Conditionally auto-play the video
        controls
        controlsList="nodownload noremoteplayback nofullscreen"  // Disable specific controls
        disablePictureInPicture
        width="155"
        height="100"
        className="custom-video-controls"
      />
      <p>{name}</p>  {/* Display the name of the video */}
    </div>
  );
};

/**
 * SidePanel component is a sliding sidebar that displays a list of draggable video items.
 * The sidebar can be toggled open or closed, and it fetches video data from the movements API.
 * 
 * @returns {JSX.Element} A sliding sidebar that displays draggable video items and can be opened/closed.
 */
const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(shouldSideBarBeOpen);  // Controls whether the sidebar is open or closed
  const [isArrowToLeft, setIsArrowToLeft] = useState(false);  // Controls the direction of the toggle arrow icon
  const [videos, setVideos] = useState([]);  // Stores the list of videos fetched from the API

  /**
   * handleToggleSlideWindow toggles the visibility of the sidebar and switches the direction of the arrow icon.
   */
  const handleToggleSlideWindow = () => {
    setIsOpen(!isOpen);  // Toggle the sidebar open/closed state
    setIsArrowToLeft(!isArrowToLeft);  // Toggle the direction of the arrow icon
  };

  /**
   * Fetch video data from the movements API when the component mounts.
   */
  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const movments = await getMovements();  // Fetch movements data
        setVideos(movments);  // Set the fetched video data in the state
      } catch (error) {
        console.error('Error fetching data:', error);  // Handle any errors that occur during data fetching
      }
    };
    fetchMovements();  // Call the function to fetch video data
  }, []);

  return (
    <Translations>
      {({ translate }) => (
        <div className="side-panel">
          {/* Toggle arrow icon for opening/closing the sidebar */}
          <div
            className={`arrow-icon ${isOpen ? 'arrow-open' : 'arrow-closed'}`}
            onClick={handleToggleSlideWindow}
          >
            {isOpen ? <SlArrowLeft /> : <SlArrowRight />}  {/* Display left or right arrow based on sidebar state */}
          </div>
          {/* Side panel content */}
          <div
            className={`side-panel-style ${isOpen ? 'side-panel-open' : 'side-panel-closed'}`}
          >
            {isOpen && (
              <div>
                <h3 className="text-movements-library">
                  {translate('Movements')}  {/* Translation for "Movements" */}
                  <br />
                  {translate('Library')}  {/* Translation for "Library" */}
                </h3>
                <div className="video-list">
                  {/* Render each video as a draggable item */}
                  {videos.map((video) => (
                    <DraggableItem
                      key={video.id}
                      id={video.id}
                      videoUrl={video.videoUrl}
                      name={translate(video.name)} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Translations>
  );
};

export default SidePanel;
