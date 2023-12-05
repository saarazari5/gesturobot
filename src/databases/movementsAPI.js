import {BASE_URL} from '../params.js'

export const getMovements = async () => {
  return fetch(BASE_URL + "/movements")
  .then((response) => response.json())
  .catch((error) => console.log("Error fetching gestures:", error));
};


