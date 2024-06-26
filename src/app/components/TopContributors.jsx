// TopContributors.js
import React from 'react';

const TopContributors = ({ contributors }) => {
  return (
    <div>
      <h2>Top Contributors</h2>
      <ul>
        {contributors.map((contributor, index) => (
          <li key={index}>{contributor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopContributors;
