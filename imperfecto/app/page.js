'use client';

import { useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseText, setResponseText] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setInputValue('');
    setSelectedImage(null);
    setResponseText('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    if (inputValue || selectedImage) {
      console.log(inputValue)
      console.log("inputvalue",typeof(inputValue))

     
      const response = await fetch('https://imperfecto-scrapper.vercel.app/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: inputValue}),
      });
      console.log("response", response)
      if (response.ok) {
        
        const result = await response.text();
       
        setResponseText(result || 'No response received');
      } else {
        
        setResponseText('Failed to fetch response');
        
      }
    }
  };

  const formatResponseText = (text) => {
    return text.replace(/(\*\*[^*]+\*\*)/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br><br>');
  };
  return (
    <Box 
      sx={{ 
        width: '100%', // Full width of the viewport
        minHeight: '100vh', // Full height of the viewport
        display: 'flex', // Center content horizontally and vertically
        flexDirection: 'column', // Align items vertically
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f5f5f5', // Light background for the entire page
        padding: '2rem'
      }}
    >
      {/* Page Heading */}
      <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>
        <span style={{ color: 'black' }}>im</span>
        <span style={{ color: 'red' }}>Perfect</span>
      </Typography>
        
      {/* Page Description */}
      <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        ImPerfect.ai helps you refine your text content by providing AI-driven suggestions for improvement. <br />
        Simply select an option, submit your content, and receive tailored enhancements.
      </Typography>
  
      <Box 
        sx={{ 
          maxWidth: 900, 
          width: '100%', // Ensure the box is responsive
          margin: '0 auto', 
          padding: '2rem',
          border: '2px solid #ccc', // Light border color
          borderRadius: '8px', // Rounded corners for the box
          backgroundColor: 'white', // White background for the main box
          color: 'black' // Black text color
        }}
      >
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
              <Typography variant="body2" sx={{ marginTop: '0.5rem', color: '#666' }}>
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
    
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ marginTop: '1rem' }}
        >
          Submit
        </Button>
    
        {responseText && (
          <Typography
            variant="body1"
            sx={{ marginTop: '1rem', color: '#333' }}
            dangerouslySetInnerHTML={{ __html: formatResponseText(responseText) }}
          />
        )}
      </Box>
    </Box>
  );
}