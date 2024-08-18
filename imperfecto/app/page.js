'use client';

import { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Box, Button, IconButton, TextField, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';

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

    function isUrl(string) {
      // Regular expression to match http and https URLs
      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // match http or https or no protocol
        '((([a-zA-Z0-9$-_@.&+!*\'(),]+)\\.)+[a-zA-Z]{2,})' + // match domain name
        '(\\/[^\\s]*)?$', // match the rest of the URL path
        'i' // case insensitive
      );

      return urlPattern.test(string);
    }
   
    

    if (isUrl(inputValue)) {
      
     
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
    else if (inputValue) {
      
      console.log(inputValue)
      console.log("inputvalue",typeof(inputValue))

     
      const response = await fetch('https://imperfecto-scrapper.vercel.app/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: inputValue}),
      });
      console.log("response", response)
      if (response.ok) {
        
        const result = await response.text();
       
        setResponseText(result || 'No response received');
      } else {
        
        setResponseText('Failed to fetch response');
        
      }
    }
    if (selectedImage ) {
      console.log(selectedImage)
      console.log("inputvalue",typeof(selectedImage))

     
      const response = await fetch('https://imperfecto-scrapper.vercel.app/images', {
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
        // backgroundColor: '#f5f5f5', // Light background for the entire page
        backgroundColor: 'black',
        padding: '2rem'
      }}
    >
       {/* Static Label at Top Left */}
      <Typography 
        variant="subtitle2" 
        sx={{ 
          position: 'fixed', // Fixed positioning to keep it static
          top: '1rem', 
          left: '1rem',
          color: 'white', // White color for visibility
          fontWeight: 'medium',
          fontFamily: 'sans-serif',
          zIndex: 1000, // Ensure it stays on top
        }}
      >
        &lt; imPerfect.ai &gt;
      </Typography>

      {/* Sign In and Sign Up Buttons */}
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem', display: 'flex', gap: '1rem' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#cc0000', // Matches the inner box background color
            color: '#313131', // Dark gray/black text color
            '&:hover': {
              backgroundColor: '#990000', // Slightly darker on hover
            }
          }}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#cc0000', // Matches the inner box background color
            color: '#313131', // Dark gray/black text color
            '&:hover': {
              backgroundColor: '#990000', // Slightly darker on hover
            }
          }}
        >
          Sign Up
        </Button>
      </Box>

      {/* Page Heading */}
      <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>
        <span style={{ color: 'white' }}>im</span>
        <span style={{ color: '#cc0000' }}>Perfect</span>
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
          backgroundColor: '#f3f3f3', // White background for the main box
          color: 'black' // Black text color
        }}
      >
        <FormControl fullWidth>
          <InputLabel 
            id="select-label"
            sx={{ 
              '&.Mui-focused': { 
                color: '#333333' // Change label color to darker gray when focused
              }
            }}
          >
            Select Option
          </InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={selectedOption}
            label="Select Option"
            onChange={handleSelectChange}
            sx={{ 
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ccc', // Initial border color (light gray)
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#333333' // Change border color to darker gray on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#333333' // Change border color to darker gray when focused
              }
            }}
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(); // Trigger handleSubmit on Enter key press
              }
            }}
            sx={{ 
              marginTop: '1rem',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#333333' // Change border color to darker gray on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#333333' // Change border color to darker gray when focused
                },
              },
              '& .MuiInputLabel-root': {
                '&:hover': {
                  color: '#333333' // Change label color to darker gray on hover
                },
                '&.Mui-focused': {
                  color: '#333333' // Change label color to darker gray when focused
                }
              }
            }}
          />
        )}

    
        {selectedOption === 'image' && (
          <Box 
            sx={{ 
              marginTop: '1rem', 
              width: '100%', 
              border: '1px solid #ccc', // Matching TextField border color
              borderRadius: '4px', // Optional: same border radius as TextField
              padding: '1rem', // Optional: padding inside the Box
              display: 'flex', // Flexbox layout
              justifyContent: 'center', // Center horizontally
              alignItems: 'center' // Center vertically
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && selectedImage) {
                handleSubmit(); // Trigger handleSubmit on Enter key press only if an image is uploaded
              }
            }}
            tabIndex={0} // Make the Box focusable to capture the Enter key event
          >
            <Button
              variant="contained"
              component="label"
              sx={{ 
                backgroundColor: '#555555', // Darker gray for button background
                color: 'white', // White text for contrast
                '&:hover': {
                  backgroundColor: '#333333', // Even darker gray for hover effect
                }
              }}
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(); // Trigger handleSubmit on Enter key press
              }
            }}
            sx={{ 
              marginTop: '1rem',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#333333' // Change border color to darker gray on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#333333' // Change border color to darker gray when focused
                },
              },
              '& .MuiInputLabel-root': {
                '&:hover': {
                  color: '#333333' // Change label color to darker gray on hover
                },
                '&.Mui-focused': {
                  color: '#333333' // Change label color to darker gray when focused
                }
              }
            }}
          />
        )}
    
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ 
            marginTop: '1rem',
            backgroundColor: '#cc0000', // Thicker, more intense red
            color: 'white', // Text color
            '&:hover': {
              backgroundColor: '#990000', // Darker shade of red for hover effect
            },
            display: 'block', // Ensure the button behaves like a block element
            marginLeft: 'auto', // Align to the right (initially)
            marginRight: 'auto', // Align to the left, effectively centering the button
          }}
        >
          Submit
        </Button>
        {responseText && (
          <Box 
            sx={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              position: 'relative', // Allows positioning of the icon
              backgroundColor: '#f3f3f3', // Same background as the inner box
            }}
          >
            <IconButton
              sx={{ color: '#666' }} // Dark grey color for the icons
              onClick={() => {
                // Handle "like" action here
              }}
            >
              <ThumbUpIcon />
            </IconButton>
            <IconButton
              sx={{ color: '#666' }} // Dark grey color for the icons
              onClick={() => {
                // Handle "dislike" action here
              }}
            >
              <ThumbDownIcon />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute', 
                top: '8px', 
                right: '8px', 
                color: '#666', // Dark grey color for the icon
              }}
              onClick={() => {
                // Create a Blob from the response text
                const blob = new Blob([responseText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);

                // Create a link element, set its href and download attributes, then click it programmatically
                const link = document.createElement('a');
                link.href = url;
                link.download = 'response.txt';
                link.click();

                // Clean up the URL object
                URL.revokeObjectURL(url);
              }}
            >
              <DownloadIcon />
            </IconButton>
            <Typography
              variant="body1"
              sx={{ color: '#333' }}
              dangerouslySetInnerHTML={{ __html: formatResponseText(responseText) }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}