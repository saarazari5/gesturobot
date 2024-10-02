import React, { useState, useRef, useEffect } from 'react';
// Import hooks from react-dnd for drag-and-drop functionality
import { useDrop, useDrag } from 'react-dnd';
import './VideoContainer.css';
// Import the UnifiedModal component
import UnifiedModal from './UnifiedModal';
import { useNavigate } from "react-router-dom";
// Import check icon from react-icons
import { FiCheck } from "react-icons/fi";
// Import Translations for localization support
import { Translations } from "../../language-management/Translations";
// Import API functions for gestures
import { addGestureJson, editGesture } from '../../databases/gesturesAPI';

/**
 * DropZone Component
 * 
 * This component represents a single drop zone where items (videos) can be dropped.
 * It uses the `useDrop` hook from react-dnd to accept draggable items.
 * 
 * Props:
 * - index: The index of the drop zone.
 * - droppedItems: Array of items that have been dropped.
 * - setDroppedItems: Function to update the dropped items array.
 * - moveItem: Function to move an item from one position to another.
 * - handleRemoveItem: Function to remove an item.
 * - currentPlayingIndex: Index of the currently playing video.
 * - handleClickItem: Function to handle click events on items.
 */
const DropZone = ({
  index,
  droppedItems,
  setDroppedItems,
  moveItem,
  handleRemoveItem,
  currentPlayingIndex,
  handleClickItem
}) => {
  // useDrop hook to make the component a drop target
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
          isActive={index === currentPlayingIndex && currentPlayingIndex !== -1}
          handleClickItem={handleClickItem}
        />
      ) : ' '}
    </div>
  );
};

/**
 * Item Component
 * 
 * This component represents a draggable item within a drop zone.
 * It can be reordered by dragging and dropping.
 * 
 * Props:
 * - id: Unique identifier of the item.
 * - name: Name of the video.
 * - videoUrl: URL of the video.
 * - index: Index of the item in the dropped items array.
 * - moveItem: Function to move the item to a new position.
 * - handleRemoveItem: Function to remove the item.
 * - droppedItems: Array of dropped items.
 * - isActive: Boolean indicating if the item is currently playing.
 * - handleClickItem: Function to handle click events on the item.
 */
const Item = ({
  id,
  name,
  videoUrl,
  index,
  moveItem,
  handleRemoveItem,
  droppedItems,
  isActive,
  handleClickItem
}) => {
  // useDrag hook to make the item draggable
  const [{ isDragging }, drag] = useDrag({
    type: 'draggableItem',
    item: { type: 'draggableItem', name, videoUrl, index, id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  // useDrop hook to allow the item to accept dropped items (for reordering)
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
      onClick={() => handleClickItem(index)}
    >
      <div className="videoContainer">
        <video src={videoUrl} className="videoStyle" loading="lazy" preload="metadata" />
        <button onClick={() => handleRemoveItem(index)} className="buttonStyle">X</button>
        <div className="videoName">{name}</div>
      </div>
    </div>
  );
};

/**
 * VideoContainer Component
 * 
 * This is the main container component that holds multiple drop zones for videos.
 * Users can drag and drop videos into these zones, reorder them, and save the collection as a gesture.
 * 
 * Props:
 * - droppedItems: Array of items that have been dropped into the container.
 * - setDroppedItems: Function to update the dropped items array.
 * - existingGestureId: (Optional) ID of an existing gesture to edit.
 * - userInfo: Information about the current user.
 * - initialName: Initial name of the gesture.
 * - initialLabel: Initial label of the gesture.
 * - currentPlayingIndex: Index of the currently playing video.
 * - setCurrentPlayingIndex: Function to update the current playing index.
 * - initialGroup: Initial group of the gesture.
 */
const VideoContainer = ({
  droppedItems,
  setDroppedItems,
  existingGestureId = null,
  userInfo,
  initialName,
  initialLabel,
  currentPlayingIndex,
  setCurrentPlayingIndex,
  initialGroup
}) => {
  const MAX_ITEMS = 6; // Maximum number of drop zones
  const [showUnifiedModal, setShowUnifiedModal] = useState(false);
  const [gestureLabel, setGestureLabel] = useState(initialLabel);
  const [gestureName, setGestureName] = useState(initialName);
  const [gestureGroup, setGestureGroup] = useState(initialGroup);
  const navigate = useNavigate();

  /**
   * Moves an item from one position to another in the droppedItems array.
   * @param {number} dragIndex - The index of the dragged item.
   * @param {number} hoverIndex - The index where the item is dropped.
   */
  const moveItem = (dragIndex, hoverIndex) => {
    const newItems = droppedItems.filter(item => item !== undefined);
    const draggedItem = newItems.splice(dragIndex, 1)[0];
    newItems.splice(hoverIndex, 0, draggedItem);
    setDroppedItems(newItems);
  };

  /**
   * Removes an item from the droppedItems array.
   * @param {number} index - The index of the item to remove.
   */
  const handleRemoveItem = (index) => {
    setDroppedItems(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems.filter(item => item !== undefined);
    });
  };

  /**
   * Handles the click event for the save button, showing the unified modal.
   */
  const handleSaveClick = () => {
    setShowUnifiedModal(true);
  };

  /**
   * Handles the save action from the unified modal.
   * @param {Object} param0 - Contains label, name, and group of the gesture.
   */
  const handleSave = async ({ label, name, group }) => {
    setGestureLabel(label);
    setGestureName(name);
    setGestureGroup(group);
    setShowUnifiedModal(false);
    await handleFinalSave(name, label, group);
  };

  /**
   * Performs the final save operation, either adding a new gesture or updating an existing one.
   * @param {string} name - Name of the gesture.
   * @param {string} label - Label of the gesture.
   * @param {string} group - Group of the gesture.
   */
  const handleFinalSave = async (name, label, group) => {
    const newGesture = {
      name: name,
      realLabel: [label, label],
      movements: droppedItems.filter(item => item !== undefined).map(item => item.id),
      creator: [null, null, null],
      labels: [],
      group: group,
      createdDate: new Date().toISOString(),
    };

    if (existingGestureId) {
      await editGesture(existingGestureId, newGesture);
      alert('Gesture updated successfully');
    } else {
      await addGestureJson(newGesture);
      alert('New gesture added successfully');
    }
    navigate("/GestureDisplay");
  };

  // Determines if the save button should be displayed
  const canSave = droppedItems.some(item => item !== undefined);

  /**
   * Handles the click event on an item to set it as the currently playing video.
   * @param {number} index - The index of the clicked item.
   */
  const handleClickItem = (index) => {
    setCurrentPlayingIndex(index);
  };

  return (
    <Translations>
      {({ translate }) => (
        <div className="videoContainerWrapper">
          <div className="VideoContainer">
            {/* Render the drop zones */}
            {[...Array(MAX_ITEMS)].map((_, index) => (
              <DropZone
                key={index}
                index={index}
                droppedItems={droppedItems}
                setDroppedItems={setDroppedItems}
                moveItem={moveItem}
                handleRemoveItem={handleRemoveItem}
                currentPlayingIndex={currentPlayingIndex}
                handleClickItem={handleClickItem}
              />
            ))}
          </div>
          {/* Display the save button if there are items to save */}
          {canSave && (
            <button className="savebtn" onClick={handleSaveClick}>
              <FiCheck className="fa-save" /> {/* Check icon */}
            </button>
          )}
          {/* Display the unified modal for saving gesture details */}
          {showUnifiedModal && (
            <UnifiedModal
              onSave={handleSave}
              onCancel={() => setShowUnifiedModal(false)}
              initialLabel={gestureLabel}
              initialName={gestureName}
              initialGroup={gestureGroup}
            />
          )}
        </div>
      )}
    </Translations>
  );
};

export default VideoContainer;
