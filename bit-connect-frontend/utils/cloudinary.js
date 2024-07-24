import axios from 'axios';

// Function to upload image to Cloudinary
export const cloudinaryUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'bit-connect'); // Replace with your Cloudinary upload preset

  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/dusnzf3o5/image/upload', // Replace with your Cloudinary cloud name
    formData
  );

  return response.data;
};

// Function to delete image from Cloudinary
export const cloudinaryDelete = async (publicId) => {
    try {
        // Construct the URL for deleting an image by public ID
        console.log("deleting started")
        const deleteUrl = `https://api.cloudinary.com/v1_1/dusnzf3o5/image/destroy`;
    
        // Make a DELETE request to delete the image by public ID
        const deletionResponse = await axios.post(deleteUrl, {
          auth: {
            username: '668657336523546',
            password: 'V4WQR212VM0rJTbesd5kPh_kta8'
          },
          data: {
            public_id: publicId
          }
        });
    
        console.log(`Deleted image with public ID ${publicId}.`);
      } catch (error) {
        console.error('Error deleting image:', error.response ? error.response.data : error.message);
      }
};
