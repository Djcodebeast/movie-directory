import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { DataStore } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { Movie } from '../src/models'

function Home() {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const fetchMovies = () => {

      DataStore.query(Movie).then(setMovies);
    }
    fetchMovies()
    const sub = DataStore.observe(Movie).subscribe(() => fetchMovies());
    return () => {
      sub.unsubscribe();
    };
  }, [])

  useEffect(() => {
    InAppMessaging.syncMessages();
  }, [])

  if (movies.length === 0) {
    return (
      <div>
        <p> Loading...</p>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.movieHeader}>
        <h2 className={styles.title}> Movie Directory </h2>
        <p className={styles.description}> Get the latest movies on here </p>
      </div>

      <div className={styles.buttonContainer}>
        <Link href="/add" passHref>
          <button className={styles.button}> Add Movie </button>
        </Link>
      </div>


      <div className={styles.grid}>
        {movies ? movies.map(movie => (
          <div className={styles.card} key={movie.id}>
            <img src={movie.image} alt={movie.title} />
            <h3> {movie.title}</h3>
            <p> {movie.description.slice(0, 80)}</p>
          </div>
        )) : (
          <>
            <p className={styles.description}> No movie has been added </p>
          </>
        )}


      </div>
    </div>
  )
}

export default Home;