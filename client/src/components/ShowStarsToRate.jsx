import React, { useState } from 'react';
import '../index.css';


const ShowStarsToRate = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star${star <= (hoveredRating || rating) ? 'filled' : ''}`}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleStarClick(star)}
          style={{
            background: "gray"
          }}
        >
          <span >&#x2605;</span>
        </span>
      ))}
    </div>
  );
};

export default ShowStarsToRate;
