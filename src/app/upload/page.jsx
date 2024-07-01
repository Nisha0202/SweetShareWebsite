'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { confirmAlert } from 'react-confirm-alert';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [],
    steps: [],
    imageUrl: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const maxName = 40, maxDesc = 240;

  const [formError, setFormError] = useState(false); // State to track form completion
  const [isNextDisabled, setIsNextDisabled] = useState(true); // Disable button
  const [isUploadDisabled, setIsUploadDisabled] = useState(true);

  useEffect(() => {
    validateForm();
  }, [formData, currentStep]);

  const validateForm = () => {
    if (currentStep === 1) {
      setIsNextDisabled(!formData.name || !formData.description);
    } else if (currentStep === 2) {
      setIsNextDisabled(formData.ingredients.length === 0);
    } else if (currentStep === 3) {
      setIsNextDisabled(formData.steps.length === 0);
    } else if (currentStep === 4) {
      setIsUploadDisabled(files.length === 0);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setCurrentStep(currentStep + 1);
      setFormError(false); // Reset form error state
    } else {
      setFormError(true);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && value.length <= maxName) {
      setFormData({ ...formData, [name]: value });
      if (formError) setFormError(false);
    } else if (name === 'description' && value.length <= maxDesc) {
      setFormData({ ...formData, [name]: value });
      if (formError) setFormError(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles([...files, file]);

      // Read and display the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      uploadImageToImgBB(file);
      isUploadDisabled(true);
    }
  };

  const uploadImageToImgBB = (file) => {
    const uploadData = new FormData();
    uploadData.append('image', file);

    axios.post(`https://api.imgbb.com/1/upload?key=${process.env.VITE_IMGbb}`, uploadData)
      .then((response) => {
        const imageUrl = response.data.data.url;
        setFormData({ ...formData, imageUrl });
        setUploadedImage(imageUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddIngredientOrStep = (type) => {
    const options = {
      title: `Enter ${type}:`,
      message: '',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => { }
        },
        {
          label: 'Add',
          onClick: (value) => {
            if (value) {
              if (type === 'ingredient') {
                setFormData({ ...formData, ingredients: [...formData.ingredients, value] });
              } else if (type === 'step') {
                setFormData({ ...formData, steps: [...formData.steps, value] });
              }
            }
          }
        }
      ],
      customUI: ({ onClose }) => (
        <div style={{ width: '300px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h1>{options.title}</h1>
          <input
            type="text"
            className="border border-gray-300 p-2 focus:outline-none rounded-md focus:border-primary"
          />
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="mr-2 px-4 py-2 rounded-md border border-gray-300">Cancel</button>
            <button onClick={() => {
              const value = document.querySelector('input').value;
              options.buttons[1].onClick(value);
              onClose();
            }} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">Add</button>
          </div>
        </div>
      ),
      closeOnEscape: true,
      closeOnClickOutside: true,
      willUnmount: () => { }
    };

    confirmAlert(options);
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-240px)]">
      <div className="max-w-[1200px] mt-4">
        {currentStep === 1 && (
          <div className='card min-w-[310px] h-[360px] border-2 p-4 rounded-md'>
            <h3 className="text-lg font-bold mb-6">Step 1: Name and Description</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Recipe Name"
              className="input text-sm input-bordered w-full max-w-xs border rounded placeholder mb-2"
            />
            <p className="text-sm mb-4">{formData.name.length}/{maxName}</p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Recipe Description"
              className="textarea textarea-bordered textarea-md w-full max-w-xs border rounded-md placeholder mb-2"
              rows="3"
            ></textarea>
            <p className="text-sm mb-4">{formData.description.length}/{maxDesc}</p>
            <div className="flex mt-6 justify-between items-center absolute bottom-3 w-72">
              <Link href="/" className="text-primary font-medium">
                Cancel
              </Link>
              <button onClick={handleNext} className={`font-bold py-2 px-4 rounded ${isNextDisabled ? 'text-gray-400' : 'text-secondary hover:bg-accent'}`} disabled={isNextDisabled}>
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className='card min-w-[310px] h-[360px] border-2 p-4 rounded-md'>
            <h3 className="text-lg font-bold mb-2">Step 2: Ingredients</h3>
            <ul className="mb-4">
              {formData.ingredients.map((ingredient, index) => (
                <li key={index}>{index + 1}. {ingredient}</li>
              ))}
            </ul>
            <button onClick={() => handleAddIngredientOrStep('ingredient')} className="mb-4 btn btn-sm">
              Add Ingredient
            </button>
            <div className="flex justify-between absolute bottom-3 w-72 items-center">
              <button className='text-primary font-medium' onClick={handlePrevious}>Previous</button>
              <button onClick={handleNext} className={`font-bold py-2 px-4 rounded ${isNextDisabled ? 'text-gray-400' : 'text-secondary hover:bg-accent'}`} disabled={isNextDisabled}>
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className='card min-w-[310px] h-[360px] border-2 p-4 rounded-md'>
            <h3 className="text-lg font-bold mb-2">Step 3: Steps</h3>
            <ol className="mb-4">
              {formData.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <button onClick={() => handleAddIngredientOrStep('step')} className="mb-4 btn btn-sm">
              Add Step
            </button>
            <div className="flex justify-between absolute bottom-3 w-72 items-center">
              <button onClick={handlePrevious} className='text-primary font-medium'>Previous</button>
              <button onClick={handleNext} className={`font-bold py-2 px-4 rounded ${isNextDisabled ? 'text-gray-400' : 'hover:bg-accent'}`} disabled={isNextDisabled}>
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className='card min-w-[310px] h-[360px] border-2 p-4 rounded-md'>
            <div className="text-lg font-bold mb-2 block">Step 4: Upload Image</div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type='file'
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              accept='image/*'
            />
            {/* Image placeholder */}
            <div
              className='img-box w-56 h-48 border-2 mx-auto my-4 bg-transparent flex items-center justify-center rounded-md cursor-pointer'
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Image Preview" className="w-24 h-24 object-cover rounded-md" />
              ) : (
                <div className='flex place-content-center border-2'>
                      <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                </svg>
                </div>
            
              )}
            </div>

            <div className="flex justify-between absolute bottom-3 w-72 items-center">
              <button onClick={handlePrevious} className='text-primary font-medium'>Previous</button>
              <button
                className={`font-bold mr-2 py-2 px-4 rounded ${isUploadDisabled ? 'bg-gray-200' : 'hover:bg-accent bg-secondary'}`}
                disabled={isUploadDisabled}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeForm;
