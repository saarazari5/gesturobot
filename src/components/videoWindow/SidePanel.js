import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'; // Import arrow icons
import './SidePanel.css';
import video1 from './videos/video1.mp4';
import video2 from './videos/video2.mp4';
import video3 from './videos/video3.mp4';

const DraggableItem = ({ videoUrl, name }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'draggableItem',
    item: { type: 'draggableItem', videoUrl, name },
    collect: monitor => ({
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

  const handleToggleSlideWindow = () => {
    setIsOpen(!isOpen);
    setIsArrowToLeft(!isArrowToLeft);
  };

  const arrowStyle = {
    position: 'absolute',
    right: isOpen ? 'calc(100% - 220px)' : '220px', // Move arrow to the right when side panel is open
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    transition: 'left 0.3s', // Change 'right' to 'left' for transition
    zIndex: 3,
  };

  const sidePanelStyle = {
    width: '200px',
    height: '100%',
    backgroundColor: 'rgb(224, 223, 223)',
    position: 'fixed',
    top: '0',
    left: isOpen ? '0' : '-200px', // Change 'right' to 'left' and adjust positions accordingly
    transition: 'left 0.1s', // Change 'right' to 'left' for transition
    zIndex: 2,
    overflowY: 'auto', // Add overflow-y property for vertical scrolling
  };

  const videos = [
    { name: 'jump', url: video1 },
    { name: 'sit', url: video2 },
    { name: 'hey', url: video3 },
    { name: 'jump', url: video1 },
    { name: 'sit', url: video2 },
    { name: 'hey', url: video3 },
  ];

  return (
    <div className="side-panel">
      <div style={arrowStyle} onClick={handleToggleSlideWindow}>
        {isOpen ? <SlArrowLeft /> : <SlArrowRight />}
      </div>
      <div style={sidePanelStyle} className="slide-window-content">
        {isOpen && (
          <div>
            <h3 className="text-movements-library">Movemets Library</h3>
            <div className="video-list">
              {videos.map((video, index) => (
                <DraggableItem key={index} videoUrl={video.url} name={video.name} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
