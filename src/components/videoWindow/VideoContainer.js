import React, { useState, useRef, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import './VideoContainer.css';
import UnifiedModal from './UnifiedModal'; // Import the new UnifiedModal
import { FcCheckmark } from "react-icons/fc";
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { Translations } from "../../language-management/Translations";
import { addGestureJson, editGesture } from '../../databases/gesturesAPI';

const DropZone = ({ index, droppedItems, setDroppedItems, moveItem, handleRemoveItem, currentPlayingIndex, handleClickItem }) => {
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
          handleClickItem={handleClickItem} // Pass the click handler
        />
      ) : ' '}
    </div>
  );
};

const Item = ({ id, name, videoUrl, index, moveItem, handleRemoveItem, droppedItems, isActive, handleClickItem }) => {
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
    <div
      ref={ref}
      className={`frameStyle ${isActive ? 'activeVideo' : ''}`}
      style={{ opacity }}
      onClick={() => handleClickItem(index)} // Call the click handler on video click
    >
      <div className="videoContainer">
        <video src={videoUrl} className="videoStyle" loading="lazy" preload="metadata" />
        <button onClick={() => handleRemoveItem(index)} className="buttonStyle">X</button>
        <div className="videoName">{name}</div>
      </div>
    </div>
  );
};

const VideoContainer = ({ droppedItems, setDroppedItems, existingGestureId = null, userInfo, initialName, initialLabel, currentPlayingIndex, setCurrentPlayingIndex, initialGroup }) => {
  const MAX_ITEMS = 6;
  const [showUnifiedModal, setShowUnifiedModal] = useState(false);
  const [gestureLabel, setGestureLabel] = useState(initialLabel);
  const [gestureName, setGestureName] = useState(initialName);  // Set initialName as default
  const [gestureGroup, setGestureGroup] = useState(initialGroup);
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

  const handleSave = async ({ label, name, group }) => {
    setGestureLabel(label);
    setGestureName(name);
    setGestureGroup(group);
    setShowUnifiedModal(false);
    await handleFinalSave(name, label, group);
  };

  const handleFinalSave = async (name, label, group) => {
    const newGesture = {
      name: name,
      realLabel: [label, label],
      movements: droppedItems.filter(item => item !== undefined).map(item => item.id),
      creator: [null, null, null],
      labels: [],
      group: group,
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

  // Handle video click to change the current playing index
  const handleClickItem = (index) => {
    setCurrentPlayingIndex(index); // Change the current video to the clicked one
  };

  // Preload the next video when the current one is playing to optimize performance
  useEffect(() => {
    const preloadNextVideo = () => {
      if (currentPlayingIndex < droppedItems.length - 1) {
        const nextVideoUrl = droppedItems[currentPlayingIndex + 1]?.videoUrl;
        if (nextVideoUrl) {
          const videoPreload = document.createElement('link');
          videoPreload.rel = 'preload';
          videoPreload.as = 'video';
          videoPreload.href = nextVideoUrl;
          document.head.appendChild(videoPreload);
        }
      }
    };
    preloadNextVideo();
  }, [currentPlayingIndex, droppedItems]);

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
                handleClickItem={handleClickItem} // Pass the click handler to DropZone
              />
            ))}
          </div>
          {canSave && (
            <button className="savebtn" onClick={handleSaveClick}>
               <FiCheck className="fa-save" /> {/* Use the check icon */}
            </button>
          )}

          {showUnifiedModal && (
            <UnifiedModal
              onSave={handleSave}
              onCancel={() => setShowUnifiedModal(false)}
              initialLabel={gestureLabel}
              initialName={gestureName}  // Pre-fill the name with initialName
              initialGroup={gestureGroup}
            />
          )}
        </div>
      )}
    </Translations>
  );
};

export default VideoContainer;
