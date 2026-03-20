const portfolioSkills = require('../backend/data/skills.json');

// Vercel serverless function for skills API
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
    
    // Get skills by category or return all skills
    const { category } = req.query;
    
    if (category) {
      const filteredSkills = portfolioSkills.filter(skill => 
        skill.category && skill.category.toLowerCase() === category.toLowerCase()
      );
      return res.status(200).json(filteredSkills);
    }
    
    // Return all skills
    res.status(200).json(portfolioSkills);
  } catch (error) {
    console.error('Skills API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
