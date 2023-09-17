import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ViewRating from './ViewRating';
import RateCompany from './RateCompany';
import "../index.css";

const Dashboard = ({ user ,companyData, setCompanyData}) => {
  console.log(user);
  const navigate = useNavigate();
  

  useEffect(() => {
    const url = "http://localhost:8000";
    fetch(`${url}/companies`)
      .then((res) => res.json())
      .then((data) => {
        setCompanyData(data);
      });
  }, []);

  const handleCreateCompany = () => {
    navigate("/addCompany");
  }

  return (
    <div className='dashboard'>
      <h1>Welcome, {user.fullName}!</h1>

      {user.role === 'Admin' && (
        <div>
          <button onClick={handleCreateCompany}>Add Company</button>
        </div>
      )}
      <div>
       {
        companyData && companyData.map(company => (
          <div className="company-div" key={company._id} style={{border:"1px solid black", margin: "20px", width:"700px"}}>
            <img style={{width:"200px"}} src={company.img} />
            <div>
              <p>Founded {company.founded}</p>
              <h2>{company.name}</h2>
              <p>{company.address}</p>
              <div>
                {
                  user.role === 'Admin' ? (
                    <div className='ratingDiv'>
                      <h4>{company.totalReviews} Reviews</h4>
                      <ViewRating rating={company.rating} />
                    </div>
                  ) : 
                  (
                    <RateCompany companyId={company._id} user={user} />
                  )
                }
                
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Dashboard;
