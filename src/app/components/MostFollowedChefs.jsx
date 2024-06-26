// MostFollowedChefs.js
import React from 'react';

const MostFollowedChefs = ({ chefs }) => {
  return (
    <div className="most-followed-chefs max-w-[1200px] mb-12 lg:mb-18 mx-auto">
      <h2 className="text-2xl font-semibold text-center text-primary">Most Followed Chefs</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
        {chefs.map((chef, index) => (
          <li key={index} className="bg-gray-100 rounded-md overflow-hidden">
            <div className="p-4">
              <img src={chef.avatar} alt={chef.name} className="w-full h-auto object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{chef.name}</h3>
                <p className="text-gray-600 mb-2">{chef.followers} followers</p>
                <p className="text-gray-700">{chef.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostFollowedChefs;
