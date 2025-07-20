import React, { use } from "react";
import { useState , useEffect } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { updateSearchCount ,getTrendingMovies} from "./appwrite.js"; 

const API_BASE_URL= "https://api.themoviedb.org/3";

const API_KEY= import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method : 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm,setSearchTerm]=useState("");

  const [errorMessage,setErrorMessage]=useState("");

  const [movieList,setMovieList]=useState([]);

  const [isLoading,setIsLoading]=useState(false);

  const [trendingMovies,setTrendingMovies]=useState([]);

  const [debounceSearchTerm, setDebounceSearchTerm] = useState(searchTerm);

  // Debounce the search term to avoid too many API calls by waiting for the user to stop typing
  useDebounce(
    () => setDebounceSearchTerm(searchTerm),
    500,
    [searchTerm]
  );

  const fetchMovies = async (query="")=>{

    setIsLoading(true);
    setErrorMessage("");

    try{
        const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        // Calling the API
        const response = await fetch(endpoint, API_OPTIONS);

        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if(!data.results || data.results.length === 0) {
          setErrorMessage("No movies found. Please try a different search.");
          setMovieList([]);
          return;
        }

        setMovieList(data.results || []);
        
        // Only update search count if we have a valid query AND valid results
        if(query && query.trim() && data.results.length > 0) {
          // Update search count in Appwrite database only for successful searches
          await updateSearchCount(query.trim(), data.results[0]);
        }

    }catch(error){
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    }finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies =async () =>{
    try{
      const movies =await getTrendingMovies();
      setTrendingMovies(movies);
    }catch(error){
      console.error("Error loading trending movies:", error);
    }
  }

  useEffect(()=>{
    fetchMovies(debounceSearchTerm);
  },[debounceSearchTerm]);

useEffect(()=>{
    loadTrendingMovies();
  },[]);
  
  return (
    <main>
      <div className="pattern"/>
      
      <div className="wrapper">
        <header className="header">
          <img src="./hero.png" alt="Hero Banner"/>
          <h1 >
            Find <span className="text-gradient">Movies</span> You'll Like Without the Hassle
          </h1>
          <p>Search for movies, TV shows, and more with ease.</p>
          <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie,index) => (
                <li key={movie.$id}>
                  <p className="trending-number">{index + 1}</p>
                  <div className="movie-info">
                    <img src={movie.poster_url} alt={movie.movie_title || movie.searchTerm} />
                    <div className="movie-details">
                      <span className="movie-title">{movie.movie_title || movie.searchTerm}</span>
                      <span className="search-count">{movie.count} searches</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

      </div>

    </main>
  );
};

export default App;
