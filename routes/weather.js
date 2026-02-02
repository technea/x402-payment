import express from 'express';

const router = express.Router();

// Weather endpoint
router.get('/weather', (req, res) => {
  res.json({
    message: 'Weather data endpoint',
    data: {
      temperature: 25,
      humidity: 60,
      condition: 'Sunny'
    }
  });
});

export default router;