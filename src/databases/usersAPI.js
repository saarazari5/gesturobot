import {BASE_URL} from '../params.js'

export const getUsers = async () => {
  return fetch(BASE_URL + "/users")
    .then((response) => response.json())
    .catch((error) => console.log("Error fetching gestures:", error));
};
