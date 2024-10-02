import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getAllGestures } from "../../databases/gesturesAPI"; // Adjust the import to your actual API service path
import config from '../../config/config.json'; // Assuming your config is in this path
import * as XLSX from "xlsx";
import { Translations } from "../../language-management/Translations"; // Import Translations context
import "./exportGestures.css"; // Ensure the CSS file is correctly linked

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const ExportGestures = () => {
  const [gestures, setGestures] = useState([]);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllGestures();
        console.log("Fetched Data:", data);
        setGestures(data);
      } catch (error) {
        console.error("Error fetching gestures:", error);
      }
    };

    fetchData();
  }, []);

  const handleExportToCSV = () => {
    // Filter gestures based on selected filters
    let filteredGestures = gestures;

    // Filter by emotions
    if (selectedEmotions.length > 0) {
      filteredGestures = filteredGestures.filter(gesture =>
        selectedEmotions.some(emotion => gesture.realLabel[0] && gesture.realLabel[0] === emotion.value)
      );
    }

    // Filter by groups
    if (selectedGroups.length > 0) {
      filteredGestures = filteredGestures.filter(gesture =>
        selectedGroups.some(group => gesture.group && gesture.group === group.value)
      );
    }

    // Filter by subjects
    if (selectedSubjects.length > 0) {
      filteredGestures = filteredGestures.filter(gesture =>
        selectedSubjects.some(subject => gesture.name && gesture.name === subject.value)
      );
    }

    // Filter by date
    if (dateFilter) {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'three_months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'six_months':
          filterDate.setMonth(now.getMonth() - 6);
          break;
        default:
          break;
      }

      filteredGestures = filteredGestures.filter(gesture =>
        new Date(gesture.createdDate) >= filterDate
      );
    }

    console.log("Filtered Gestures:", filteredGestures);

    if (filteredGestures.length === 0) {
      alert("No gestures to export based on selected filters.");
      return;
    }

    const gestureRows = filteredGestures.map((gesture) => [
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

  const dateOptions = [
    { value: 'week', label: 'Recent Week' },
    { value: 'month', label: 'Recent Month' },
    { value: 'three_months', label: 'Recent 3 Months' },
    { value: 'six_months', label: 'Recent 6 Months' }
  ];

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 1000,
    }),
    control: (provided) => ({
      ...provided,
      border: '1px solid #ccc',
    }),
  };

  return (
    <Translations>
      {({ translate }) => (
        <div className="experiment-container">
          <h3 className="head">{translate("Filter and Export Gestures")}</h3>
          <div className="filters">
            {/* Emotions Multi-select */}
            <div className="filter">
              <label className="filter-name">{translate("Emotions:")}</label>
              <Select
                isMulti
                options={config.emotions.map(emotion => ({ value: emotion, label: translate(emotion) }))}
                onChange={setSelectedEmotions}
                classNamePrefix="react-select"
                styles={customStyles}
                placeholder={translate("Select emotions...")}
              />
            </div>

            {/* Groups Multi-select */}
            <div className="filter">
              <label className="filter-name">{translate("Groups:")}</label>
              <Select
                isMulti
                options={config.groups.map(group => ({ value: group, label: translate(group) }))}
                onChange={setSelectedGroups}
                classNamePrefix="react-select"
                styles={customStyles}
                placeholder={translate("Select groups...")}
              />
            </div>

            {/* Subjects Multi-select */}
            <div className="filter">
              <label className="filter-name">{translate("Subjects:")}</label>
              <Select
                isMulti
                options={config.subjects.map(subject => ({ value: subject, label: translate(subject) }))}
                onChange={setSelectedSubjects}
                classNamePrefix="react-select"
                styles={customStyles}
                placeholder={translate("Select subjects...")}
              />
            </div>

            {/* Date Filter */}
            <div className="filter">
              <label className="filter-name">{translate("Date Range:")}</label>
              <Select
                options={dateOptions.map(option => ({ ...option, label: translate(option.label) }))}
                onChange={(selected) => setDateFilter(selected?.value || '')}
                classNamePrefix="react-select"
                styles={customStyles}
                placeholder={translate("Select date range...")}
              />
            </div>
          </div>

          <button className="csv" onClick={handleExportToCSV}>
            {translate("Export Gestures to CSV")}
          </button>
        </div>
      )}
    </Translations>
  );
};

export default ExportGestures;
