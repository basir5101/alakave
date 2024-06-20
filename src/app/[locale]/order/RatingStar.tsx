import React, { useState } from "react";

const RatingStars = ({ onRatingSelected }: any) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
    if (onRatingSelected) {
      onRatingSelected(index);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <button
          key={index}
          className="text-2xl cursor-pointer"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          aria-label={`Rate ${index}`}
        >
          {index <= (hoverRating || rating) ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
