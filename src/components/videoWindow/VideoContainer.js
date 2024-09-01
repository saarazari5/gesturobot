import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import './VideoContainer.css';
import LabelModal from './LabelModal';
import NameModal from './NameModal';
import { FcCheckmark } from "react-icons/fc";
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { Translations } from "../../language-management/Translations";
import { addGestureJson, editGesture } from '../../databases/gesturesAPI'; // Import necessary functions

// DropZone component to handle drag-and-drop functionality
const DropZone = ({ index, droppedItems, setDroppedItems, moveItem, handleRemoveItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'draggableItem',
    drop: (item, monitor) => {
      const { name, videoUrl } = item;
      setDroppedItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index] = { name, videoUrl, id: item.id };  // Ensure each item has an id
        return newItems.filter(item => item !== undefined); // Filter out undefined items
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
          id={droppedItems[index]?.id}
          name={droppedItems[index]?.name}
          videoUrl={droppedItems[index]?.videoUrl}
          index={index}
          moveItem={moveItem}
          handleRemoveItem={handleRemoveItem}
          droppedItems={droppedItems}
        />
      ) : ' '}
    </div>
  );
};

// Item component representing each draggable item
const Item = ({ id, name, videoUrl, index, moveItem, handleRemoveItem, droppedItems }) => {
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
    <div ref={ref} className={`frameStyle ${isDragging ? 'dragging' : ''}`} style={{ opacity }}>
      <div className="videoContainer">
        <video src={videoUrl} className="videoStyle" loading="lazy" preload="metadata" />
        <button onClick={() => handleRemoveItem(index)} className="buttonStyle">X</button>
        <div className="videoName">{name}</div>
      </div>
    </div>
  );
};

// Main VideoContainer component
const VideoContainer = ({ droppedItems, setDroppedItems, existingGestureId = null, userInfoת, initialName, initialLabel }) => {
  const MAX_ITEMS = 6;
  const [showModal, setShowModal] = useState(false);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [gestureLabel, setGestureLabel] = useState(initialLabel);
  const [gestureName, setGestureName] = useState(initialName);
  const [showNameModal, setShowNameModal] = useState(false);
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
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setShowLabelModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSaveLabel = (label) => {
    setGestureLabel(label);
    setShowLabelModal(false);
    setShowNameModal(true);
  };

  const handleSaveName = async (name) => {
    setGestureName(name);
    setShowNameModal(false);
    await handleFinalSave(name);
  };

  const handleFinalSave = async (name) => {
    const newGesture = {
      name: name,
      realLabel: [gestureLabel, gestureLabel],
      movements: droppedItems.filter(item => item !== undefined).map(item => item.id), // Mapping to movement ids
      // creator: [userInfo.name, parseInt(userInfo.type), userInfo.Taz], // Creator information
      creator: [null, null, null],
      labels: [],  // Placeholder, modify as needed
      group: 'default'  // Placeholder, modify as needed
    };

    console.log(newGesture);
    if (existingGestureId) {
      // Edit existing gesture with PUT request
      const response = await editGesture(existingGestureId, newGesture);  // Use await for async call
      console.log("Gesture updated successfully", response);
      alert('Gesture updated successfully');
    } else {
      // Add new gesture with POST request
      const newId = await addGestureJson(newGesture);  // Use await for async call
      console.log("New gesture added with ID:", newId);
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
              />
            ))}
          </div>
          {canSave && (
            <button className="savebtn btn" onClick={handleSaveClick}>
              <FiCheck />
              {/* <FcCheckmark /> */}
            </button>
          )}

          {showModal && (
            <ConfirmationModal
              message={translate("Are you sure you want to save?")}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}

          {/* Only show LabelModal if showLabelModal is true */}
          {showLabelModal && (
            <LabelModal
              onSaveLabel={handleSaveLabel}
              onCancel={() => setShowLabelModal(false)}
              initialLabel={gestureLabel} // Pass initialLabel prop
            />
          )}

          {showNameModal && (
            <NameModal
              onSaveName={handleSaveName}
              onCancel={() => setShowNameModal(false)}
              initialName={initialName} // Pass initialName prop
            />
          )}

        </div>
      )}
    </Translations>
  );
};

export default VideoContainer;
