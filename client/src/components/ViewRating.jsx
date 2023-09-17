import React from 'react';
import "../index.css"

const ViewRating = ({ rating }) => {
  const totalStars = 5;
  const decimalPart = rating - Math.floor(rating);
  const starIcons = [];
  const starRating = [1, 2, 3, 4, 5];

  starRating.map((i) => {
    const isPartialStar = decimalPart > 0 && i === Math.ceil(rating);

    if (isPartialStar) {
      const percentage = `${(decimalPart * 100)}%`;
      starIcons.push(
        <span key={i} className="star partial-filled">
          <span className="partial-star" style={{ width: percentage }}>&#9733;</span>
          <span className="empty-star">&#9734;</span>
        </span>
      );
    } else if (i <= rating) {
      starIcons.push(
        <span key={i} className="starfilled">
          <span className="full-star">&#9733;</span>
        </span>
      );
    } else {
      starIcons.push(
        <span key={i} className="star">
          <span className="empty-star">&#9734;</span>
        </span>
      );
    }
  });

  return (
    <div className="star-rating">
      {starIcons.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

export default ViewRating;
