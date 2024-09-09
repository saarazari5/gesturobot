import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDrag } from 'react-dnd';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'; // Import arrow icons
import { Translations } from "../../language-management/Translations";
import './SidePanel.css';

const DraggableItem = ({ id, videoUrl, name }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'draggableItem',
    item: { type: 'draggableItem', id, videoUrl, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`draggable-item ${isDragging ? 'dragging' : ''}`}>
      <video src={videoUrl} muted controls width="155" height="100" />
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
    <Translations>
      {({ translate }) => (
        <div className="side-panel">
          <div
            className={`arrow-icon ${isOpen ? 'arrow-open' : 'arrow-closed'}`}
            onClick={handleToggleSlideWindow}
          >
            {isOpen ? <SlArrowLeft /> : <SlArrowRight />}
          </div>
          <div
            className={`side-panel-style ${isOpen ? 'side-panel-open' : 'side-panel-closed'}`}
          >
            {isOpen && (
              <div>
                <h3 className="text-movements-library">
                  {translate('Movements')}
                  <br />
                  {translate('Library')}
                </h3>
                <div className="video-list">
                  {videos.map((video) => (
                    <DraggableItem
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
