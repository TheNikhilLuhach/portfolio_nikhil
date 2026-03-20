const express = require('express');
const path = require('path');

// Vercel serverless function for serving static project files
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
    
    // Extract project path from URL
    const projectPath = req.url.replace('/projects/', '').split('?')[0];
    
    if (!projectPath) {
      // Return list of available projects
      const fs = require('fs');
      const projectsDir = path.join(__dirname, '../backend/projects');
      
      if (fs.existsSync(projectsDir)) {
        const projects = fs.readdirSync(projectsDir)
          .filter(file => {
            const filePath = path.join(projectsDir, file);
            return fs.statSync(filePath).isDirectory();
          });
        
        return res.status(200).json({
          projects,
          message: 'Available projects'
        });
      } else {
        return res.status(404).json({ error: 'Projects directory not found' });
      }
    }
    
    // Serve specific project file
    const fs = require('fs');
    const projectDir = path.join(__dirname, '../backend/projects', projectPath);
    const indexFile = path.join(projectDir, 'index.html');
    
    if (fs.existsSync(indexFile)) {
      // Serve the index.html file
      const content = fs.readFileSync(indexFile, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(content);
    } else {
      // Try to serve as static file
      const filePath = path.join(projectDir, req.url.split('/projects/')[1] || '');
      
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const content = fs.readFileSync(filePath);
        const ext = path.extname(filePath).toLowerCase();
        
        // Set appropriate content type
        const contentTypes = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'application/javascript',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml'
        };
        
        res.setHeader('Content-Type', contentTypes[ext] || 'text/plain');
        return res.status(200).send(content);
      }
    }
    
    // Project not found
    res.status(404).json({ 
      error: 'Project not found',
      project: projectPath 
    });
    
  } catch (error) {
    console.error('Projects Static Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
