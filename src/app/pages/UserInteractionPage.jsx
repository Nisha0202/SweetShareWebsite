// UserInteractionPage.js
import React from 'react';
import TopContributors from '../../components/TopContributors';
import MostFollowedChefs from '../../components/MostFollowedChefs';

const UserInteractionPage = () => {
  // Mock data
  const topContributors = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  const mostFollowedChefs = [
    { id: 1, name: 'Chef Emily' },
    { id: 2, name: 'Chef David' },
    { id: 3, name: 'Chef Sophia' },
  ];

  return (
    <div className='max-w-[1200px] mx-auto'>
      {/* <TopContributors contributors={topContributors} /> */}
      <MostFollowedChefs chefs={mostFollowedChefs} />
    </div>
  );
};

export default UserInteractionPage;
