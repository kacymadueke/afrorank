const express = require('express');
const Review = require('../models/review');
const router = express.Router();

// Add Review
router.post('/add', async (req, res) => {
  const { school, user, content, rating } = req.body;
  try {
    const newReview = new Review({ school, user, content, rating });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Reviews by School Name (acts as search)
router.get('/search/:school', async (req, res) => {
    try {
      const reviews = await Review.find({ school: new RegExp(req.params.school, 'i') }).populate('user');
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get Reviews
router.get('/school/:name', async (req, res) => {
    try {
        const reviews = await Review.find({ school: req.params.name }).populate('user');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
  });

  
module.exports = router;
