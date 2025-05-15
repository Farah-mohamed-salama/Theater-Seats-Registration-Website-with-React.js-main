import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './moviesList.css';

const films = JSON.parse(localStorage.getItem('films')) || [
    // ... (بقية مصفوفة الأفلام كما هي)
];

function MovieList() {
    const [activeFilter, setActiveFilter] = useState('All');
    
    // Extract unique genres for filters (including 'All')
    const genres = ['All', 'Animation', 'Action', 'Drama', 'Sci-Fi', 
                   'Fantasy', 'Comedy', 'Horror', 'Adventure', 
                   'Historical', 'Romance'];
    
    const filteredFilms = activeFilter === 'All' 
        ? films 
        : films.filter(film => film.genre === activeFilter);

    return (
        <div className="movies-container">
            <h1 className="page-title">Movie Collection</h1>
            
            {/* Genre Filter Bar */}
            <div className="genre-filter-bar">
                {genres.map(genre => (
                    <button
                        key={genre}
                        className={`genre-filter-btn ${activeFilter === genre ? 'active' : ''}`}
                        onClick={() => setActiveFilter(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
            
            <div className="movies-grid">
                {filteredFilms.map(film => (
                    <div key={film.id} className="movie-card">
                        <div className="movie-image-container">
                            <img 
                                src={film.image} 
                                alt={film.title} 
                                className="movie-poster"
                                onError={(e) => { e.target.src = '../images/placeholder-poster.jpg' }}
                            />
                            <span className="movie-year">{film.year}</span>
                        </div>
                        <div className="movie-info">
                            <h3>{film.title}</h3>
                            <p className="movie-genre">{film.genre}</p>
                            <Link 
                                to={`/movie/${encodeURIComponent(film.title)}`}
                                className="book-button"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;