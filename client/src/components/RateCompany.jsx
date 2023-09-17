import React, { useEffect, useState } from 'react';
import ShowStarsToRate from './ShowStarsToRate';
import ShowRatedStars from './ShowRatedStars';

const RateCompany = ({ companyId, user }) => {
    const userId = user._id;
    console.log(user.ratings);
    const [ratedCompanies, setRatedCompanies] = useState(user.ratings || []);
    console.log(ratedCompanies)
    /*
    [
        {
            companyId,
            rating,
            hasRated: false
        }
    ]

    */
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    
    if(user.ratings) {
        const ratedCompany = user.ratings.find((item) => item.companyId === companyId);
        console.log(ratedCompany); 
        if (ratedCompany) {
            setRating(ratedCompany.rating);
            setHasRated(ratedCompany.hasRated);
            setRatedCompanies(user.ratings)
        }
    }
  }, [companyId, user.ratings, ratedCompanies]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRatingSubmit = () => {
    if(!hasRated) {
        const URL = "http://localhost:8000/companies"
        fetch(`${URL}/rate/${companyId}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating }),
        })
        .then((response) => {
            if (response.ok) {
                setHasRated(true);
                console.log('Company rating updated successfully');
      
                // Update the user's ratings
                fetch(`http://localhost:8000/users/${userId}/ratings/${companyId}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ rating }),
                })
                  .then((res) => res.json())
                  .then(data => {
                    console.log(data.data);
                    setRatedCompanies([...ratedCompanies, data.data]);
                  })
                  .catch((err) => {
                    console.error('User rating update error:', err);
                  });
              } else {
                console.error('Error in updating Company rating');
              }
        })
        .catch((error) => {
        setHasRated(false);
        console.error('Rating update error:', error);
        });
    }
  };

  return (
    <div className="rate-company">
      <h4>Rate this Company:</h4>
      
      {
        hasRated ? (
            <>
                <ShowRatedStars
                    rating={rating} 
                />
                <button>Submitted</button>
            </>
        ) : 
        (
            <>
                <ShowStarsToRate 
                    rating={rating} 
                    onRatingChange={handleRatingChange} 
                />
                <button onClick={handleRatingSubmit}>Submit Rating</button>
            </>
        )
      }
      
    </div>
  );
};

export default RateCompany;
