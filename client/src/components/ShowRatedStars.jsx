import React from 'react';

const ShowRatedStars = ({ rating }) => {
  const maxRating = 5; // Define the maximum rating value (e.g., 5 stars)
  const filledStars = Math.round(rating); // Round the rating to the nearest whole star

  const starIcons = [];
  for (let i = 1; i <= maxRating; i++) {
    if (i <= filledStars) {
      starIcons.push(<span key={i}>&#9733;</span>); // Filled star
    } else {
      starIcons.push(<span key={i}>&#9734;</span>); // Empty star
    }
  }

  return <div className="star-rating">{starIcons}</div>;
};

export default ShowRatedStars;
