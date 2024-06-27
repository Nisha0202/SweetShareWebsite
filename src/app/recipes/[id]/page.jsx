'use client';
import React, { useEffect, useState } from 'react';
import { SlLike } from "react-icons/sl";

const RecipeDetailPage = ({params}) => {
    const [recipes, setRecipes] = useState([]);
   
    const id = params.id; // Extract the ID 

    useEffect(() => {
        fetch('/recipes.json')
            .then((response) => response.json())
            .then((data) => setRecipes(data));
    }, []);

    const recipe = recipes.find((recipe) => recipe._id === id);
    if (!recipe) {
        return <div>Recipe not found</div>;
    }
    return (
        <div className='p-4 max-w-[1200px] mx-auto min-h-[calc(100vh-150px)] mt-8'>
            <div className='flex justify-between items-center mb-8'>
                <div className='text-text text-2xl font-bold'>{recipe.title}</div>
                <div className='text-sm  font-bold btn btn-sm'><SlLike /> {recipe.likes}</div>
            </div>

            <div className='flex flex-col-reverse lg:flex-row justify-between gap-8 lg:gap-16 items-start'>

                <div className='flex flex-col gap-4 mt-4'>
                    <div>
                        <p className='font-semibold text-xl text-text mb-2'>Description</p>
                        <p>{recipe.description}</p>
                    </div>

                    <h2 className='font-semibold text-xl text-text'>Ingredients:</h2>
                    <ul className='flex gap-3'>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={ingredient}>{index + 1}. {ingredient}</li>
                        ))}
                    </ul>
                    <h2 className='font-semibold text-xl text-text'>Steps:</h2>
                    <ol>
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{index + 1}. {step}</li>
                        ))}
                    </ol>

                </div>

                {/* image */}
                <div>
                    <img src={recipe.imageUrl} alt={recipe.title} className='w-80 lg:w-96 h-80 lg:h-96 rounded-md lg:mb-0' />
                </div>


            </div>

        </div>
    );
};

export default RecipeDetailPage;

