import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import './VideoContainer.css'; // Import CSS file

const VideoContainer = ({ droppedItems, setDroppedItems }) => {
  const MAX_ITEMS = 6;

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = droppedItems[dragIndex];
    const newItems = [...droppedItems];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setDroppedItems(newItems);
  };

  const handleRemoveItem = index => {
    setDroppedItems(prevItems => prevItems.filter((item, i) => i !== index));
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'draggableItem',
    drop: (item, monitor) => {
      const { name, videoUrl } = item;
      if (droppedItems.length < MAX_ITEMS) {
        setDroppedItems(prevItems => [...prevItems, { name, videoUrl }]);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const Item = ({ name, videoUrl, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'draggableItem',
      item: { type: 'draggableItem', name, videoUrl, index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0.5 : 1;

    const [, drop] = useDrop({
      accept: 'draggableItem',
      hover(item) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        if (dragIndex < droppedItems.length) {
          moveItem(dragIndex, hoverIndex);
          item.index = hoverIndex;
        }
      },
    });

    const ref = useRef(null);
    drag(drop(ref));

    return (
      <div ref={ref} className={`frameStyle ${isDragging ? 'dragging' : ''}`} style={{ opacity }}>
        <div className="videoContainer">
          <video src={videoUrl} controls className="videoStyle" loading="lazy" preload="metadata" />
          <button onClick={() => handleRemoveItem(index)} className="buttonStyle">X</button>
          <div className="videoName">{name}</div>
        </div>
      </div>
    );
  };

  const handleDrop = (item) => {
    if (!item || typeof item !== 'object' || !('name' in item) || !('videoUrl' in item) || !('index' in item)) return;
    const { index: dragIndex } = item;
    const hoverIndex = droppedItems.length;
    if (dragIndex !== hoverIndex) {
      moveItem(dragIndex, hoverIndex);
    }
  };

  const containerStyle = {
    backgroundColor: isOver ? 'lightgray' : 'transparent',
  };

  return (
    <div className='VideoContainer' style={containerStyle}>
      {droppedItems.map((item, index) => (
        <Item key={index} name={item.name} videoUrl={item.videoUrl} index={index} />
      ))}
      {droppedItems.length < MAX_ITEMS && (
        <div className='dropZoneStyle' ref={drop}>Drop Here</div>
      )}
    </div>
  );
};

export default VideoContainer;
