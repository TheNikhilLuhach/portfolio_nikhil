# Nikhil Kumar Portfolio - Vercel Deployment Guide

## 🚀 Production-Ready Portfolio

This portfolio is optimized for Vercel deployment with full frontend-backend integration.

## 📁 Project Structure

```
nikhil-portfolio/
├── frontend/                 # Next.js frontend application
│   ├── app/                # App Router pages
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── next.config.js       # Next.js configuration
├── backend/                  # Express.js backend
│   ├── routes/              # API routes
│   ├── data/                # JSON data files
│   ├── projects/            # Static project demos
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server
├── vercel.json              # Vercel configuration
└── README.md               # Deployment guide
```

## 🔧 Vercel Configuration

### Frontend Deployment (Main)
- **Framework**: Next.js
- **Build Command**: `cd frontend && npm run build`
- **Output Directory**: `frontend/.next`
- **Install Command**: `cd frontend && npm install`

### Backend API (Serverless)
- **Framework**: Express.js (Serverless Functions)
- **API Routes**: `/api/*` → Backend routes
- **Static Files**: `/projects/*` → Project demos

## 🌐 Deployment Architecture

### Frontend (Primary)
```
https://your-portfolio.vercel.app/
├── /                    # Next.js app
├── /api/               # API routes (serverless)
├── /projects/           # Static project demos
└── /_next/             # Next.js build files
```

### API Integration
```
Frontend API Calls → Vercel Serverless Functions → JSON Data
     ↓                        ↓                    ↓
  /api/projects    →    api/projects.js    →  projects.json
  /api/skills      →    api/skills.js      →  skills.json
  /api/experience  →    api/experience.js  →  experience.json
```

## 📋 Pre-Deployment Checklist

### ✅ Frontend Setup
- [ ] Next.js configuration optimized for Vercel
- [ ] API calls use relative paths (`/api/*`)
- [ ] Static assets properly configured
- [ ] Environment variables set (if needed)
- [ ] Build process tested locally

### ✅ Backend Setup  
- [ ] Express routes ready for serverless
- [ ] CORS configured for production
- [ ] Static project files in `/projects`
- [ ] JSON data files properly structured
- [ ] Error handling implemented

### ✅ Integration Testing
- [ ] Frontend-backend communication working
- [ ] All API endpoints functional
- [ ] Project demos loading correctly
- [ ] Responsive design working
- [ ] Animations and interactions functional

## 🚀 Deployment Steps

### 1. Repository Setup
```bash
# Ensure root structure is correct
nikhil-portfolio/
├── frontend/
├── backend/
└── vercel.json
```

### 2. Vercel Configuration
Create `vercel.json` in root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/next",
      "config": {
        "distDir": ".next"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/$1"
    },
    {
      "src": "/projects/(.*)",
      "dest": "/backend/projects/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 3. Environment Variables (Optional)
```bash
# In Vercel Dashboard
NEXT_PUBLIC_API_URL=https://your-portfolio.vercel.app/api
PORT=3000
NODE_ENV=production
```

## 🔗 Live URLs After Deployment

### Main Application
```
Portfolio: https://your-portfolio.vercel.app
API:     https://your-portfolio.vercel.app/api
Projects: https://your-portfolio.vercel.app/projects
```

### Project Demos
```
Hand Gestures:    https://your-portfolio.vercel.app/projects/hand-gesture-control
AI Chatbot:       https://your-portfolio.vercel.app/projects/tech2idea-chatbot
Career Platform:   https://your-portfolio.vercel.app/projects/careerpilot-platform
Study Hub:        https://your-portfolio.vercel.app/projects/studysync-learning
Voice Automation:  https://your-portfolio.vercel.app/projects/voice-automation-menu
```

## 🛠️ Technical Implementation

### Frontend Optimizations
```javascript
// next.config.js - Production ready
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || '/api'}/:path*`,
      },
    ];
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
};
```

### Backend Serverless Functions
```javascript
// api/projects.js - Vercel serverless function
const projects = require('../../backend/data/projects.json');

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.json(projects);
}
```

## 📊 Performance Features

### ⚡ Optimizations
- **Next.js ISR** for static generation
- **Serverless Functions** for API calls
- **CDN Delivery** for static assets
- **Image Optimization** with Next.js Image
- **Code Splitting** for faster loads
- **Edge Caching** for better performance

### 📱 Responsive Design
- **Mobile-First** approach
- **Progressive Enhancement**
- **Touch-Friendly** interactions
- **Optimized Animations** for all devices

## 🔍 Testing Before Deploy

### Local Production Test
```bash
# Frontend
cd frontend
npm run build
npm run start

# Backend (simulated serverless)
cd backend
npm start
```

### Integration Test
```bash
# Test all API endpoints
curl http://localhost:3000/api/projects
curl http://localhost:3000/api/skills
curl http://localhost:3000/api/experience

# Test project demos
curl http://localhost:3000/projects/hand-gesture-control
```

## 🎯 Deployment Benefits

### 🌟 Vercel Features
- **Automatic HTTPS** and custom domains
- **Global CDN** for fast loading
- **Automatic Deployments** from git
- **Server-Side Rendering** support
- **Edge Functions** for API routes
- **Analytics Integration** ready

### 📈 Performance
- **99.99% Uptime** with Vercel
- **Global Edge Network** distribution
- **Automatic Scaling** for traffic
- **Build Optimization** out of the box

## 🔄 CI/CD Pipeline

### Automatic Deployments
```yaml
# vercel.yml (auto-generated)
name: Deploy Portfolio
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support & Maintenance

### 🛠️ Updates
- **Git Push** → Automatic deployment
- **Environment Variables** → Vercel dashboard
- **Domain Management** → Vercel settings
- **Analytics** → Vercel analytics

### 🔧 Troubleshooting
```bash
# Check build logs
vercel logs

# Debug locally
vercel dev

# Clear cache
vercel rm --all
```

---

**🚀 Ready for Vercel deployment with full frontend-backend integration!**
