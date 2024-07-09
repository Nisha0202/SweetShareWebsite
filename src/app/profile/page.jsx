 "use client";
import { useAppContext } from '@/context';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export default function Profile() {
  // const [user, setUser] = useState(null); // Initialize user as null
  const { user, setUser, loading, setLoading } = useAppContext();
  // const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.DOMAIN}/api/currentprofile1`);
        setUser(res.data.data); // Assuming res.data contains the user object
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };
    fetchData();
  }, [user]); //this effect runs once on mount


  return (
    <div className="flex flex-col items-center p-4 min-h-[calc(100vh-240px)]">
      <div className="w-full max-w-[1200px] p-6 rounded-md border-2">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        {user && (
          <div className="flex flex-col items-center mb-6">
            <div className="text-lg font-medium mb-2">Username: {user.username}</div>
            <div className="text-lg font-medium mb-2">Email: {user.email}</div>
            <button className="text-primary ">Edit Profile
            </button>
          </div>
        )}
        {/* Uncomment the following block if you want to display recipes */}
        {/* <div className="w-full">
          <h3 className="text-xl font-bold mb-4">Your Recipes</h3>
          <div className="flex flex-wrap gap-4">
            {recipes.map(recipe => (
              <div key={recipe.id} className="p-4 border rounded-md">
                <h4 className="text-lg font-bold">{recipe.title}</h4>
                <p className="text-text mb-2">{recipe.description}</p>
                <Link href={`/recipes/${recipe.id}`} className='text-primary font-bold'>
                  <a>View Recipe</a>
                </Link>
              </div>
            ))}
          </div>
        </div> */}
              {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-auto ">
          <div className="loading loading-md text-black"></div>
        </div>
      )}
      </div>
    </div>
  );
}




// "use client";
// import axios from 'axios';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// export default function Profile() {
//   const [user, setUser] = useState({});
//   const [recipes, setRecipes] = useState([
//     { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish' },
//     { id: 2, title: 'Chicken Tikka Masala', description: 'A popular Indian curry' },
//     // Add more recipes as needed
//   ]);



//   useEffect(async () => {
//     try {
//       const res = await axios.get('/api/currentprofile');
//       console.log(res.data);
//       setUser(res.data.data._id);
//     } catch (error) {
//       console.error('Error fetching user details:', error.message);
   
//     }
//   }, [user]);

//   return (
//     <div className="flex flex-col items-center p-4 min-h-[calc(100vh-240px)]">
//       <div className="w-full max-w-[1200px] p-6 rounded-md border-2">
//         <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
//         <div className="flex flex-col items-center mb-6">
//           <div className="text-lg font-medium mb-2">Username: {user.username}</div>
//           <div className="text-lg font-medium mb-2">Email: {user.email}</div>
//           <Link href="/edit-profile" className='text-primary font-bold'>
//            Edit Profile
//           </Link>
//         </div>
//         {/* <div className="w-full">
//           <h3 className="text-xl font-bold mb-4">Your Recipes</h3>
//           <div className="flex flex-wrap gap-4">
//             {recipes.map(recipe => (
//               <div key={recipe.id} className="p-4 border rounded-md">
//                 <h4 className="text-lg font-bold">{recipe.title}</h4>
//                 <p className="text-text mb-2">{recipe.description}</p>
//                 <Link href={`/recipes/${recipe.id}`} className='text-primary font-bold'>
//                 View Recipe
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// }
