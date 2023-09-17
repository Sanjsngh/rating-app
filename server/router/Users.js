const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const URI = process.env.MONGO_URI;
const { JWT_SECRET } = process.env;


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
    const users = await db.collection('users').find().toArray();
    res.status(201).json(users);
    // client.close();
})

router.get('/me', async(req, res) => {
  // try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    // Verify the token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const db = client.db('companyInfo');
    const users = await db.collection('users').find().toArray();
    
    const userObjId = new ObjectId(decodedToken.userId);
    
    const user = await db.collection('users').findOne({ _id: userObjId });
    
    if (!user) {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
    
    console.log(decodedToken);
    // Return the user details
    res.status(200).json(user);
    console.log("stop here");
    return;

  // } catch (error) {
  //   // Token is invalid or expired
  //   console.log("heyy");
  //   res.status(401).json({ message: 'Unauthorized' });
  // } finally {
  //   client.close();
  // }
});

router.post('/:userId/ratings/:companyId', async(req, res) => {
  try{
    const {rating} = req.body;
    const userID = req.params.userId;
    const companyID = req.params.companyId;
    const db = client.db('companyInfo');
    const userObjId = new ObjectId(userID);
    const companyObjId = new ObjectId(companyID);
    
    const user = await db.collection('users').findOne({ _id: userObjId })
    if(!user) {
      res.status(401).res.json({error: "User not found"});
    }

      const newRating = {
        companyId: companyID, 
        rating: rating, 
        hasRated: true 
      };

      const result = db.collection('users').updateOne(
        { _id: userObjId },
        {
          $push: {
            ratings: newRating
          }
        },
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Ratings Updated successfully', data:newRating });
      } else {
        throw new Error('Rating not updated');
      }
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      // client.close();
    }

})

module.exports = router;