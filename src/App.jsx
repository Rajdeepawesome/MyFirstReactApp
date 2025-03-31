import React, {useState, useEffect} from 'react'
import Search from "./components/Search.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";
import Switch from "./components/Switch.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

console.log(API_OPTIONS);


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('')

  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const [isChecked, setIsChecked] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(()=> setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('')
    try{
      const endpoint = query?`${API_BASE_URL}/search/multi?query=${encodeURIComponent(query)}`
          :`${API_BASE_URL}/discover/${!isChecked?'movie':'tv'}?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Something went wrong.');
        setMovieList([]);
        return;
      }

      console.log(data);

      setMovieList(data.results || []);
    }
    catch(e){
      console.error(`Error fetching movies : ${e}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    }

    finally {
      setIsLoading(false);
    }

  }

  const getTrendingMovies = async () => {

    try{
        const endpoint = `${API_BASE_URL}/trending/all/day?language=en-US`
        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) {
          throw Error(response.statusText);
        }

        const data = await response.json();
        if (data.Response === 'False') {
          setTrendingMovies([]);
          return;
        }

        setTrendingMovies(data.results || [])
    }
    catch(e){
      console.error(`Error fetching trending movies : ${e}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  },[debouncedSearchTerm,isChecked]);

  useEffect(() => {
    getTrendingMovies()
  },[]);

  console.log(`trendingMovies ${trendingMovies}`);

  return (
  <main>
  <div className='pattern'/> 
  <div className="wrapper">
    <header>
      <img src = "./hero.png" alt = "Hero Banner"></img>
      <h1>
        Find <span className='text-gradient'>Movies</span> you will enjoy without the Hassle
      </h1>

      <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} isChecked={isChecked} />
    </header>
    {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>
            Trending Movies
          </h2>

          <ul>
            {
              trendingMovies.map((movie,index) => (
                  <li key={movie.id}>
                      <p>{index + 1}</p>
                    <img src={movie.poster_path? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`:'/no-movie.png'} alt={movie.title}/>
                  </li>
              ))
            }
          </ul>
        </section>
    )}

    <section className="all-movies">
    <Switch isChecked={isChecked} setIsChecked={setIsChecked} />
      {isLoading ? (<span className="loader"></span>) :
          errorMessage ? (<p className="text-red-500">{errorMessage}</p>):
              (<ul>
                {
                  movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                    ))}
              </ul>)
      }
    </section>
  </div>
  </main>
  )
}

export default App