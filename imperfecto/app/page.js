'use client'
import Image from "next/image";
import { useState } from "react";
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
export default function Home() {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setInputValue('');
    setSelectedImage(null);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Select Option</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedOption}
          label="Select Option"
          onChange={handleSelectChange}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="image">Image</MenuItem>
          <MenuItem value="url">URL</MenuItem>
        </Select>
      </FormControl>

      {selectedOption === 'text' && (
        <TextField
          fullWidth
          label="Give Text"
          multiline
          rows={6}
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          sx={{ marginTop: '1rem' }}
        />
      )}

      {selectedOption === 'image' && (
        <Box sx={{ marginTop: '1rem' }}>
          <Button
            variant="contained"
            component="label"
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>

          {selectedImage && (
            <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
              {`Selected file: ${selectedImage.name}`}
            </Typography>
          )}
        </Box>
      )}

      {selectedOption === 'url' && (
        <TextField
          fullWidth
          label="Enter URL"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          sx={{ marginTop: '1rem' }}
        />
      )}
    </Box>
  );
}
