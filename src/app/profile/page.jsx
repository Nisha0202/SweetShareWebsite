"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [user, setUser] = useState({ username: 'JohnDoe', email: 'john@example.com' });
  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish' },
    { id: 2, title: 'Chicken Tikka Masala', description: 'A popular Indian curry' },
    // Add more recipes as needed
  ]);

  useEffect(() => {
    // Fetch user data and recipes from the API and set the state
    // Example:
    // fetchUserData().then(data => setUser(data));
    // fetchUserRecipes().then(data => setRecipes(data));
  }, []);

  return (
    <div className="flex flex-col items-center p-4 min-h-[calc(100vh-240px)]">
      <div className="w-full max-w-[1200px] p-6 rounded-md border-2">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="text-lg font-medium mb-2">Username: {user.username}</div>
          <div className="text-lg font-medium mb-2">Email: {user.email}</div>
          <Link href="/edit-profile text-primary font-bold">
           Edit Profile
          </Link>
        </div>
        <div className="w-full">
          <h3 className="text-xl font-bold mb-4">Your Recipes</h3>
          <div className="flex flex-wrap gap-4">
            {recipes.map(recipe => (
              <div key={recipe.id} className="p-4 border rounded-md">
                <h4 className="text-lg font-bold">{recipe.title}</h4>
                <p className="text-text mb-2">{recipe.description}</p>
                <Link href={`/recipes/${recipe.id}`} className='text-primary font-bold'>
                View Recipe
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
