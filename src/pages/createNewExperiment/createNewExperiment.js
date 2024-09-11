import React, { useState, useEffect } from "react";
import { getAllGestures } from "../../databases/gesturesAPI"; // Adjust the import to your actual API service path
import * as XLSX from "xlsx";

// Function to format the date to DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const CreateNewExp = () => {
  const [gestures, setGestures] = useState([]);

  // Fetch the gestures data from the server when the component mounts
  useEffect(() => {
    fetchGestures();
  }, []);

  // Function to fetch all gestures
  const fetchGestures = async () => {
    try {
      const data = await getAllGestures();
      setGestures(data);
    } catch (error) {
      console.error("Error fetching gestures:", error);
    }
  };

  // Function to generate and download CSV file
  const handleExportToCSV = () => {
    if (gestures.length === 0) {
      alert("No gestures to export.");
      return;
    }

    // Map gestures data into an array of arrays for CSV export
    const gestureRows = gestures.map((gesture) => [
      gesture.id,
      gesture.name,
      gesture.realLabel[0],
      formatDate(gesture.createdDate),
      gesture.group || 'default', // Replace with actual parameters of your gesture object
      gesture.param2, // Add more parameters if necessary
    ]);

    // Create worksheet with headers and gesture data
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Id", "Name", "Label", "Creation Date", "Group"], // CSV headers
      ...gestureRows,
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gestures");

    // Trigger the CSV download
    XLSX.writeFile(workbook, "gestures_export.xlsx");
  };

  return (
    <div>
      <button onClick={handleExportToCSV}>Export Gestures to CSV</button>
      {/* Add other parts of your form here */}
    </div>
  );
};

export default CreateNewExp;
