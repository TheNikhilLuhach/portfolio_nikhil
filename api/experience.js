const portfolioExperience = require('../backend/data/experience.json');

// Vercel serverless function for experience API
module.exports = async (req, res) => {
  try {
    // Enable CORS for all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // Get experience by ID or return all experience
    const { id } = req.query;
    
    if (id) {
      const experience = portfolioExperience.find(exp => exp.id === parseInt(id));
      if (experience) {
        return res.status(200).json(experience);
      } else {
        return res.status(404).json({ error: 'Experience not found' });
      }
    }
    
    // Return all experience
    res.status(200).json(portfolioExperience);
  } catch (error) {
    console.error('Experience API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
