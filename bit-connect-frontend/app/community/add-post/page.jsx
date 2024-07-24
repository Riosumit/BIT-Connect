'use client'
import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar/page';
import TitleComponent from '@/components/post-components/title_component/page';
import TextComponent from '@/components/post-components/text-component/page';
import ImageComponent from '@/components/post-components/image-component/page';
import TextWithImageComponent from '@/components/post-components/textwithimage-component/page';
import ArticleView from '@/components/article-view/page';
import { IoClose } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import axios from 'axios';

const AddPost = () => {
  const [components, setComponents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [introductionError, setIntroductionError] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  
    // Save components to session storage whenever they change
    useEffect(() => {
      if(components.length > 0){
        sessionStorage.setItem('components', JSON.stringify(components));
      }
    }, [components]);

  // Load components from session storage on component mount
  useEffect(() => {
    const savedComponents = sessionStorage.getItem('components', []);
    if (savedComponents != null) {
      setComponents(JSON.parse(savedComponents));
    }
  }, []);

  const addComponent = (componentType) => {
    let data = {};
    switch (componentType) {
      case 'TitleComponent':
        data = {
          text: 'Title',
          configuration: {
            fontSize: '24',
            color: '#000',
            fontStyle: 'bold'
          }
        };
        break;
      case 'TextComponent':
        data = {
          text: 'Text content...',
          configuration: {
            fontSize: '16',
            color: '#333',
            fontStyle: 'normal'
          }
        };
        break;
      case 'ImageComponent':
        data = {
          image: 'https://via.placeholder.com/150'
        };
        break;
      case 'TextWithImageComponent':
        data = {
          text: 'Text content...',
          image: 'https://via.placeholder.com/150',
          configuration: {
            fontSize: '18',
            color: '#666',
            fontStyle: 'italic',
            imagePosition: 'left' // or 'right'
          }
        };
        break;
      default:
        break;
    }
    const key = components.length + 1;
    setComponents([...components, { id: key, type: componentType, data }]);
    closeModal();
  };

  const moveComponentUp = (id) => {
    const index = components.findIndex((component) => component.id === id);
    if (index > 0) {
      const updatedComponents = [...components];
      const temp = updatedComponents[index];
      updatedComponents[index] = updatedComponents[index - 1];
      updatedComponents[index - 1] = temp;
      setComponents(updatedComponents);
    }
  };

  const moveComponentDown = (id) => {
    const index = components.findIndex((component) => component.id === id);
    if (index < components.length - 1) {
      const updatedComponents = [...components];
      const temp = updatedComponents[index];
      updatedComponents[index] = updatedComponents[index + 1];
      updatedComponents[index + 1] = temp;
      setComponents(updatedComponents);
    }
  };

  const removeComponent = (key) => {
    if (key === editingId) {
      handleCloseEditor();
    }
    const updatedComponents = components.filter((item) => item.id !== key);
    setComponents(updatedComponents);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComponent(null);
  };

  const handleComponentClick = (id) => {
    setEditingId(id);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const updatedComponents = components.map((component) => {
      if (component.id === id) {
        return { ...component, data: { ...component.data, [name]: value } };
      }
      return component;
    });
    setComponents(updatedComponents);
  };

  const handleConfigInputChange = (e, id) => {
    const { name, value } = e.target;
  const updatedComponents = components.map((component) => {
    if (component.id === id) {
      return {
        ...component,
        data: {
          ...component.data,
          configuration: {
            ...component.data.configuration,
            [name]: value
          }
        }
      };
    }
    return component;
  });
  setComponents(updatedComponents);
  };

  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedComponents = components.map((component) => {
          if (component.id === id) {
            return { ...component, data: { ...component.data, image: reader.result } };
          }
          return component;
        });
        setComponents(updatedComponents);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseEditor = () => {
    setEditingId(null);
  };

  const renderEditorForm = () => {
    if (editingId === null) return null;
    
    const component = components.find((component) => component.id === editingId);
    if (!component) return null;
  
    const { type, data } = component;
  
    switch (type) {
      case 'TitleComponent':
        return (
          <div>
            <form>
              <label htmlFor="title" className='font-bold'>Title</label>
              <input
                type="text"
                id="title"
                name="text"
                value={data.text}
                onChange={(e) => handleInputChange(e, editingId)}
                className="border p-2 w-full"
              />
              <label htmlFor="fontSize" className='font-bold mt-2'>Font Size</label>
              <input
                type="number"
                id="fontSize"
                name="fontSize"
                value={data.configuration.fontSize}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              />
              <label htmlFor="color" className='font-bold mt-2'>Color</label>
              <input
                type="color"
                id="color"
                name="color"
                value={data.configuration.color}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              />
              <label htmlFor="fontStyle" className='font-bold mt-2'>Font Style</label>
              <select
                id="fontStyle"
                name="fontStyle"
                value={data.configuration.fontStyle}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="italic">Italic</option>
              </select>
            </form>
          </div>
        );
      case 'TextComponent':
        return (
          <div>
            <form>
              <label htmlFor="text" className='font-bold'>Text</label>
              <textarea
                id="text"
                name="text"
                value={data.text}
                onChange={(e) => handleInputChange(e, editingId)}
                className="border p-2 w-full h-32"
              ></textarea>
              <label htmlFor="fontSize" className='font-bold mt-2'>Font Size</label>
              <input
                type="number"
                id="fontSize"
                name="fontSize"
                value={data.configuration.fontSize}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              />
              <label htmlFor="color" className='font-bold mt-2'>Color</label>
              <input
                type="color"
                id="color"
                name="color"
                value={data.configuration.color}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              />
              <label htmlFor="fontStyle" className='font-bold mt-2'>Font Style</label>
              <select
                id="fontStyle"
                name="fontStyle"
                value={data.configuration.fontStyle}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="italic">Italic</option>
              </select>
            </form>
          </div>
        );
      case 'ImageComponent':
        return (
          <div>
            <form>
              <label htmlFor="image" className='font-bold'>Image</label>
              <input
                type="file"
                id="image"
                onChange={(e) => handleImageChange(e, editingId)}
                className="border p-2 w-full"
              />
              {data.image && <img src={data.image} alt="Selected" className="mt-2" />}
            </form>
          </div>
        );
      case 'TextWithImageComponent':
        return (
          <div>
            <form>
              <label htmlFor="text" className='font-bold'>Text</label>
              <textarea
                id="text"
                name="text"
                value={data.text}
                onChange={(e) => handleInputChange(e, editingId)}
                className="border p-2 w-full h-32"
              ></textarea>
              <label htmlFor="image" className='font-bold mt-2'>Image</label>
              <input
                type="file"
                id="image"
                onChange={(e) => handleImageChange(e, editingId)}
                className="border p-2 w-full"
              />
              {data.image && <img src={data.image} alt="Selected" className="mt-2" />}
              <label htmlFor="fontSize" className='font-bold mt-2'>Font Size</label>
              <input
                type="number"
                id="fontSize"
                name="fontSize"
                value={data.configuration.fontSize}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              />
              <label htmlFor="color" className='font-bold mt-2'>Color</label>
              <input
                type="color"
                id="color"
                name="color"
                value={data.configuration.color}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              />
              <label htmlFor="fontStyle" className='font-bold mt-2'>Font Style</label>
              <select
                id="fontStyle"
                name="fontStyle"
                value={data.configuration.fontStyle}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="italic">Italic</option>
              </select>
              <label htmlFor="imagePosition" className='font-bold mt-2'>Image Position</label>
              <select
                id="imagePosition"
                name="imagePosition"
                value={data.configuration.imagePosition}
                onChange={(e) => handleConfigInputChange(e, editingId)}
                className="border p-2 w-full"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmitPost = async () => {
    // Validate introduction length
    if (introduction.length < 500 || introduction.length > 700) {
      setIntroductionError('Introduction must be between 500 to 700 characters');
      return;
    } else {
      setIntroductionError('');
    }

    // Function to upload images to Cloudinary
    const uploadImages = async () => {
      const promises = components.map(async (component) => {
        if (component.type === 'ImageComponent' || component.type === 'TextWithImageComponent') {
          const formData = new FormData();
          formData.append('file', component.data.image);
          formData.append('upload_preset', 'bit-connect');

          const response = await fetch('https://api.cloudinary.com/v1_1/dusnzf3o5/image/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            return data.secure_url; // Return the secure URL of the uploaded image
          } else {
            throw new Error('Failed to upload image to Cloudinary');
          }
        } else {
          return null; // Return null for components other than ImageComponent and TextWithImageComponent
        }
      });

      return await Promise.all(promises);
    };

    // Upload images and replace local URLs with Cloudinary URLs
    const imageUrls = await uploadImages();
    const updatedComponents = components.map((component, index) => {
      if (component.type === 'ImageComponent' || component.type === 'TextWithImageComponent') {
        return {
          ...component,
          data: {
            ...component.data,
            image: imageUrls[index],
          },
        };
      } else {
        return component;
      }
    });

    // Upload main image if it exists
    let mainImageUrl = null;
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'bit-connect');

      const response = await fetch('https://api.cloudinary.com/v1_1/dusnzf3o5/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        mainImageUrl = data.secure_url;
      } else {
        console.error('Failed to upload main image to Cloudinary');
        return;
      }
    }

    // Prepare post data
    const postData = {
      title: title,
      introduction: introduction,
      image: mainImageUrl,
      post_data: updatedComponents,
      tags: tags,
    };
    console.log(postData)

    try {
      const token = sessionStorage.getItem("token");;
      const response = await axios.post(`${process.env.API_HOST}/community/my-articles/`, postData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log('Post submitted successfully:', response.data);
      setShowSubmitForm(false);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="bg-white h-screen overflow-y-hidden">
      <Navbar location={"community"} />
      <main className="container mx-auto px-4 py-8 h-full">
        <header className="text-center mb-2">
          <h1 className="text-4xl text-gray-600 font-bold">Add Community Post</h1>
        </header>

        <section className="flex h-full">
          <div className="flex-1 space-y-8 overflow-y-scroll h-4/5">
            <div className="absolute top-20 right-20">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mr-4"
                onClick={() => setShowPreview(true)}
              >
                Preview
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                onClick={() => { setShowSubmitForm(true) }}>
                Post
              </button>
            </div>
            <div className="flex flex-col">
              {showSubmitForm && (
                <div className="flex justify-center items-center absolute top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50">
                  <div className="bg-white p-6 rounded shadow-md w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Post Article</h2>
                    <div className="mb-4">
                      <label htmlFor="title" className="font-bold">Title</label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        placeholder='Enter the title of the post'
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="image" className="font-bold">Image</label>
                      <input
                        type="file"
                        id="title"
                        onChange={(e) => handleSetImage(e)}
                        className="border p-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="introduction" className="font-bold">
                        Introduction (Length:
                        <span className={(introduction.length < 500 || introduction.length > 700) ? "text-red-500" : "text-green-500"}> {introduction.length} </span>
                        )
                      </label>
                      <textarea
                        id="introduction"
                        value={introduction}
                        placeholder='This will be visible in the community posts list (500 - 700 characters)'
                        onChange={(e) => setIntroduction(e.target.value)}
                        className="border p-2 w-full h-32"
                      />
                      {introductionError && <p className="text-red-500">{introductionError}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="tags" className="font-bold">Tags</label>
                      <div className="flex">
                        <input
                          type="text"
                          id="tags"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          className="border p-2 w-full"
                          placeholder="Add a tag"
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 ml-2 rounded"
                        >
                          Add Tag
                        </button>
                      </div>
                      <div className="mt-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                      onClick={handleSubmitPost}
                    >
                      Submit
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded ml-2"
                      onClick={() => setShowSubmitForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {components.map(({ id, type, data }) => (
                <div key={id} className="border rounded mb-4">
                  <nav className='border-b p-2 flex justify-end items-center'>
                    <FaArrowUp onClick={() => moveComponentUp(id)} className="hover:bg-red-6002 ml-2 mr-2 cursor-pointer hover:text-blue-500" title='Move Up' />
                    <FaArrowDown onClick={() => moveComponentDown(id)} className="hover:bg-red-6002 ml-2 mr-2 cursor-pointer hover:text-blue-500" title='Move Down' />
                    <FaTrashCan onClick={() => removeComponent(id)} className="hover:bg-red-6002 ml-2 mr-2 cursor-pointer hover:text-red-500" title='remove' />
                  </nav>
                  <div onClick={() => handleComponentClick(id)} className='cursor-pointer'>
                    {type === 'TitleComponent' && <TitleComponent data={data} />}
                    {type === 'TextComponent' && <TextComponent data={data} />}
                    {type === 'ImageComponent' && <ImageComponent data={data} />}
                    {type === 'TextWithImageComponent' && <TextWithImageComponent data={data} />}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mx-auto"
              onClick={() => setShowModal(true)}
            >
              Add Component
            </button>

            {showPreview && (
              <div className="h-screen w-full fixed bottom-0 left-0  z-50 p-7 bg-gray-800 bg-opacity-50">
                <div className="w-3/4 mx-auto h-full overflow-y-scroll bg-white relative">
                  <ArticleView components={components} />
                  <IoClose className="absolute top-5 right-5 text-gray-600 text-3xl cursor-pointer" onClick={() => setShowPreview(false)} />
                </div>
              </div>
            )}
          </div>
          {
            editingId && (
              <div className="w-1/4 pl-8">
                <div className="flex align-center justify-end">
                  <IoClose onClick={handleCloseEditor} className="hover:text-red-500 text-3xl cursor-pointer" />
                </div>
                <div className="overflow-y-scroll h-5/6">
                  {renderEditorForm()}
                </div>
              </div>
            )
          }
        </section>
        {showModal && (
          <div className="fixed mt-0 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md">
              <h2 className="text-lg font-bold mb-4">Select Component to Add</h2>
              <div className="flex flex-wrap">
                <button
                  className={`hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-4 mb-4 ${selectedComponent === 'TitleComponent' ? 'bg-gray-300' : 'bg-gray-200'}`}
                  onClick={() => setSelectedComponent('TitleComponent')}
                >
                  Title
                </button>
                <button
                  className={`hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-4 mb-4 ${selectedComponent === 'TextComponent' ? 'bg-gray-300' : 'bg-gray-200'}`}
                  onClick={() => setSelectedComponent('TextComponent')}
                >
                  Text
                </button>
                <button
                  className={`hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-4 mb-4 ${selectedComponent === 'ImageComponent' ? 'bg-gray-300' : 'bg-gray-200'}`}
                  onClick={() => setSelectedComponent('ImageComponent')}
                >
                  Image
                </button>
                <button
                  className={`hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-4 mb-4 ${selectedComponent === 'TextWithImageComponent' ? 'bg-gray-300' : 'bg-gray-200'}`}
                  onClick={() => setSelectedComponent('TextWithImageComponent')}
                >
                  Text with Image
                </button>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-4"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => addComponent(selectedComponent)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddPost;
