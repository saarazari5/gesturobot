import React, { useState, useEffect } from "react";
import { BASE_URL } from '../params.js'

function getAllGestures() {
  return fetch(BASE_URL + "/gestures")
    .then((response) => response.json())
    .catch((error) => console.log("Error fetching gestures:", error));
}

function getGestureById(id) {
  return fetch(BASE_URL + '/gestures/' + id)
    .then((response) => response.json())
    .catch((error) => console.log("Error fetching gesture:", error));
}

function editGesture(id, updatedGesture) {
  return fetch(BASE_URL + '/gestures/' + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedGesture),
  })
    .then((response) => response.json())
    .catch((error) => console.log("Error editing gesture:", error));
}

function addGestureJson(newGesture) {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/gestures")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const maxId = data && data.length > 0 ? Math.max(...data.map((gesture) => parseInt(gesture.id, 10))) : 0;
        const nextId = maxId + 1;

        fetch(BASE_URL + "/gestures", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: String(nextId), ...newGesture }),
        })
          .then((response) => response.json())
          .then((data) => {
            resolve(nextId); // Resolve the next ID value
          })
          .catch((error) => reject(error));
      })
      .catch((error) => {
        console.log("Error fetching gestures:", error);
        reject(error);
      });
  });
}


function deleteGesture(id) {
  // send a DELETE request to delete the gesture with the given ID
  fetch(BASE_URL + '/gestures/' + id, {
    method: "DELETE",
  }).then(() => {
    // update the gestures state by removing the deleted gesture
    // setGestures(gestures.filter((gesture) => gesture.id !== id));
  });
}

export {
  addGestureJson,
  deleteGesture,
  getAllGestures,
  getGestureById,
  editGesture,
};
