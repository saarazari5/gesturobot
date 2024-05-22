import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import './VideoContainer.css'; // Import CSS file

const DropZone = ({ index, droppedItems, setDroppedItems, moveItem, handleRemoveItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'draggableItem',
    drop: (item, monitor) => {
      const { name, videoUrl } = item;
      setDroppedItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index] = { name, videoUrl };
        return newItems;
      });
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className='dropZoneStyle'
      ref={drop}
      style={{ backgroundColor: isOver ? 'lightgray' : 'transparent' }}
    >
      {droppedItems[index] ? (
        <Item
          name={droppedItems[index].name}
          videoUrl={droppedItems[index].videoUrl}
          index={index}
          moveItem={moveItem}
          handleRemoveItem={handleRemoveItem}
          droppedItems={droppedItems}
        />
      ) : (
        `Frame ${index + 1}`
      )}
    </div>
  );
};

const Item = ({ name, videoUrl, index, moveItem, handleRemoveItem, droppedItems }) => {
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
        <video src={videoUrl} className="videoStyle" loading="lazy" preload="metadata" />
        <button onClick={() => handleRemoveItem(index)} className="buttonStyle">X</button>
        <div className="videoName">{name}</div>
      </div>
    </div>
  );
};

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

  return (
    <div className='videoContainerWrapper'>
      <div className='VideoContainer'>
        {[...Array(MAX_ITEMS)].map((_, index) => (
          <DropZone
            key={index}
            index={index}
            droppedItems={droppedItems}
            setDroppedItems={setDroppedItems}
            moveItem={moveItem}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </div>

    </div>
  );
};

export default VideoContainer;
