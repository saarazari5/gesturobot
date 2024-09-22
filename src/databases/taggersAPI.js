import { BASE_URL } from '../params.js';

async function addTaggerJson(newTagger) {
  console.log("new tagger is: " + JSON.stringify(newTagger));

  try {
    const response = await fetch(BASE_URL + "/taggers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newTagger }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
  } catch (error) {
    console.error("Error adding tagger:", error);
  }
}

export default addTaggerJson;
