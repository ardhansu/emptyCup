# EmptyCup - Interior Designer Platform

EmptyCup is a mobile-first web application that helps homeowners find and shortlist interior designers.

## Features

- View a list of interior designers with details like name, profile picture, location, and description
- Shortlist designers you're interested in (data persists using localStorage)
- Filter to view only shortlisted designers
- Mobile-optimized interface with bottom navigation

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Lucide React for icons
- Axios for API requests

### Backend (Instructions for setup)
- Python Flask REST API

## Project Structure

```
emptycup/
├── src/
│   ├── assets/         # Static assets like SVGs
│   ├── components/     # React components
│   ├── data/           # Mock data
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── App.tsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.tsx        # Application entry point
├── public/             # Public assets
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
└── README.md           # Project documentation
```

## Running the Project

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend (Flask) - Setup Instructions

Create a new directory for the backend:

```bash
mkdir backend
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install required packages:

```bash
pip install flask flask-cors
```

Create an `app.py` file:

```python
from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Load data from JSON file
def get_designers():
    with open('designers.json', 'r') as f:
        return json.load(f)

@app.route('/api/designers', methods=['GET'])
def designers():
    return jsonify(get_designers())

if __name__ == '__main__':
    app.run(debug=True)
```

Create a `designers.json` file with the sample data:

```json
[
  {
    "id": 1,
    "name": "Epic Designs",
    "location": "Bangalore, India",
    "profile_picture": "https://images.pexels.com/photos/1537317/pexels-photo-1537317.jpeg?auto=compress&cs=tinysrgb&w=600",
    "description": "Passionate team of 4 designers working out of Bangalore with an experience of 8 years.",
    "isAvailable": true,
    "rating": 4,
    "projects": 57,
    "years": 8,
    "price": 2,
    "phone": ["+91-9845322853", "+91-9845322854"]
  },
  // Additional designers...
]
```

Run the Flask backend:

```bash
python app.py
```

## Docker Setup

Create a Dockerfile for the backend:

```
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

Create a requirements.txt file:

```
flask==2.0.1
flask-cors==3.0.10
```

Create a docker-compose.yml file in the root directory:

```yaml
version: '3'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
```

Create a Dockerfile.frontend:

```
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create nginx.conf for the frontend:

```
server {
    listen 80;
    server_name localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Deployment

### Frontend Deployment (Netlify)

1. Push your code to GitHub
2. Log in to Netlify and connect to your GitHub repository
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables if needed
5. Deploy the site

### Backend Deployment

For a VPS like DigitalOcean or Render:

1. Push your code to GitHub
2. Set up a new Web Service on Render or Droplet on DigitalOcean
3. Connect to your GitHub repository
4. Configure the build settings:
   - Runtime: Python 3.9
   - Build command: `pip install -r requirements.txt`
   - Start command: `python app.py`
5. Add environment variables if needed
6. Deploy the service

## Demo Video Script

1. Introduction (30 seconds)
   - Brief overview of EmptyCup platform
   - Purpose and target audience

2. Live Demo (1 minute)
   - Show the mobile interface
   - Demonstrate shortlisting functionality
   - Show filter toggle in action

3. Data Structure (1 minute)
   - Explain the Designer object structure
   - Show how data flows from API to UI

4. Project Structure (1 minute)
   - Walk through key directories and files
   - Highlight separation of concerns

5. Frontend Code (1 minute)
   - Explain key React components
   - Show how shortlisting works with localStorage

6. Backend Code (1 minute)
   - Demo Flask API implementation
   - Explain RESTful endpoint structure

7. Conclusion (30 seconds)
   - Summarize features implemented
   - Mention potential future enhancements