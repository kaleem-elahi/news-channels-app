# News Channel App

This app is built using React and Vite. It allows users to view news articles from various sources and save their favorite articles for later reading.

## Features

- View news articles from 2 APIs: NewsAPI and Guardian
- Search for news articles by keyword
- Filter news articles by category, date, and source

## Setup

1. Clone the repository
2. Install dependencies using `npm install`
3. Start the development server using `npm run dev`
4. Open the app in your browser at `http://localhost:5173`

## Docker Setup

1. Clone the repository
2. Build the Docker image using `docker build -t news-channel-app .`
3. Run the Docker container using `docker run -p 5173:5173 news-channel-app`
4. Open the app in your browser at `http://localhost:5173`

## API Keys

This app uses two APIs: NewsAPI and Guardian. To use this app, you will need to obtain API keys from both APIs and add them to the `src/api/index.js` file.

## Usage

1. Enter a keyword in the search bar to search for news articles
2. Select a category, date, and source to filter the news articles
3. Click on an article to view the full article
