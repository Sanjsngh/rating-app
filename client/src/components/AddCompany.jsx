import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCompany = ({ setCompanyData }) => {
    const navigate = useNavigate();
    const [compData, setCompData] = useState({
        'founded':"",
        'name': "",
        'img': "",
        'address':"",
        'totalReviews':0,
        'rating':0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompData((prevData) => ({...prevData, [name]: value}));
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();

        const URL = "http://localhost:8000";
        fetch(`${URL}/companies`, {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(compData)
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data);
            setCompanyData((prev) => [...prev, data]);

        })
        .catch((err) => console.log(err));
        navigate('/dashboard');
    }

  return (
    <div style={{backgroundColor:"green", padding:"300px"}}>
        <form style={{display:"flex", flexDirection: "column" }} className="add-form" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="founded" value={compData.founded} placeholder='Founded*' onChange={(e) => {handleChange(e)}} required />
            <input type="text" name="name" value={compData.name} placeholder='Name*' onChange={(e) => {handleChange(e)}} required />
            <input type="text" name="img" value={compData.img} placeholder='Image*' onChange={(e) => {handleChange(e)}} required />
            <input type="text" name="address" value={compData.address} placeholder='Address*' onChange={(e) => {handleChange(e)}} required />
            
            <button type="submit">Add Your Company</button>
        </form>
    </div>
  )
}

export default AddCompany;
