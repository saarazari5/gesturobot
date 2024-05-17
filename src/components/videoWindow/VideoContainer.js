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

    const frameStyle = {
      border: '1px solid #ccc',
      padding: '8px',
      marginBottom: '10px',
      transition: 'all 0.3s',
      opacity,
    };

    const videoStyle = {
      width: '130px',
      height: '100px',
      marginBottom: '0px',
    };

    const nameStyle = {
      margin: '0',
      marginBottom: '5px',
    };

    const buttonStyle = {
      marginLeft: '5px',
    };

    const containerStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'margin 0.3s',
    };

    return (
      <div ref={ref} style={{ ...frameStyle, opacity, cursor: 'move' }}>
        <div style={{ marginBottom: '10px' }}>
          <video src={videoUrl} controls style={videoStyle} loading="lazy" preload="metadata" />
        </div>
        <div style={containerStyle}>
          <p style={nameStyle}>{name}</p>
          <button onClick={() => handleRemoveItem(index)} style={buttonStyle}>X</button>
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
    position: 'fixed',
    bottom: '50px',
    left: '45%',
    transform: 'translateX(-50%)',
    padding: '10px',
    backgroundColor: isOver ? 'lightgray' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 'calc(100% - 200px)',
    overflowX: 'auto',
    zIndex: 2,
    border: '2px solid black',
    borderRadius: '5px',
    marginLeft: '100px',
  };

  return (
    <div className='VideoContsiner' style={containerStyle}>
      {droppedItems.map((item, index) => (
        <Item key={index} name={item.name} videoUrl={item.videoUrl} index={index} />
      ))}
      {droppedItems.length < MAX_ITEMS && (
        <div className='drop-area' ref={drop} style={{ padding: '10px', cursor: 'pointer', minWidth: '150px', minHeight: '150px' }}>Drop Here</div>
      )}
    </div>
  );
};

export default VideoContainer;
