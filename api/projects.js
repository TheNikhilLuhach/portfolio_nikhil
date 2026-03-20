const portfolioProjects = require('../data/projects.json');

// Vercel serverless function for projects API
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
    
    // Get project by ID or return all projects
    const { id } = req.query;
    
    if (id) {
      const project = portfolioProjects.find(p => p.id === parseInt(id));
      if (project) {
        return res.status(200).json(project);
      } else {
        return res.status(404).json({ error: 'Project not found' });
      }
    }
    
    // Return all projects
    res.status(200).json(portfolioProjects);
  } catch (error) {
    console.error('Projects API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
