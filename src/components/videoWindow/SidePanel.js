import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDrag } from 'react-dnd';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'; // Import arrow icons
import './SidePanel.css';

const DraggableItem = ({ videoUrl, name }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'draggableItem',
    item: { type: 'draggableItem', videoUrl, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`draggable-item ${isDragging ? 'dragging' : ''}`}>
      <video src={videoUrl} controls width="150" height="100" />
      <p>{name}</p>
    </div>
  );
};

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isArrowToLeft, setIsArrowToLeft] = useState(false);
  const [videos, setVideos] = useState([]);

  const handleToggleSlideWindow = () => {
    setIsOpen(!isOpen);
    setIsArrowToLeft(!isArrowToLeft);
  };

  const arrowStyle = {
    position: 'absolute',
    right: isOpen ? 'calc(100% - 235px)' : '220px', // Move arrow to the right when side panel is open
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    transition: 'left 0.3s', // Change 'right' to 'left' for transition
    zIndex: 3,
  };

  const sidePanelStyle = {
    width: '200px',
    height: '100%',
    backgroundColor: 'white',
    position: 'fixed',
    top: '0',
    left: isOpen ? '0' : '-200px', // Change 'right' to 'left' and adjust positions accordingly
    transition: 'left 0.1s', // Change 'right' to 'left' for transition
    zIndex: 2,
    overflowY: 'auto', // Add overflow-y property for vertical scrolling
  };

  useEffect(() => {
    // Fetch the video data from the JSON server
    axios.get('http://localhost:3000/movements') // Adjust the URL to your JSON server
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching video data:', error);
      });
  }, []);

  return (
    <div className="side-panel">
      <div style={arrowStyle} onClick={handleToggleSlideWindow}>
        {isOpen ? <SlArrowLeft /> : <SlArrowRight />}
      </div>
      <div style={sidePanelStyle} className="slide-window-content">
        {isOpen && (
          <div>
            <h3 className="text-movements-library">Movements Library</h3>
            <div className="video-list">
              {videos.map((video) => (
                <DraggableItem key={video.id} videoUrl={video.videoUrl} name={video.name} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
