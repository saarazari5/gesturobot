import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function FilterMenu({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        label="Category"
        onChange={handleChange}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FilterMenu;
