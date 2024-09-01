import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import './VideoContainer.css'; // Import CSS file
import LabelModal from './LabelModal'; // Assuming LabelModal is in the same directory
import NameModal from './NameModal';
import { FcCheckmark } from "react-icons/fc";
import ConfirmationModal from './ConfirmationModal'; // Adjust path as per your project structure
import { FiCheck } from "react-icons/fi";
import { Translations } from "../../language-management/Translations";

const DropZone = ({ index, droppedItems, setDroppedItems, moveItem, handleRemoveItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'draggableItem',
    drop: (item, monitor) => {
      const { name, videoUrl } = item;
      setDroppedItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index] = { name, videoUrl };
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
          name={droppedItems[index]?.name} // Optional chaining
          videoUrl={droppedItems[index]?.videoUrl} // Optional chaining
          index={index}
          moveItem={moveItem}
          handleRemoveItem={handleRemoveItem}
          droppedItems={droppedItems}
        />
      ) : ' '}
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

const VideoContainer = ({ droppedItems, setDroppedItems }) => {
  const MAX_ITEMS = 6;
  const [showModal, setShowModal] = useState(false);
  const [showLabelModal, setShowLabelModal] = useState(false); // State for label modal
  const [gestureLabel, setGestureLabel] = useState(''); // State for gesture label
  const [gestureName, setGestureName] = useState(''); // State for gesture name
  const [showNameModal, setShowNameModal] = useState(false); // State for name modal

  const moveItem = (dragIndex, hoverIndex) => {
    const newItems = droppedItems.filter(item => item !== undefined); // Filter out undefined items
    const draggedItem = newItems.splice(dragIndex, 1)[0];
    newItems.splice(hoverIndex, 0, draggedItem);
    setDroppedItems(newItems);
  };

  const handleRemoveItem = (index) => {
    setDroppedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems.filter(item => item !== undefined); // Filter out undefined items
    });
  };

  const handleSaveClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setShowLabelModal(true); // Show label modal after confirmation
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSaveLabel = (label) => {
    setGestureLabel(label);
    setShowLabelModal(false);
    setShowNameModal(true); // Show name modal after saving the label
  };

  const handleSaveName = (name) => {
    setGestureName(name);
    setShowNameModal(false);
    // Now you have both label and name, implement your logic here
    alert(`Gesture labeled as: ${gestureLabel}, named as: ${name}`);
  };

  const canSave = droppedItems.some(item => item !== undefined); // Check if there is at least one non-undefined item

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
            />
          )}

          {showNameModal && (
            <NameModal
              onSaveName={handleSaveName}
              onCancel={() => setShowNameModal(false)}
            />
          )}

        </div>
      )}
    </Translations>
  );
};

export default VideoContainer;
