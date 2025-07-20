# 🎬 Movie Discovery App

A modern, responsive movie discovery application built with React and powered by The Movie Database (TMDB) API. Features real-time search, trending movies based on user search analytics, and a sleek user interface.

## Features

- **Real-time Movie Search**: Debounced search with instant results
- **Trending Movies**: Dynamic trending section based on search analytics
- **Search Analytics**: Track popular searches using Appwrite database
- **Responsive Design**: Optimized for all device sizes
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **Modern UI**: Beautiful gradient designs and smooth animations

## Tech Stack

### Frontend
- **React 19.1.0** - Modern React with hooks and latest features
- **Vite 7.0.4** - Next-generation frontend build tool
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React-Use 17.6.0** - Essential React hooks collection

### Backend & APIs
- **TMDB API** - The Movie Database for movie data
- **Appwrite 18.1.1** - Backend-as-a-Service for search analytics

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Vite Plugin React** - Fast Refresh and HMR support

## Project Structure

```
React-app/
├── public/                  # Static assets
│   ├── hero-bg.png         # Background pattern image
│   ├── hero.png            # Hero section image
│   ├── logo.png            # Application logo
│   ├── no-movie.png        # Placeholder for missing posters
│   ├── search.svg          # Search icon
│   └── star.svg            # Rating star icon
├── src/
│   ├── components/         # Reusable React components
│   │   ├── MovieCard.jsx   # Individual movie display component
│   │   ├── Search.jsx      # Search input component
│   │   └── Spinner.jsx     # Loading spinner component
│   ├── assets/            # Additional assets
│   │   └── react.svg      # React logo
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   ├── index.css          # Global styles and Tailwind config
│   └── appwrite.js        # Appwrite configuration and functions
├── .env.local             # Environment variables (not tracked)
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **TMDB API Key** (free registration required)
- **Appwrite Account** (free registration required)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sainava/Movie-Application.git
   cd React-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   ```

### API Setup

#### TMDB API Setup
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Generate an API key (v4 auth / Bearer token recommended)
5. Add the Bearer token to your `.env.local` file

#### Appwrite Setup
1. Visit [Appwrite Cloud](https://cloud.appwrite.io/)
2. Create a free account and new project
3. Create a database for search analytics
4. Create a collection with the following attributes:
   - `searchTerm` (string) - The normalized search term
   - `movie_title` (string) - Movie title from TMDB
   - `poster_url` (string) - Movie poster URL
   - `count` (integer) - Number of searches
5. Add your Appwrite credentials to `.env.local`

### Running the Application

1. **Development mode**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Preview production build**
   ```bash
   npm run preview
   ```

4. **Lint code**
   ```bash
   npm run lint
   ```

## Configuration

### Vite Configuration
The project uses Vite with React and Tailwind CSS plugins. Configuration is in `vite.config.js`.

### Tailwind CSS
Custom theme configuration is defined in `src/index.css` with:
- Custom color palette
- Typography settings
- Component styles
- Utility classes

### ESLint
Code quality is maintained with ESLint configuration in `eslint.config.js`.

##  Key Features Explained

### Search Functionality
- **Debounced Search**: Uses `useDebounce` hook to prevent excessive API calls
- **Input Validation**: Prevents tracking of typos and invalid searches
- **Real-time Results**: Instant movie results as you type

### Trending System
- **Search Analytics**: Tracks successful searches in Appwrite database
- **Dynamic Rankings**: Updates trending movies based on search frequency
- **Smart Counting**: Only counts successful searches with valid results

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Flexible Grid**: Responsive movie card layouts
- **Smooth Scrolling**: Horizontal scroll for trending movies

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Appwrite](https://appwrite.io/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool

## Support

If you have any questions or need help setting up the project, please open an issue in the repository.

---

Made with ❤️ by [Sainava](https://github.com/Sainava)
