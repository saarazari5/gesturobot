import React, { useState, useEffect } from "react";
import { getAllGestures } from "../../databases/gesturesAPI"; // Adjust the import to your actual API service path
import * as XLSX from "xlsx";
import "./createNewExperiment.css"; // Ensure the CSS file is correctly linked

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const CreateNewExp = () => {
  const [gestures, setGestures] = useState([]);

  useEffect(() => {
    fetchGestures();
  }, []);

  const fetchGestures = async () => {
    try {
      const data = await getAllGestures();
      setGestures(data);
    } catch (error) {
      console.error("Error fetching gestures:", error);
    }
  };

  const handleExportToCSV = () => {
    if (gestures.length === 0) {
      alert("No gestures to export.");
      return;
    }

    const gestureRows = gestures.map((gesture) => [
      gesture.id,
      gesture.name,
      gesture.realLabel[0].replace('=', ''), // Remove "=" sign from label
      formatDate(gesture.createdDate),
      gesture.group || 'default',
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Id", "Name", "Label", "Creation Date", "Group"],
      ...gestureRows,
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gestures");

    XLSX.writeFile(workbook, "gestures_export.xlsx");
  };

  return (
    <div className="experiment">
      <button className="csv" onClick={handleExportToCSV}>Click here to export gestures to CSV</button>
    </div>
  );
};

export default CreateNewExp;
