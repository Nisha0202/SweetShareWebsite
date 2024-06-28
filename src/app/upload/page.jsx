"use client";
// RecipeForm.js

import { useState } from 'react';
import Link from 'next/link';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const RecipeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: [],
        steps: [],
        imageUrl: ''
    });
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [files, setFiles] = useState([]);
    const handleFileUpload = () => {
        confirmAlert({
          customUI: ({ onClose }) => (
            <div className='custom-ui'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-bold'>Select File</h2>
                <button className='text-gray-600' onClick={onClose}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
              <input
            
                type='file'
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFiles([...files, file]);
                  }
                  onClose();
                }}
              />
            </div>
          ),
        });
      };
    

      const handleAddIngredientOrStep = (type) => {
        const options = {
          title: `Enter ${type}:`,
          message: '',
          buttons: [
            {
              label: 'Cancel',
              onClick: () => {}
            },
            {
              label: 'Add',
              onClick: (value) => {
                if (value) {
                  if (type === 'ingredient') {
                    setFormData({ ...formData, ingredients: [...formData.ingredients, value] });
                  } else if (type === 'step') {
                    setFormData({ ...formData.steps, steps: [...formData.steps, value] });
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
          willUnmount: () => {}
        };
      
        confirmAlert(options);
      };
      




    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-240px)] ">
            <div className=" max-w-[1200px] p-4">
                <h2 className="text-2xl font-bold my-4 md:my-8 text-center text-text">Add Recipe</h2>
                {currentStep === 1 && (
                    <div className='card min-w-80 h-[360px] border-2 p-4 rounded-md'>
                        <h3 className="text-lg font-bold mb-6">Step 1: Name and Description</h3>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Recipe Name"
                            className="input text-sm input-bordered w-full max-w-xs border rounded placeholder mb-4"
                        />

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Recipe Description"
                            className="textarea textarea-bordered textarea-md w-full max-w-xs border rounded-md placeholder mb-4"
                            rows="4" maxLength={200}
                        ></textarea>
                        <div className="flex mt-6 justify-between items-center absolute bottom-3 w-72">
                            <Link href="/" className="text-primary font-medium">
                                Cancel
                            </Link>
                            <button onClick={handleNext} className="text-secondary font-bold py-2 px-4 rounded hover:bg-accent">
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className='card min-w-80 h-[360px]  border-2 p-4 rounded-md'>
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
                            <button onClick={handleNext} className="text-secondary font-bold py-2 px-4 rounded hover:bg-accent">
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className='card min-w-80 h-[360px]  border-2 p-4 rounded-md'>
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
                            <button onClick={handleNext} className="text-secondary font-bold py-2 px-4 rounded hover:bg-accent">
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className='card  min-w-80 h-[360px]  border-2 p-4 rounded-md'>
                        <div className="text-lg font-bold mb-2 block">Step 4: Upload Image</div>
                        {/* <input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="mb-4"
                        /> */}

                        {/* image */}
                        <div
        className='w-56 h-48 bg-gray-200 flex items-center justify-center rounded-md cursor-pointer absolute top-44 left-11 transform -translate-y-1/2'
        onClick={handleFileUpload}
      >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6 text-gray-600'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                                />
                            </svg>
                        </div>






                        <div className="flex justify-between absolute bottom-3 w-72 items-center">
                            <button onClick={handlePrevious} className='text-primary font-medium'>Previous</button>
                            <button className="bg-secondary font-bold py-2 px-4 rounded hover:bg-accent">
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

