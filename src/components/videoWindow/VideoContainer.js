import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import './VideoContainer.css';
import UnifiedModal from './UnifiedModal'; // Import the new UnifiedModal
import { FcCheckmark } from "react-icons/fc";
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { Translations } from "../../language-management/Translations";
import { addGestureJson, editGesture } from '../../databases/gesturesAPI';

const DropZone = ({ index, droppedItems, setDroppedItems, moveItem, handleRemoveItem, currentPlayingIndex }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'draggableItem',
    drop: (item, monitor) => {
      const { name, videoUrl } = item;
      setDroppedItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index] = { name, videoUrl, id: item.id };
        return newItems.filter(item => item !== undefined);
      });
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className="dropZoneStyle"
      ref={drop}
      style={{ backgroundColor: isOver ? 'lightgray' : 'transparent' }}
    >
      {droppedItems[index] ? (
        <Item
          id={droppedItems[index]?.id}
          name={droppedItems[index]?.name}
          videoUrl={droppedItems[index]?.videoUrl}
          index={index}
          moveItem={moveItem}
          handleRemoveItem={handleRemoveItem}
          droppedItems={droppedItems}
          isActive={index === currentPlayingIndex && currentPlayingIndex !== -1} // Pass isActive prop
        />
      ) : ' '}
    </div>
  );
};

const Item = ({ id, name, videoUrl, index, moveItem, handleRemoveItem, droppedItems, isActive }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'draggableItem',
    item: { type: 'draggableItem', name, videoUrl, index, id },
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
      if (dragIndex < droppedItems.length && droppedItems[dragIndex]) {
        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const ref = useRef(null);
  drag(drop(ref));

  return (
    <div ref={ref} className={`frameStyle ${isActive ? 'activeVideo' : ''}`} style={{ opacity }}>
      <div className="videoContainer">
        <video src={videoUrl} className="videoStyle" loading="lazy" preload="metadata" />
        <button onClick={() => handleRemoveItem(index)} className="buttonStyle">X</button>
        <div className="videoName">{name}</div>
      </div>
    </div>
  );
};

const VideoContainer = ({ droppedItems, setDroppedItems, existingGestureId = null, userInfo, initialName, initialLabel, currentPlayingIndex }) => {
  const MAX_ITEMS = 6;
  const [showUnifiedModal, setShowUnifiedModal] = useState(false);
  const [gestureLabel, setGestureLabel] = useState(initialLabel);
  const [gestureName, setGestureName] = useState(initialName);  // Set initialName as default
  let navigate = useNavigate();

  const moveItem = (dragIndex, hoverIndex) => {
    const newItems = droppedItems.filter(item => item !== undefined);
    const draggedItem = newItems.splice(dragIndex, 1)[0];
    newItems.splice(hoverIndex, 0, draggedItem);
    setDroppedItems(newItems);
  };

  const handleRemoveItem = (index) => {
    setDroppedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems.filter(item => item !== undefined);
    });
  };

  const handleSaveClick = () => {
    setShowUnifiedModal(true); // Show the unified modal instead of separate ones
  };

  const handleSave = async ({ label, name }) => {
    setGestureLabel(label);
    setGestureName(name);
    setShowUnifiedModal(false);
    await handleFinalSave(name, label);
  };

  const handleFinalSave = async (name, label) => {
    const newGesture = {
      name: name,
      realLabel: [label, label],
      movements: droppedItems.filter(item => item !== undefined).map(item => item.id),
      creator: [null, null, null],
      labels: [],
      group: 'default',
      createdDate: new Date().toISOString(), // Add the creation date here
    };

    if (existingGestureId) {
      const response = await editGesture(existingGestureId, newGesture);
      alert('Gesture updated successfully');
    } else {
      const newId = await addGestureJson(newGesture);
      alert('New gesture added successfully');
    }
    navigate("/GestureDisplay");
  };

  const canSave = droppedItems.some(item => item !== undefined);

  return (
    <Translations>
      {({ translate }) => (
        <div className="videoContainerWrapper">
          <div className="VideoContainer">
            {[...Array(MAX_ITEMS)].map((_, index) => (
              <DropZone
                key={index}
                index={index}
                droppedItems={droppedItems}
                setDroppedItems={setDroppedItems}
                moveItem={moveItem}
                handleRemoveItem={handleRemoveItem}
                currentPlayingIndex={currentPlayingIndex}
              />
            ))}
          </div>
          {canSave && (
            <button className="savebtn btn" onClick={handleSaveClick}>
              <FiCheck />
            </button>
          )}

          {showUnifiedModal && (
            <UnifiedModal
              onSave={handleSave}
              onCancel={() => setShowUnifiedModal(false)}
              initialLabel={gestureLabel}
              initialName={gestureName}  // Pre-fill the name with initialName
            />
          )}
        </div>
      )}
    </Translations>
  );
};

export default VideoContainer;
