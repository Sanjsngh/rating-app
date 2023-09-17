const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const URI = process.env.MONGO_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
        w: 'majority'
    }
};

const client = new MongoClient(URI, options);
client.connect();

router.get('/',async (req, res) => {
    const db = client.db('companyInfo');
    const companies = await db.collection('companies').find().toArray();
    res.status(201).json(companies);
})

router.post('/',async (req, res) => {
    try {
        const { founded, name, img, address } = req.body;

        const db = client.db('companyInfo');
        const company = await db.collection('companies').findOne({name});
        
        if(company) {
            res.json({error: 'Company already exists'})
        }

        const newCompany = {
            founded,
            name,
            img,
            address, 
            rating: 0,
            totalReviews: 0
        };

        await db.collection('companies').insertOne(newCompany);
        const insertedCompany = await db.collection('companies').findOne({ name });
        
        res.status(201).json(insertedCompany);
    }catch(err) {
        console.log(error);
    } finally {
        client.close();
    }
});


router.patch('/rate/:companyId', async (req, res) => {
    try {
      const { companyId } = req.params;
      const { rating } = req.body; // 4
  
      const db = client.db('companyInfo');
      const companyIdObjectId = new ObjectId(companyId);

      const company = await db.collection('companies').findOne({ _id: companyIdObjectId });
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
      
      // Calculate the new average rating and update totalReviews
      const newTotalReviews = company.totalReviews + 1;
      const newRating = (((company.rating * company.totalReviews) + rating) / newTotalReviews).toFixed(1);
      
      // Update the company document with the new rating and totalReviews
      await db.collection('companies').updateOne(
        { _id: companyIdObjectId },
        { $set: { rating: newRating, totalReviews: newTotalReviews } }
      );
  
      // Return the updated company object
      const updatedCompany = await db.collection('companies').findOne({ _id: companyIdObjectId });
      res.status(200).json(updatedCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;